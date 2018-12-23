# Permalinks

[Quickstart](./quickstart) | [Configuration](./configuration.md) | Permalinks | [Pagination](./pagination.md) | [Layouts](./layouts.md)

Permalinks are template strings that define how an item's URL is constructed. They contain [placeholder values](#permalink-template-variables) (i.e. `:collection`) that are replaced by actual values during the Gatsby build process. The default permalink template is the [`pretty` preset](#presets).

There are three ways to define permalink templates:

1. Globally, in `gatsby-config.js`:

   ```js
   {
     resolve: 'gatsby-plugin-collections',
     options: {
       permalink: '/:collection/:name',
     },
   }
   ```

1. For an entire collection, also in `gatsby-config.js`:

   ```js
   {
     resolve: 'gatsby-plugin-collections',
     options: {
       collections: [{
         path: `${__dirname}/src/posts`,
         permalink: '/:collection/:year/:month/:day/:title',
       }],
     },
   }
   ```

1. For a specific item, in the YAML frontmatter:

   ```md
   ---
   title: Hello, world!
   permalink: /:collection/some-custom-url/
   ---

   Sociis odio rutrum est praesent interdum quam rhoncus dolor ultrices nulla, faucibus nascetur parturient id libero dignissim.
   ```

## Template variables

| variable   | description                                                                                                                                                                                                                                                                           |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| year       | Year from the item's filename. May be overridden via the items’s `date` frontmatter                                                                                                                                                                                                   |
| month      | Month from the item's filename. May be overridden via the item's `date` frontmatter                                                                                                                                                                                                   |
| i_month    | Month without leading zeros from the item's filename. May be overridden via the item's date frontmatter                                                                                                                                                                               |
| day        | Day from the items filename. May be overridden via the document’sdate front matter                                                                                                                                                                                                    |
| i_day      | Day without leading zeros from the item's filename. May be overridden via the item's `date` frontmatter                                                                                                                                                                               |
| y_day      | Day of the year from the item's filename, with leading zeros                                                                                                                                                                                                                          |
| short_year | Year without the century from the item's filename. May be overridden via the item's `date` frontmatter                                                                                                                                                                                |
| hour       | Hour of the day, 24-hour clock, zero-padded from the item's date front matter. (00..23)                                                                                                                                                                                               |
| minute     | Minute of the hour from the item's `date` frontmatter (00..59)                                                                                                                                                                                                                        |
| second     | Second of the minute from the item's `date` frontmatter (00..59)                                                                                                                                                                                                                      |
| title      | Title from the item’s filename. May be overridden via the item's `slug` frontmatter                                                                                                                                                                                                   |
| slug       | Slugified title from the item’s filename (any character except numbers and letters is replaced as hyphen). May be overridden via the items’s `slug` frontmatter                                                                                                                       |
| categories | The specified categories for this item. If an item has multiple categories, Gatsy Collections will create a hierarchy (e.g. /category1/category2). Also Gatsby Collections automatically parses out double slashes in the URLs, so if no categories are present, it will ignore this. |
| collection | The slugified name of this collection                                                                                                                                                                                                                                                 |

## Presets

In addition to specifying your own template string using the [available template variables](#template-variables), you can specify several presets by name:

- `pretty`: `/:collection/:year/:month/:day/:title`
- `ordinal`: `/:collection/:year/:y_day/:title`
- `none`: `/:collection/:title`
