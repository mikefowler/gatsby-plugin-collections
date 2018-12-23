import { GatsbyOnCreateNode } from 'gatsby';
import { DateTime } from 'luxon';
import path from 'path';

import { DEFAULT_PERMALINK_TEMPLATE, PERMALINK_PRESETS, ROOT_PATH } from './constants';
import getCollections from './getCollections';
import getDateAndSlug from './getDateAndSlug';
import getPermalink from './getPermalink';
import getPermalinkPlaceholders from './getPermalinkPlaceholders';
import { GatsbyCollectionOptions } from './interfaces';

const onCreateNode: GatsbyOnCreateNode<GatsbyCollectionOptions> = async (
  { node, actions, reporter },
  pluginOptions,
) => {
  const { createNodeField } = actions;
  const collections = getCollections(pluginOptions);

  // This plugin only handles files processed by Remark
  if (node.internal.type !== 'MarkdownRemark') {
    return;
  }

  // Only process files that belong to a defined collection
  const collection = collections.find((c) => {
    const collectionPath = path.resolve(ROOT_PATH, c.path);
    return node.fileAbsolutePath.includes(collectionPath);
  });

  if (!collection) {
    return;
  }

  const { frontmatter = {} } = node;
  const { categories } = frontmatter;
  const { slug, date } = getDateAndSlug(node.fileAbsolutePath, node.frontmatter);

  // The permalink template is set, in order, by either:
  //   - the `permalink` field in an item's YAML frontmatter
  //   - the `permalink` property of a collection's configuration
  //   - the `permalink` property of the plugin's configuration
  //   - the DEFAULT_PERMALINK_TEMPLATE, as a fallback
  let permalinkTemplate =
    frontmatter.permalink ||
    collection.permalink ||
    pluginOptions.permalink ||
    DEFAULT_PERMALINK_TEMPLATE;

  // Check to see if the template matches a named preset, and if it does
  // then swap in the actual slug pattern.
  if (PERMALINK_PRESETS[permalinkTemplate]) {
    permalinkTemplate = PERMALINK_PRESETS[permalinkTemplate];
  }

  // Create a Luxon date object so we can easily pull pieces out of the date.
  // If the date came from the node, it is already an instance Date,
  // but if it came from the filename we need to create from a string.
  let dateTime;

  if (date) {
    dateTime = date instanceof Date ? DateTime.fromJSDate(date) : DateTime.fromISO(date);
  }

  // Generate the placeholder values that we'll use to create the node's permalink.
  const placeholders = getPermalinkPlaceholders({
    categories,
    date: dateTime,
    slug,
    collection: collection.name,
  });

  // Create the URL that this node will use as its slug
  const permalink = getPermalink({
    template: permalinkTemplate,
    placeholders,
  });

  // Add the name of the collection as a field on the node. This makes it easy
  // to query GraphQL for all items in a given collection
  createNodeField({ node, name: 'collection', value: collection.name });

  // Add `permalink` to the node's fields as `slug`. We'll use this to query pages
  // during the `createPages` phase, and this is also how you will query the node
  // in your page template.
  createNodeField({ node, name: 'slug', value: permalink });

  // Add the date as a field on the node. We will use this for sorting entries.
  createNodeField({ node, name: 'date', value: dateTime && dateTime.toISO() });
};

export default onCreateNode;
