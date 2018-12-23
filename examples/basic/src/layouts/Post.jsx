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
