# article-cli

## Writing Drafts

Drafts are composed in the `/content/Drafts` folder using Obsidian.

## Prepare Article

Before an article is published, it needs to be prepared for publishing.

This involves moving the article and its linked resources from `/content/Drafts` to `/content/posts`.

To prepare an article for publishing, use `yarn article prepare [article name pattern]`:

```
yarn article prepare "HTTP Endpoint"
```

## Publish Article

To publish an article, use `yarn article publish [article folder pattern]`:

```
yarn article publish http-endpoint
```

## Publish all articles locally

```
yarn article publish -e local -
```
