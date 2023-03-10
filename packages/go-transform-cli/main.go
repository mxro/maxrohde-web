package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"strings"

	"github.com/gernest/front"

	"github.com/alecthomas/kong"
	"github.com/gobwas/glob"
	"gopkg.in/yaml.v2"
)

type CLI struct {
	SetPrimaryBlog struct {
		PrimaryBlog string `arg:"" help:"The primary blog to set."`
		GlobPattern string `arg:"" help:"The glob pattern to match files."`
	} `cmd:"" help:"Set the primary blog in Markdown files."`
	SetAuthors struct {
		Authors     string `arg:"" help:"The authors for the blog to set. Comma separated."`
		GlobPattern string `arg:"" help:"The glob pattern to match files."`
	} `cmd:"" help:"Set the authors in Markdown files."`
	SetId struct {
		GlobPattern string `arg:"" help:"The glob pattern to match files."`
	} `cmd:"" help:"Defines an id field in the frontmatter based on the file path"`
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

func (c *CLI) ProcessFiles(ctx *kong.Context, pattern string, fn processorFn) error {
	g := glob.MustCompile(pattern)

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

type frontmatterProcessorFn func(map[string]interface{}) error

func ProcessFrontMatter(path string, processor frontmatterProcessorFn) error {
	data, err := os.Open(path)
	if err != nil {
		return err
	}

	m := front.NewMatter()
	m.Handle("---", front.YAMLHandler)
	frontmatterMap, body, err := m.Parse(data)
	if err != nil {
		return err
	}

	serr := processor(frontmatterMap)
	if serr != nil {
		return err
	}

	y, err := yaml.Marshal(frontmatterMap)
	if err != nil {
		return err
	}

	newContent := "---\n" + string(y) + "---\n\n" + body

	if err := ioutil.WriteFile(path, []byte(newContent), 0644); err != nil {
		return err
	}

	return nil
}

func (c *CLI) SetPrimaryBlogAction(ctx *kong.Context) error {
	return c.ProcessFiles(ctx, c.SetPrimaryBlog.GlobPattern, func(path string) error {
		fmt.Printf("Processing %s\n", path)

		perr := ProcessFrontMatter(path, func(m map[string]interface{}) error {
			m["blog"] = c.SetPrimaryBlog.PrimaryBlog
			return nil
		})
		if perr != nil {
			return perr
		}

		fmt.Printf("Processing finished %s\n", path)
		return nil
	})
}

func (c *CLI) SetAuthorsAction(ctx *kong.Context) error {
	return c.ProcessFiles(ctx, c.SetAuthors.GlobPattern, func(path string) error {
		fmt.Printf("Processing %s\n", path)

		perr := ProcessFrontMatter(path, func(m map[string]interface{}) error {
			m["authors"] = strings.Split(c.SetAuthors.Authors, ",")
			return nil
		})
		if perr != nil {
			return perr
		}

		return nil
	})
}

func (c *CLI) SetIdAction(ctx *kong.Context) error {
	return c.ProcessFiles(ctx, c.SetId.GlobPattern, func(path string) error {
		fmt.Printf("Processing %s\n", path)

		// Getting parent directory
		parent := filepath.Dir(path)
		// Getting parent name
		parentName := filepath.Base(parent)
		// Splitting by "-"
		parts := strings.Split(parentName, "-")
		// Removing first 3 elements
		parts = parts[3:]
		// Joining by "-"
		id := strings.Join(parts, "-")

		perr := ProcessFrontMatter(path, func(m map[string]interface{}) error {
			m["id"] = id
			return nil
		})

		if perr != nil {
			return perr
		}

		return nil
	})
}

func (c *CLI) Run(ctx *kong.Context) error {
	switch ctx.Command() {
	case "set-primary-blog <primary-blog> <glob-pattern>":
		return c.SetPrimaryBlogAction(ctx)
	case "set-authors <authors> <glob-pattern>":
		return c.SetAuthorsAction(ctx)
	case "set-id <glob-pattern>":
		return c.SetIdAction(ctx)
	default:
		return fmt.Errorf("unknown command %s", ctx.Command())
	}
}

func main() {
	cli := New()
	ctx := kong.Parse(cli, kong.Name("transform-cli"), kong.Description("Transforms blog data."))

	err := cli.Run(ctx)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

}
