import { DateTime } from 'luxon';
import path from 'path';

import getPermalink from './getPermalink';
import getDateAndSlug from './getDateAndSlug';
import getPermalinkPlaceholders from './getPermalinkPlaceholders';
import {
  PERMALINK_PRESETS,
  ROOT_PATH,
} from './constants';

export default async function onCreateNode({
  node,
  boundActionCreators,
}, { collections }) {
  const { createNodeField } = boundActionCreators;

  // This plugin only handles files processed by Remark
  if (node.internal.type !== 'MarkdownRemark') return;

  // Only process files that belong to a defined collection
  const collection = collections.find((c) => {
    const collectionPath = path.resolve(ROOT_PATH, c.folder);
    return node.fileAbsolutePath.includes(collectionPath);
  });

  if (!collection) return;

  // The permalink template is set by the collection's `permalink`
  // option, or defaults to one of the presets
  let permalinkTemplate = collection.permalink || PERMALINK_PRESETS.get('pretty');

  // Check to see if the template matches a named preset, and if it does
  // then swap in the actual slug pattern.
  if (PERMALINK_PRESETS.has(permalinkTemplate)) {
    permalinkTemplate = PERMALINK_PRESETS.get(permalinkTemplate);
  }

  const { categories } = node.frontmatter;
  const { slug, date } = getDateAndSlug(node.fileAbsolutePath, node.frontmatter);

  // Create a Luxon date object so we can easily pull pieces out of the date.
  // If the date came from the node, it is already an instance Date,
  // but if it came from the filename we need to create from a string.
  let dateTime;

  if (date) {
    dateTime = date instanceof Date ?
      DateTime.fromJSDate(date) :
      DateTime.fromISO(date);
  }

  // Generate the placeholder values that we'll use to create the node's permalink.
  const placeholders = getPermalinkPlaceholders({
    categories,
    date: dateTime,
    slug,
  });

  // Create the URL that this node will use as its slug
  const permalink = getPermalink({
    template: permalinkTemplate,
    placeholders,
    permalink: node.frontmatter.permalink,
  });

  // Add `permalink` to the node's fields as `slug`. We'll use this to query pages
  // during the `createPages` phase, and this is also how you will query the node
  // in your page template.
  createNodeField({ node, name: 'slug', value: permalink });

  // Add the date as a field on the node. We will use this for sorting entries.
  createNodeField({ node, name: 'date', value: dateTime && dateTime.toISO() });
}
