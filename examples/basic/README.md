# Example: Basic

This is as plug'n'play as it gets. This project was created by:

1. Creating a new site: `gatsby new basic`

1. Installing the plugin: `npm install gatsby-plugin-collections`

1. Adding the following to the bottom of `gatsby-config.js`:

   ```js
   // ...
   {
     resolve: `gatsby-plugin-filesystem`,
     options: {
       name: 'posts',
       path: `${__dirname}/src/posts`,
     },
   },
   `gatsby-plugin-collections`,
   // ...
   ```

1. Creating some posts: [one](./src/posts/one.md), [two](./src/posts/two.md), and [three](./src/posts/three.md)

1. Adding a layout component:

   ```js
   // src/layouts/Post.jsx

   import { graphql } from 'gatsby'
   import * as React from 'react'

   export const query = graphql`
     query PostQuery($slug: String!) {
       post: markdownRemark(fields: { slug: { eq: $slug } }) {
         html

         frontmatter {
           title
         }
       }
     }
   `

   const Post = ({ data }) => (
     <article>
       <h1>{data.post.frontmatter.title}</h1>
       <div dangerouslySetInnerHTML={{ __html: data.post.html }} />
     </article>
   )

   export default Post
   ```

1. Building the site: `npm run build`

<p style="text-align: center; font-size: 100px">🎉</p>
