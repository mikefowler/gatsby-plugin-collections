import slugify from 'slugify';

// These two matchers are used to parse the node's filename and
// determine whether it contains both a date and title, or just a title.
export const DATELESS_FILENAME_MATCHER = /^(?:.+\/)*(.*)(\.[^.]+)$/;
export const DATE_FILENAME_MATCHER = /^(?:.+\/)*(\d{2,4}-\d{1,2}-\d{1,2})-(.*)(\.[^.]+)$/;

export default function deriveDateAndSlug(filename, overrides = {}) {
  let date;
  let slug;

  // Run a couple of RegExp matches to determine whether the filename includes
  // a valid date, or whether we should just use the filename to get the slug.
  const matchWithDate = filename.match(DATE_FILENAME_MATCHER);
  const matchWithoutDate = filename.match(DATELESS_FILENAME_MATCHER);

  // If the filename includes a date, we want to use that date instead
  if (matchWithDate) {
    [, date, slug] = matchWithDate;
  } else if (matchWithoutDate) {
    [, slug] = matchWithoutDate;
  }

  // If the date is set in the YAML frontmatter, we will prefer it to
  // the date as parsed out of the filename.
  if (overrides.date) {
    ({ date } = overrides);
  }

  // If `slug` is set in the YAML frontmatter, we will use it in place
  // of the title parsed out of the filename.
  if (overrides.slug) {
    ({ slug } = overrides);
  }

  // Pass the slug through a method that will ensure we remove unicode
  slug = slugify(slug);

  return { date, slug };
}
