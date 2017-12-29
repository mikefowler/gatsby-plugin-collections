# Gatsby Collections

Curious about Gatsby, but nervous about porting your Jekyll website? _Gatsby Collections_ attempts to make the process a little smoother.

## What are collections?

Collections allow you to quickly create pages from a flat folder of Markdown files, with full control over permalinks and pagination. Collections work a lot like—and are completely derivative of—Jekyll's [collections](https://jekyllrb.com/docs/collections/).

Let's say you define a `posts` collection. You specify that the source files are in `src/posts`, and that you want the output URLs to use the permalink template `/:year/:month/:day/:title`. Then you create a file at `src/posts/2017-12-28-hello-world.md`. When Jekyll builds your site, your page will be built at `/2017/12/28/hello-world/`.

🎉🎉🎉

## Tutorial

This tutorial will bring you through the process of creating a "posts" collection.

1. You'll need a few dependencies. If you've already started a Gatsby site, you may already have a couple of these.
    ```
    yarn add gatsby-source-filesystem gatsby-paginate gatsby-plugin-collections

    // OR

    npm install gatsby-source-filesystem gatsby-paginate gatsby-plugin-collections
    ```

1. In `gatsby-config.js`, add a configuration block specifying that nodes should be sourced from `src/posts`:
    
    ```js
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/src/posts/`,
      },
    }
    ```

1. Now add a configuration block defining our “posts” collection:
    ```js
    {
    resolve: 'gatsby-plugin-collections',
    options: {
      collections: [{
        name: 'posts',
        path: `${__dirname}/src/posts`,
        permalink: '/journal/:year/:month/:day/:title',
        template: `${__dirname}/src/templates/journal-entry.js`,
        paginate: {
          perPage: 10,
          prefix: 'journal',
          template: `${__dirname}/src/templates/journal.js`,
        },
      }],
    },
    }
    ```

1. You are done!

## Configuration

Each collection accepts the following configuration options:

- _`name (string)`_: the name of the collection
- _`path (string) [required]`_: a path containing your collection's source files
- _`permalink (string)`_: the template string for the collection's output URLs
- _`template (string)`_: a path to the React component each collection item should use to render
- _`paginate (Object)`_: defines pagination options. If an object is provided, it will be assumed that you want your collection paginated.
    - _`perPage (Number)`_: the number of items to be displayed on each paginated page
    - _`template (string) [required]`_: a path to the React component that will be used to render the pagination pages.
    - _`prefix` (string)_: an optional string to append before the paginated page URLs. You will want to use this if you are paginating multiple collections. A value of "journal" will result in paginated URLs such as `/journal`, `/journal/2`, `/journal/3`, etc.

## Permalinks

Permalinks in _Gatsby Collections_ function much the same as in [Jekyll](https://jekyllrb.com/docs/permalinks/). When you specify a permalink for your collection, you are specifying a _template_ that will be used to build your URLs. One example of a permalink template is `/:year/:month/:day/:title`.

Setting the permalink in your node's front matter will override the setting specified by your collection:

```md
---
title: Hello, world!
permalink: /hello
```

In addition to specifying your own template string using the [available template variables](https://jekyllrb.com/docs/permalinks/#template-variables), you can specify several presets by name:

- `pretty`: `/:categories/:year/:month/:day/:title`
- `ordinal`: `/:categories/:year/:y_day/:title`
- `none`: `/:categories/:title`

## Templates

### Item Templates

Item templates are no different than the [sample template](https://github.com/gatsbyjs/gatsby-starter-blog/blob/master/src/templates/blog-post.js) provided with `gatsby-starter-blog`. _Gatsby Collections_ automatically adds your page's `slug` to the context, so querying your post by `slug` will work out of the box.

### Pagination Templates

Pagination templates are used to create the pages that display a list of your collection items. The template is a standard React component. It receives props that provide the group of nodes available for display on this page, as well as metadata for displaying the current, next, and previous, page numbers. For more information, reference the documentation for [gatsby-paginate](https://github.com/pixelstew/gatsby-paginate).

A pagination template might look something like this:

```js
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  pathContext: PropTypes.shape({
    group: PropTypes.array,
    index: PropTypes.number,
  }).isRequired,
};

const JournalPage = ({ pathContext }) => {
  const {
    group,
    index,
    pageCount,
    pathPrefix,
  } = pathContext;
  const previousPage = (index === 0) ? null : (index - 1);
  const nextPage = (index === pageCount) ? null : (index + 1);

  return (
    <div>
      <ul>
        {group.map(({ node }) => (
          <li>{node.frontmatter.title}</li>
        ))}
      </ul>
      <p>Page {index} of {pageCount}</p>
    </div>
  );
};

JournalPage.propTypes = propTypes;

export default JournalPage;
```
