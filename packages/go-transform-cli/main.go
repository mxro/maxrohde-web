package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"

	"github.com/alecthomas/kong"
	"gopkg.in/yaml.v2"

	"github.com/gobwas/glob"
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

func (c *CLI) SetPrimaryBlogAction(ctx *kong.Context) error {
	g := glob.MustCompile(c.SetPrimaryBlog.GlobPattern)

	err := filepath.Walk(ReadConfig().RootDir, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if !info.IsDir() && g.Match(path) {
			fmt.Println(path + " is a markdown file")
		}
		return nil
	})
	return err
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
