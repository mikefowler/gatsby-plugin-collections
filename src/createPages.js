import path from 'path';

import createPaginatedPages from 'gatsby-paginate';

import { ROOT_PATH, TEMPLATES_PATH } from './constants';

export default async function createPages({ boundActionCreators, graphql }, options) {
  const { createPage } = boundActionCreators;
  const { collections } = options;
  const templatePath = options.templatePath || TEMPLATES_PATH;

  // Iterate over the defined collections and create pages for all
  // content in each collection's source directory
  return Promise.all(
    collections.map(async (collection) => {
      const { paginate, folder, template, query } = collection;

      const glob = `${path.resolve(ROOT_PATH, folder)}/**`;

      const content = await graphql(`
      {
        entries: allMarkdownRemark(
          sort: {
            fields: [fields___date],
            order: DESC
          },
          filter: {
            fileAbsolutePath: {
              glob: "${glob}"
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
                template
              }
              ${query || ''}
            }
          }
        }
      }
    `);

      if (!content.data) {
        console.log(
          `You defined a “${collection.name}” collection, but there is no content. ` +
            'That’s ok, we’ll skip it.',
        );
      }

      const { edges } = content.data.entries;

      if (paginate) {
        const { perPage: pageLength, template: paginationTemplate, prefix: pathPrefix } = paginate;

        try {
          createPaginatedPages({
            edges,
            createPage,
            pageTemplate: path.resolve(templatePath, `${paginationTemplate}.js`),
            pageLength,
            pathPrefix,
          });
        } catch (e) {
          throw new Error(
            `There was a problem while creating pagination for the ${collection.name} collection!`,
          );
        }
      }

      edges.forEach(({ node }) => {
        const templateFilename = node.frontmatter.template || template;

        if (!templateFilename) {
          throw new Error(`No template was provided for ${collection.name} collection!`);
        }

        const component = path.resolve(templatePath, `${templateFilename}.js`);

        if (!component) {
          throw new Error(`Template “${templateFilename}” does not exist in ${templatePath}.`);
        }

        createPage({
          path: node.fields.slug,
          component,
          context: {
            slug: node.fields.slug,
          },
        });
      });
    }),
  );
}
