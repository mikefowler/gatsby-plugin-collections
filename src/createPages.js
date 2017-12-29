import createPaginatedPages from 'gatsby-paginate';

export default async function createPages({
  boundActionCreators,
  graphql,
}, options) {
  const { createPage } = boundActionCreators;
  const { collections } = options;

  // Iterate over the defined collections and create pages for all
  // content in each collection's source directory
  return Promise.all(collections.map(async (collection) => {
    const {
      paginate,
      path: source,
      template,
    } = collection;

    const content = await graphql(`
      {
        entries: allMarkdownRemark(
          sort: {
            fields: [fields___date],
            order: DESC
          },
          filter: {
            fileAbsolutePath: {
              glob: "${source}/**"
            }
          },
          limit: 1000
        ) {
          edges {
            node {
              id
              excerpt
              fields {
                slug
                date(formatString: "MMMM D, YYYY")
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `);

    if (!content.data) {
      throw new Error(`No content found for the “${collection.name}” collection!`);
    }

    const { edges } = content.data.entries;

    if (paginate) {
      const {
        perPage: pageLength,
        template: pageTemplate,
        path: pathPrefix,
      } = paginate;

      createPaginatedPages({
        edges,
        createPage,
        pageTemplate,
        pageLength,
        pathPrefix,
      });
    }

    edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: template,
        context: {
          slug: node.fields.slug,
        },
      });
    });
  }));
}
