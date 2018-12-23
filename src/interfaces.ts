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

  /**
   * If provided, this string will be interpolated into the GraphQL
   * query used to fetch a collection's content. Use this for providing
   * custom fields to your collection layouts
   */
  query?: string;
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

export interface GatsbyCollectionLayoutContext {
  slug: string;
}

export interface GatsbyCollectionPaginationLayoutContext {
  ids: string[];
  currentPageNumber: number;
  numberOfPages: number;
  nextPage: string;
  nextPageNumber: number;
  hasNextPage: boolean;
  previousPage: string;
  previousPageNumber: number;
  hasPreviousPage: boolean;
}
