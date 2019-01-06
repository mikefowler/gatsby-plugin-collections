# Changelog

## Unreleased

- [fix] Remove `console.log` statement

## 1.1.2

- [fix] Fixes a bug where having no available frontmatter fields results in a GraphQL query error in `createPages`

## 1.1.1

- [fix] Fixes a bug in the "pretty" permalink preset, where `:year` was duplicated by accident

## 1.1.0

- [new] Added an `output` option to the collection configuration. Setting it to `false` will enhance a collection's nodes with fields, but will not create pages for them. This is useful for when you want to render an entire collection on one page, and individual item's don't need permalinks.
- [fix] Improve exported TypeScript interfaces

## 1.0.1

- [fix] Include `index.d.ts` in the published NPM package
- [fix] NPM `postversion` command now commits changes to `package-lock.json`

## 1.0.0

- [breaking] The names of plugin config options have changed. Please refer to the documentation.
- [new] Refactored source code in TypeScript
- [new] Remove `gatsby-paginate` dependency
