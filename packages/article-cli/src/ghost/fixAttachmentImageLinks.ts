export function fixAttachmentLinks(
  serverUrl: string,
  content: string,
  postDir: string
): string {
  let newContent = `${content}`;
  // console.log(newContent);
  // const matches = content.matchAll(/\[[^\]]*\]\(([^)]*)\)*/g);
  const matches = content.matchAll(/<img\s+src="(images\/([^"]+))"[^>]*>/gi);

  for (const match of matches) {
    const oldString = match[1];
    const newString = `${serverUrl}content/images/attachments/${postDir}/${match[2]}`;
    // Escape special characters in the oldString to create a valid regex
    const escapedOldString = oldString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Create a regular expression with the escaped oldString
    const regex = new RegExp(escapedOldString, 'g');

    // Replace all occurrences of the oldString with the newString
    newContent = newContent.replace(regex, newString);
  }
  return newContent;
}
