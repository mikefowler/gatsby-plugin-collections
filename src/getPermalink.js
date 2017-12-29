import ensureSlash from './ensureSlash';

// The permalink is the output URL of the node. It can be manually specified in a node's
// frontmatter, but if it isn't then we generate it using the template specified by the
// collection (or a default preset).
//
// The method of permalink generation here is heavily derivative of Jekyll (as is the whole
// plugin), and uses a string replace with RegExp and callback to look at each placeholder
// in the template, replacing it with the corresponding values in the placeholder object
// defined above.
export default function createPermalink({
  template,
  placeholders,
  permalink,
} = {}) {
  if (!permalink && !template) {
    throw new Error('getPermalink requires either permalink or template');
  }

  if (permalink) {
    return ensureSlash(permalink);
  }

  let url = template.replace(/:([a-z_]+)/g, (_, match) => {
    const trailingUnderscore = match.endsWith('_');
    const possibleKeys = trailingUnderscore ? [match, match.slice(0, -1)] : [match];
    const key = possibleKeys.find(k => Object.prototype.hasOwnProperty.call(placeholders, k));

    if (!key) {
      const err = `The URL template doesn't have ${possibleKeys.map(m => `“${m}”`).join(' or ')} keys!`;
      throw new Error(err);
    }

    const value = placeholders[key] || '';

    return trailingUnderscore ? `${value}_` : value;
  });

  // In case any of our placeholder values were empty strings, we'll replace any
  // instances of `//` with `/` to ensure we don't end up with a malformed URL.
  url = url.replace('//', '/');

  // Return the URL, ensuring that there is a leading and trailing slash
  return ensureSlash(url);
}