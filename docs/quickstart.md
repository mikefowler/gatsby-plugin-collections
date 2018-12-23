# Quickstart

**[Quickstart | [Configuration](./configuration.md) | [Permalinks](./permalinks.md) | [Pagination](./pagination.md) | [Layouts](./layouts.md)]**

## Install dependencies

1. Gatsby Collections is built on top of [`gatsby-transformer-remark`](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-remark). If you haven't already, you'll need to set that up.

1. Install the plugin using your preferred package manager:

   ```
   npm install gatsby-plugin-collections

   // OR

   yarn add gatsby-plugin-collections
   ```

Dope. Now let's use it.

## Configure

By default, Gatsby Collections sets up a “posts” collection, allowing you to use the plugin with (almost) zero configuration.

1. _Configure the plugin_

   In `gatsby-config.js`, add a configuration block specifying that nodes should be sourced from `src/posts`, and that we want to use this plugin:

   ```js
   {
     // ...
     {
       resolve: 'gatsby-source-filesystem',
       options: {
         name: 'posts',
         path: `${__dirname}/src/posts/`,
       },
     },
     'gatsby-plugin-collections',
     // ...
   }
   ```

1. _Add some content_

   Create a file at `src/posts/2018-12-21-hello-world.md`:

   ```md
   ---
   title: Hello, world!
   ---

   My first post!
   ```

1. _Add a layout_

   Gatsby Collections will look for layout components in `src/layouts`. By default, layout filenames are assumed to be the singular tense of your collection name. If your collection is named "posts", we'll look for the following layout components, and choose the first one we find:

   - `src/layouts/post.js`
   - `src/layouts/post.jsx`
   - `src/layouts/post.tsx`
   - `src/layouts/Post.js`
   - `src/layouts/Post.jsx`
   - `src/layouts/Post.tsx`

   The layout component itself is a simple React component. Gatsby Collections automatically creates a slug and passes it to the GraphQL query:

   ```js
   import { graphql } from 'gatsby';
   import * as React from 'react';

   export const query = graphql`
     query PostQuery($slug: String!) {
       post: markdownRemark(fields: { slug: { eq: $slug } }) {
         html

         frontmatter {
           title
         }
       }
     }
   `;

   const Post = ({ data }) => (
     <article>
       <h1>{data.post.frontmatter.title}</h1>
       <div dangerouslySetInnerHTML={{ __html: data.post.html }} />
     </article>
   );

   export default Post;
   ```

   [Read more below](#layouts) for more information about layouts, including how to change the default layout directory, manually set a layout for a collection, and how to change the layout on a per-item basis.

1. Run `gatsby develop`. Your post has been created at `http://localhost:8000/2018/12/2018/hello-world/`.

## Defining collections

Here's how you would go about adding a custom collection named "essays".

1. In `gatsby-config.js`, add a configuration block specifying that nodes should be sourced from `src/essays`:

   ```js
   {
     resolve: 'gatsby-source-filesystem',
     options: {
       name: 'essays',
       path: `${__dirname}/src/essays/`,
     },
   }
   ```

1. Now add a configuration block defining our “essays” collection:

   ```js
   {
     resolve: 'gatsby-plugin-collections',
     options: {
       collections: [{
         name: 'essays',
         path: 'src/essays',
         permalink: ':collection/:title',
       }],
     },
   }
   ```

1. Add a [layout](./layouts.md), e.g. `src/layouts/Essay.jsx`

1. Add a file, e.g. `src/essays/on-being.md`

1. You are done! In development, your first essay will appear at `http://localhost:8000/essays/on-being`.
