import { GatsbyCreatePages } from 'gatsby';
import chunk from 'lodash/chunk';
import path from 'path';
import pluralize from 'pluralize';

import { DEFAULT_PER_PAGE, ROOT_PATH } from './constants';
import getAvailableFrontmatterFields from './getAvailableFrontmatterFields';
import getAvailableNodeFields from './getAvailableNodeFields';
import getCollections from './getCollections';
import getLayout from './getLayout';
import getPaginationPath from './getPaginationPath';
import { GatsbyCollectionContent, GatsbyCollectionOptions } from './interfaces';

const createPages: GatsbyCreatePages<GatsbyCollectionOptions> = async (
  { actions, graphql, reporter },
  pluginOptions,
) => {
  const { createPage } = actions;
  const collections = getCollections(pluginOptions);
  const { debug, layoutPath } = pluginOptions;

  // Iterate over the defined collections and create pages for all
  // content in each collection's source directory
  return Promise.all(
    collections.map(async (collection) => {
      const { paginate, path: collectionPath, output = true, limit = 1000 } = collection;

      // If the collection has specified `output: false`, then we
      // won't create pages for it
      if (!output) {
        return;
      }

      // We'll recursively look for all *.md and *.markdown files in the collection's path
      const glob = `${path.resolve(ROOT_PATH, collectionPath)}/{**/,}*.{md,markdown}`;

      if (debug) {
        reporter.info(`Creating pages for “${collection.name}” collection from directory ${glob}`);
      }

      // Get an array of available frontmatter fields for this collection
      const frontmatterFields = await getAvailableFrontmatterFields({ graphql });

      // Get an array of all available node fields
      const nodeFields = await getAvailableNodeFields({ graphql });

      // By default, we need to sort by a field we know exists. Since we add a slug
      // to every node in a collection, we know that this will exist.
      let sortField = 'fields___slug';

      if (nodeFields.includes('date')) {
        // If the date field is available, it makes more sense to sort on that
        sortField = 'fields___date';
      } else if (frontmatterFields.includes('title')) {
        // Finally, if the title field is available, we'll sort on that
        sortField = 'frontmatter___title';
      }

      const contentQuery = `
        {
          allMarkdownRemark(
            sort: {
              fields: [${sortField}]
              order: DESC
            }
            filter: {
              fields: {
                collection: {
                  eq: "${collection.name}"
                }
              }
            },
            limit: ${limit}
          ) {
            edges {
              node {
                id
                fields {
                  slug
                }
                frontmatter {
                  ${frontmatterFields.includes('layout') ? 'layout' : ''}
                }
              }
            }
          }
        }
      `;

      let content: GatsbyCollectionContent;

      try {
        content = await graphql(contentQuery);
      } catch (e) {
        reporter.error(e.message);
        throw new Error(e.message);
      }

      if (content.errors) {
        content.errors.forEach((error) => {
          reporter.error(error.message);
        });
        throw new Error(
          `There was a problem getting content for your ${
            collection.name
          } collection. This is probably not your fault.`,
        );
      }

      if (!content.data) {
        if (debug) {
          reporter.error(
            `You defined a “${
              collection.name
            }” collection, but there is no content. That’s ok, we’ll skip it.`,
          );
        }

        return;
      }

      const { edges } = content.data.allMarkdownRemark;

      edges.forEach(({ node }) => {
        // The layout name can be specified in the Markdown frontmatter. By default, we
        // will try to discover the layout by using the singular form of the collection
        // name. For example, a "posts" collection will look for layout files named "post"
        const layoutName =
          node.frontmatter.layout || collection.layout || pluralize.singular(collection.name);

        // TODO: providing a default layout component would be nice
        const layout = getLayout(layoutName, { layoutPath });

        createPage({
          path: node.fields.slug,
          component: layout,
          context: {
            slug: node.fields.slug,
          },
        });

        if (debug) {
          reporter.success(`Created page ${node.fields.slug}`);
          reporter.success(`\t- Layout: ${layout}`);
        }
      });

      // Do we want to paginate this collection?
      if (paginate) {
        const { perPage = DEFAULT_PER_PAGE, layout: paginationLayoutName } = paginate;

        // Break the collection's edges into "pages"
        const pages = chunk(edges, perPage);

        // How many total pages will there be?
        const numberOfPages = pages.length;

        pages.forEach((items, index) => {
          // The current page number
          const currentPageNumber = index + 1;

          // Is it the first page in the set?
          const hasPreviousPage = index !== 0;

          // Is it the last page in the set?
          const hasNextPage = index < numberOfPages - 1;

          // The next page number, or `null` if this is the first page
          const nextPageNumber = hasNextPage ? currentPageNumber + 1 : undefined;

          // The previous page number, or `null` if this is the last page
          const previousPageNumber = hasPreviousPage ? currentPageNumber - 1 : undefined;

          const basePath = collection.name;
          const currentPath = getPaginationPath(basePath, currentPageNumber) as string;
          const nextPage = getPaginationPath(basePath, nextPageNumber);
          const previousPage = getPaginationPath(basePath, previousPageNumber);

          createPage({
            path: currentPath,
            component: getLayout(paginationLayoutName, { layoutPath }),
            context: {
              slugs: items.map(({ node }) => node.fields.slug),
              currentPageNumber,
              numberOfPages,
              nextPage,
              nextPageNumber,
              hasNextPage,
              previousPage,
              previousPageNumber,
              hasPreviousPage,
            },
          });

          if (debug) {
            reporter.success(`Created page ${currentPath}`);
          }
        });
      }
    }),
  );
};

export default createPages;
