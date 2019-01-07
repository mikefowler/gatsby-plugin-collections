# Pagination

[Quickstart](./quickstart.md) | [Configuration](./configuration.md) | [Permalinks](./permalinks.md) | Pagination | [Layouts](./layouts.md)

Support for paginated collections is built in, and easy to configure. Update your collection object with a `paginate` key, specifying [the layout to use for pagination](./layouts.md#pagination-layouts) and, optionally, the number of items to display per page:

```js
collections: [
  {
    name: 'essays',
    path: `${dirname}/src/essays`,
    permalink: ':collection/:title',
    paginate: {
      perPage: 20,
      layout: 'Essays',
    },
  },
];
```

Pagination permalinks are of the format `/:collection/:pageNumber`, except for the first page, which is created at `/:collection`.
