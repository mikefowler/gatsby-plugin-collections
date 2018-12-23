import { DateTime } from 'luxon';

type PlaceholderValue = string | undefined;

export interface PermalinkPlaceholders {
  [placeholder: string]: PlaceholderValue;
  categories: PlaceholderValue;
  title: PlaceholderValue;
  slug: PlaceholderValue;
  collection: PlaceholderValue;
  year: PlaceholderValue;
  month: PlaceholderValue;
  day: PlaceholderValue;
  hour: PlaceholderValue;
  minute: PlaceholderValue;
  second: PlaceholderValue;
  i_day: PlaceholderValue;
  i_month: PlaceholderValue;
  short_month: PlaceholderValue;
  short_year: PlaceholderValue;
  y_day: PlaceholderValue;
}

interface Options {
  categories?: string[];
  collection?: string;
  date?: DateTime;
  slug?: string;
}

/**
 * Create placeholder values that are used to generate a node's permalink.
 * Each key in this object corresponds to a possible permalink template value, .e.g.
 * `/:year/:month/:day/:title`.
 */
const getPermalinkPlaceholders = ({
  categories = [],
  collection,
  date,
  slug,
}: Options = {}): PermalinkPlaceholders => ({
  // Joins the categories, as defined in the frontmatter, with '/', making
  // each string lowercase. We use a Set to eliminate duplicates in
  // the provided array. The Set constructor also allows `null` or
  // `undefined`, so we don't need an additional check.
  categories: [...new Set(categories)].map((c) => c.toLowerCase()).join('/'),

  // Title and slug are effectively the same, and are derived either from
  // the filename or frontmatter
  title: slug,
  slug,

  // The collection placeholder is simply the name of the collection
  collection,

  // The four- to six- digit year, padded to 4 digits
  year: date ? date.toFormat('yyyy') : undefined,

  // The number of the month, padded to 2 digits
  month: date ? date.toFormat('LL') : undefined,

  // The day of the month, padded to 2 digits
  day: date ? date.toFormat('dd') : undefined,

  // The hour on a 24-hour clock, padded to 2 digits
  hour: date ? date.toFormat('HH') : undefined,

  // The minute, padded to 2 digits
  minute: date ? date.toFormat('mm') : undefined,

  // The second, padded to 2 digits
  second: date ? date.toFormat('ss') : undefined,

  // The day of the month, not padded
  i_day: date ? date.toFormat('d') : undefined,

  // The number of the month, not padded
  i_month: date ? date.toFormat('L') : undefined,

  // The month as an abbreviated localized string
  short_month: date ? date.toFormat('LLL') : undefined,

  // The two-digit year
  short_year: date ? date.toFormat('yy') : undefined,

  // The ordinal (day of year), not padded
  y_day: date ? date.toFormat('o') : undefined,
});

export default getPermalinkPlaceholders;
