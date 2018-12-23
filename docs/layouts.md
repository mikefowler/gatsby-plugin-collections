# Layouts

**[[Quickstart](./quickstart) | [Configuration](./configuration.md) | [Permalinks](./permalinks.md) | [Pagination](./pagination.md) | Layouts]**

Layouts are React components used to render an item in your collection (or a page of items, in the case of pagination).

### Item Layouts

Item layouts receive a slug that can be used `slug` in the layout's GraphQL query.

```jsx
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

### Pagination Layouts

Whereas an item layout receives a single slug corresponding to the item being rendered, pagination layouts receive an _array_ of slugs. Using the power of Gatsby's GraphQL API, we can then query for the correct set of items to be rendered on the page.

Additionally, the React component receives a `pageContext` prop containing the following metadata:

| prop               | type     | description                                                                   |
| ------------------ | -------- | ----------------------------------------------------------------------------- |
| slugs              | string[] | An array of slugs for the items being rendered on this page                   |
| currentPageNumber  | number   | The number of the current page (i.e. 1, 2, 3, etc)                            |
| numberOfPages      | number   | The total number of pages in the collection's pagination                      |
| nextPage           | string   | undefined                                                                     | A path to the next page of results, or `undefined` if this is the last page. This can be passed directly to Gatsby Link |
| nextPageNumber     | number   | undefined                                                                     | The number of the next page, or `undefined` if this is the last page |
| hasNextPage        | boolean  | This will be `true` if there is an additional page of results, `false` if not |
| previousPage       | string   | undefined                                                                     | A path to the previous page of results, or `undefined` if this is the first page. This can be passed directly to Gatsby Link |
| previousPageNumber | number   | undefined                                                                     | The number of the previous page, or `undefined` if this is the first page |
| hasPreviousPage    | boolean  | This will be `true` if there is a previous page of results, `false` if not    |

```js
import { graphql } from 'gatsby';
import { Link } from 'gatsby-link';
import React from 'react';

export const query = graphql`
  query PostsQuery($slugs: [String!]!) {
    posts: allMarkdownRemark(filter: { fields: { slug: { in: $slugs } } }) {
      edges {
        node {
          id

          frontmatter {
            title
          }

          fields {
            slug
          }
        }
      }
    }
  }
`;

const Posts: React.SFC<CodesIndexProps> = ({ data, pageContext: { nextPage, previousPage } }) => (
  <>
    <ul>
      {data.posts.edges.map(({ node }) => (
        <li key={node.id}>
          <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
        </li>
      ))}
    </ul>
    <Link to={previousPage}>Previous</Link> / <Link to={nextPage}>Next</Link>
  </>
);

export default Posts;
```
