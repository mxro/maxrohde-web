# article-cli

## Publishing to Ghost

```
yarn article publish-ghost -b shalveena.com -e prod -
```

## Writing Drafts

Drafts are composed in the `/content/Drafts` folder using Obsidian.


## Prepare Article

Before an article is published, it needs to be prepared for publishing.

This involves moving the article and its linked resources from `/content/Drafts` to `/content/posts`.

To prepare an article for publishing, use `yarn article prepare [article name pattern]`:

```
yarn article prepare "HTTP Endpoint"
```

Note preparing an article will *delete* it and its resources from the `Drafts` and `Resources` directories.

## Publish Article

To publish an article, use `yarn article publish [article folder pattern]`:

```
yarn article publish -e prod http-endpoint
```

Note that after publishing an article, its files will stay in place, so that it can be published again in the future.

After the `yarn article publish` command is run, all the blogs that the article has been published too need to be deployed. This is required so that all additional static resources (e.g. images) are deployed.

## Publish all articles locally

```
yarn article publish -e local -
```
