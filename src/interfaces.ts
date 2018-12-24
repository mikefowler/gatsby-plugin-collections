import { GraphQLError } from 'graphql';

export interface GatsbyCollectionOptions {
  /** A relative path to your collection's content */
  path: string;

  /** Should debug messages be logged? */
  debug?: boolean;

  /** An array of collections to generate pages for */
  collections: GatsbyCollection[];

  /** A path to the directory where this plugin will look for layout files */
  layoutPath?: string;

  /** Overrides the default permalink template */
  permalink?: string;
}

export interface GatsbyCollection {
  /** The name of this collection */
  name: string;

  /** A path to the collection's Markdown files */
  path: string;

  /** The maximum number of items to include in this collection */
  limit?: number;

  /** The name of the layout component to use for this collection */
  layout?: string;

  /** The permalink style to use for the generated collection's paths */
  permalink?: string;

  /** Should this collection be paginated? */
  paginate?: GatsbyCollectionPaginationOptions;

  /** Should we create pages for this collection's items? */
  output?: boolean;
}

export interface GatsbyCollectionPaginationOptions {
  /** How many items should be appear on a page? */
  perPage?: number;

  /** The filename of the layout component used to render a page */
  layout: string;
}

export interface GatsbyCollectionNode {
  id: string;
  frontmatter: {
    title?: string;
    layout?: string;
    date?: string;
  };
  fields: {
    slug: string;
  };
}

export interface GatsbyCollectionContent {
  errors?: GraphQLError[];
  data: {
    allMarkdownRemark: {
      edges: [
        {
          node: GatsbyCollectionNode;
        }
      ];
    };
  };
}

export interface GatsbyCollectionLayoutContextProp {
  /** The slug of the item to render */
  slug: string;
}

export interface GatsbyCollectionPaginationContextProp {
  /** The slugs of the items to render on this page */
  slugs: string[];

  /** The current page number in the paginated collection */
  currentPageNumber: number;

  /** The total number of pages in the paginated collection */
  numberOfPages: number;

  /** A path to the next page of results, unless this is the last page */
  nextPage?: string;

  /** The number of the next page, unless this is the last page */
  nextPageNumber?: number;

  /** Is there a next page of results? */
  hasNextPage: boolean;

  /** A path to the previous page of results, unless this is the first page */
  previousPage: string;

  /** The number of the previous page, unless this is the first page */
  previousPageNumber: number;

  /** Is there a previous page of results? */
  hasPreviousPage: boolean;
}
