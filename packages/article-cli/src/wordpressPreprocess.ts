import { readFileSync, writeFileSync } from 'fs';

export function wordpressPreprocess(input: string): string {
  let pattern = /<!-- wp:syntaxhighlighter\/code {"language":"([^"]*)"} -->\s*<pre class="wp-block-syntaxhighlighter-code">/g;
  let res = input.replace(pattern, '<pre><code class="language-$1">');

  pattern = /<!-- wp:syntaxhighlighter\/code -->\s*<pre class="wp-block-syntaxhighlighter-code">/g;
  res = res.replace(pattern, '<pre><code>');

  pattern = /<\/pre>\s*<!-- \/wp:syntaxhighlighter\/code -->/g;
  res = res.replace(pattern, '</code></pre>');

  pattern = /<code class="language-jscript"/g;
  res = res.replace(pattern, '<code class="language-typescript"');

  return res;
}

export async function wordpressPreprocessFile(
  xmlFilePath: string,
  destFilePath: string
): Promise<void> {
  const input = readFileSync(xmlFilePath, 'utf8');
  const res = wordpressPreprocess(input);
  writeFileSync(destFilePath, res, 'utf8');
}
