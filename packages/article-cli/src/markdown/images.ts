export function fixCoverImageLink(link: string): string {
  return `/_goldstack/static/img/cover/${link}`;
}

export function fixContentLinks(markdown: string): string {
  let res = markdown.replaceAll(
    /https:\/\/spearoflight.files.wordpress.com\//g,
    'https://legacy-cdn.pureleap.com/static/spearoflight-media/'
  );
  res = res.replaceAll(
    /https:\/\/nexnet.files.wordpress.com\//g,
    'https://legacy-cdn.pureleap.com/static/maxrohde.com-media/'
  );
  res = res.replaceAll(
    /https:\/\/shalveena.files.wordpress.com\//g,
    'https://legacy-cdn.pureleap.com/static/shalveena.com-media/'
  );
  return res;
}
