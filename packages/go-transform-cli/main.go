package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"

	"github.com/alecthomas/kong"
	"github.com/gobwas/glob"
	"github.com/gomarkdown/markdown/parser"
	"gopkg.in/yaml.v2"
)

type CLI struct {
	SetPrimaryBlog struct {
		PrimaryBlog string `arg:"" help:"The primary blog to set."`
		GlobPattern string `arg:"" help:"The glob pattern to match files."`
	} `cmd:"" help:"Set the primary blog in Markdown files."`
	SetSecondaryBlogs struct {
		SecondaryBlogs string `arg:"" help:"The secondary blogs to set. Comma separated."`
		GlobPattern    string `arg:"" help:"The glob pattern to match files." type:"path"`
	} `cmd:"" help:"Set the secondary blogs in Markdown files."`
}

type Config struct {
	RootDir string `yaml:"root"`
}

func New() *CLI {
	return &CLI{}
}

func ReadConfig() *Config {
	data, err := ioutil.ReadFile("config.yaml")
	if err != nil {
		log.Fatal(err)
	}

	var config Config
	err = yaml.Unmarshal(data, &config)
	if err != nil {
		log.Fatal(err)
	}

	return &config
}

type processorFn func(string) error

func (c *CLI) ProcessFiles(ctx *kong.Context, fn processorFn) error {
	g := glob.MustCompile(c.SetPrimaryBlog.GlobPattern)

	err := filepath.Walk(ReadConfig().RootDir, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if !info.IsDir() && g.Match(path) && filepath.Ext(path) == ".md" {
			return fn(path)
		}
		return nil
	})
	return err
}

func (c *CLI) SetPrimaryBlogAction(ctx *kong.Context) error {
	return c.ProcessFiles(ctx, func(path string) error {
		fmt.Printf("Processing %s\n", path)
		data, err := ioutil.ReadFile(path)
		if err != nil {
			return err
		}
		// Create a parser with YAML frontmatter extension
		p := parser.NewWithExtensions(parser.)

		// Parse markdown and extract frontmatter
		p.Parse(data)
		frontmatter := p.FrontMatter()

		fmt.Printf("%v", frontmatter)

		return nil
	})
}

func (c *CLI) Run(ctx *kong.Context) error {
	switch ctx.Command() {
	case "set-primary-blog <primary-blog> <glob-pattern>":
		// fmt.Printf("The primary blog is %s\n", c.SetPrimaryBlog.PrimaryBlog)
		c.SetPrimaryBlogAction(ctx)
		return nil
	case "set-secondary-blogs <secondary-blogs> <glob-pattern>":
		return nil
	default:
		return fmt.Errorf("unknown command %s", ctx.Command())
	}
}

func main() {
	cli := New()
	ctx := kong.Parse(cli, kong.Name("transform-cli"), kong.Description("Transforms blog data."))

	cli.Run(ctx)

}
