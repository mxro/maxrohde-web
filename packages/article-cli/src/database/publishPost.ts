import { PostEntity, deepCopy, Post } from 'db-blog';
import { Entity } from 'dynamodb-toolbox';
import { convert as htmlToText } from 'html-to-text';
import { fixCoverImageLink } from '../markdown/images';
import { PublishArgs, ResultType, fixAttachmentsLinksInHtml } from './publish';
import { copyCoverImage, copyAttachments } from './publishPostFileUtils';

export async function createPosts(
  args: PublishArgs,
  results: ResultType[]
): Promise<void> {
  const Posts = new Entity({ ...deepCopy(PostEntity), table: args.table });

  await Promise.all(
    results.map(async (result) => {
      const post = result.post;
      console.log('Publishing article:', result.path);

      const fixedHtml = fixAttachmentsLinksInHtml(post.html, result.path);
      const fixedMarkdown = fixAttachmentsLinksInMarkdown(
        post.markdown,
        result.path
      );

      const postData: Post = {
        blog: post.metadata.blog,
        secondaryBlogs: post.metadata.secondaryBlogs
          ? post.metadata.secondaryBlogs.join(',')
          : undefined,
        title: post.metadata.title,
        contentHtml: fixedHtml,
        summary:
          post.metadata.summary ||
          htmlToText(post.html, {
            wordwrap: false,
            selectors: [
              { selector: 'a', options: { ignoreHref: true } },
              { selector: 'img', format: 'skip' },
            ],
          }).slice(0, 150) + '...',
        path: result.path,
        contentMarkdown: fixedMarkdown,
        authors: 'max',
        tags: post.metadata.tags ? post.metadata.tags.join(',') : [],
        categories: post.metadata.categories
          ? post.metadata.categories.join(',')
          : [],
        coverImage: post.metadata.coverImage
          ? fixCoverImageLink(post.metadata.coverImage)
          : undefined,
        datePublished: new Date(post.metadata.date).toISOString(),
        canonicalUrl: post.metadata.canonicalUrl,
      };

      await putPost(Posts, result, postData);
      // publish for primary blog
      return publishToSecondaryBlogs(Posts, result, postData);
    })
  );
}

export function fixAttachmentsLinksInMarkdown(
  markdown: string,
  postPath: string
): string {
  return markdown.replaceAll(
    /\(images\//g,
    `(/_goldstack/static/img/attachments/${postPath}/`
  );
}
async function putPost(Posts: any, result: ResultType, postData: Post) {
  await Posts.put(postData);
  if (result.post.metadata.coverImage) {
    await copyCoverImage({
      blog: postData.blog,
      filename: result.filename,
      coverImage: result.post.metadata.coverImage,
    });
  }
  await copyAttachments({
    blog: postData.blog,
    filename: result.filename,
    postPath: result.path,
  });
}

async function publishToSecondaryBlogs(
  Posts: any,
  result: ResultType,
  post: Post
) {
  if (!post.secondaryBlogs) {
    return;
  }

  return Promise.all(
    post.secondaryBlogs.split(',').map((secondaryBlog) => {
      return putPost(Posts, result, {
        ...post,
        blog: secondaryBlog,
        canonicalUrl: post.canonicalUrl || `https://${post.blog}/${post.path}`,
      });
    })
  );
}
