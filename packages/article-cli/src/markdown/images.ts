export function fixCoverImageLink(link: string): string {
  return `/_goldstack/static/img/cover/${link}`;
}

export function fixContentLinks(markdown: string): string {
  let res = markdown.replaceAll(
    /https:\/\/spearoflight.files.wordpress.com\//g,
    '/_goldstack/static/img/spearoflight-media/'
  );
  res = res.replaceAll(
    /https:\/\/shalveena.files.wordpress.com\//g,
    '/_goldstack/static/img/shalveena.com-media/'
  );
  return res;
}
