export function fixCoverImageLink(link: string): string {
  return `_goldstack/static/img/cover/${link}`;
}

export function fixContentLinks(markdown: string): string {
  const res = markdown.replaceAll(
    /https:\/\/spearoflight.files.wordpress.com\//g,
    '/_goldstack/static/img/spearoflight-media/'
  );
  return res;
}
