import slugify from 'slugify';

/** Matches filenames that contain dates of the format YYYY-MM-DD */
export const DATE_FILENAME_MATCHER = /^(?:.+\/)*(\d{2,4}-\d{1,2}-\d{1,2})-(.*)(\.[^.]+)$/;

/** Matches filenames that do not contain a date */
export const DATELESS_FILENAME_MATCHER = /^(?:.+\/)*(.*)(\.[^.]+)$/;

interface Overrides {
  date?: Date | string;
  slug?: string;
}

/**
 * Given a filename, attempt to extract a slug and/or date from the string
 */
export default function getDateAndSlug(filename: string, overrides: Overrides = {}) {
  let date;
  let slug = '';

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
  date = overrides.date || date;

  // If `slug` is set in the YAML frontmatter, we will use it in place
  // of the title parsed out of the filename.
  slug = overrides.slug || slug;

  // Pass the slug through a method that will ensure we remove unicode
  slug = slugify(slug);

  return { date, slug };
}
