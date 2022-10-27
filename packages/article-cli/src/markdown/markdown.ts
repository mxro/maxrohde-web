import matter from 'gray-matter';
import { promises as fs } from 'node:fs';
import path from 'path';
import { marked } from 'marked';
import { fixContentLinks } from './images';

export interface ParseMarkdownResult {
  metadata: any;
  html: string;
  slug: string;
  markdown: string;
}

export const parseMarkdown = async (
  filename: string
): Promise<ParseMarkdownResult> => {
  const parsed = matter(
    fixContentLinks((await fs.readFile(filename)).toString('utf8'))
  );
  const markdown = parsed.content;
  const metadata = parsed.data;
  let html = marked.parse(markdown);
  // ensuring to escape html that has no businesses being
  // provided in the generated article html
  html = html.replaceAll('<script', '&lt;script');
  html = html.replaceAll('</script', '&lt;script');
  html = html.replaceAll('<body', '&lt;body');
  html = html.replaceAll('</body', '&lt;body');
  const slug = path.basename(filename).replace(/\.md$/, '');
  return {
    metadata,
    html,
    markdown,
    slug,
  };
};
