# Configuration

**[[Quickstart](./quickstart) | Configuration | [Permalinks](./permalinks.md) | [Pagination](./pagination.md) | [Layouts](./layouts.md)]**

The following plugin options are available:

## Global

| property    | type    | required? | default     | description                                                                                        |
| ----------- | ------- | --------- | ----------- | -------------------------------------------------------------------------------------------------- |
| collections | Array   | no        | null        | an array of collections (see below)                                                                |
| debug       | boolean | no        | false       | setting this to true will log out messages pertaining to Gatsby Collections during build processes |
| layoutsPath | string  | no        | src/layouts | if set, Gatsby Collections will look for layout files in this directory                            |

## Collection

| property          | type   | required? | default | description                                                                                                       |
| ----------------- | ------ | --------- | ------- | ----------------------------------------------------------------------------------------------------------------- |
| name              | string | yes       |         | the name of the collection                                                                                        |
| path              | string | yes       |         | the path to your collection's source files, relative to the root of your project                                  |
| permalink         | string | no        |         | the permalink template for this collection                                                                        |
| template          | string | no        |         | a path to the React component each collection item should use to render                                           |
| paginate          | object | no        |         | defines pagination options. If an object is provided, it will be assumed that you want your collection paginated. |
| paginate.perPage  | number | no        | 10      | the number of items to be displayed on each paginated page                                                        |
| paginate.template | string | yes       |         | a path to the React component that will be used to render the collection's pagination                             |
