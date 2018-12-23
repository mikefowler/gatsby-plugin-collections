# Documentation

**[[Quickstart](./quickstart) | [Configuration](./configuration.md) | [Permalinks](./permalinks.md) | [Pagination](./pagination.md) | [Layouts](./layouts.md)]**

Gatsby Collections creates pages for collections of Markdown files, with support for pagination, customizable permalinks, and configurable layouts.

With minimal configuration, a collection of files like this:

```
src/
  posts/
    - 2018-10-12-one.md
    - 2018-11-24-two.md
    - 2018-12-22-three.md
```

…becomes a collection of _pages_ like this:

```
https://foo.bar/posts/2018/10/12/one
https://foo.bar/posts/2018/11/24/two
https://foo.bar/posts/2018/12/22/three
```

Collections work a lot like—and are completely derivative of—Jekyll's [collections](https://jekyllrb.com/docs/collections/).
