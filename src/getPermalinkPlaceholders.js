// Create placeholder values that are used to generate a node's permalink.
// Each key in this object corresponds to a possible permalink template value, .e.g.
// `/:year/:month/:day/:title`.
export default function getPermalinkPlaceholders({ categories, date, slug } = {}) {
  return {
    // Joins the categories, as defined in the frontmatter, with '/', making
    // each string lowercase. We use a Set to eliminate duplicates in
    // the provided array. The Set constructor also allows `null` or
    // `undefined`, so we don't need an additional check.
    categories: [...new Set(categories)].map((c) => c.toLowerCase()).join('/'),

    // Title and slug are effectively the same, and are derived either from
    // the filename or frontmatter
    title: slug,
    slug,

    // The four- to six- digit year, padded to 4 digits
    year: date ? date.toFormat('yyyy') : '',

    // The number of the month, padded to 2 digits
    month: date ? date.toFormat('LL') : '',

    // The day of the month, padded to 2 digits
    day: date ? date.toFormat('dd') : '',

    // The hour on a 24-hour clock, padded to 2 digits
    hour: date ? date.toFormat('HH') : '',

    // The minute, padded to 2 digits
    minute: date ? date.toFormat('mm') : '',

    // The second, padded to 2 digits
    second: date ? date.toFormat('ss') : '',

    // The day of the month, not padded
    i_day: date ? date.toFormat('d') : '',

    // The number of the month, not padded
    i_month: date ? date.toFormat('L') : '',

    // The month as an abbreviated localized string
    short_month: date ? date.toFormat('LLL') : '',

    // The two-digit year
    short_year: date ? date.toFormat('yy') : '',

    // The ordinal (day of year), not padded
    y_day: date ? date.toFormat('o') : '',
  };
}
