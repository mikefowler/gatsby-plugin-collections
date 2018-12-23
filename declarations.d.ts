// gatsby
declare module 'gatsby' {
  import * as gatsby from 'gatsby';

  interface GatsbyNode {
    id: string;
    url?: string;
    parent?: GatsbyNode;
    children?: GatsbyNode[];
    mediaType: string;
    type: string;
    internal: {
      type: string;
      contentDigest: string;
      content: string;
    };
  }

  interface GatsbyCreateNodeOptions {
    id: string;
    parent: string;
    children: string[];
    internal?: {
      type: string;
      contentDigest: string;
      mediaType?: string;
      content?: string;
      description?: string;
    };
  }

  interface GatsbyCreateNode {
    (options: GatsbyCreateNodeOptions): void;
  }

  interface GatsbyCreateNodeFieldOptions {
    node: GatsbyNode;
    name: string;
    value: any;
  }

  interface GatsbyCreateNodeField {
    (options: GatsbyCreateNodeFieldOptions): void;
  }

  interface GatsbyCreatePageOptions {
    path: string;
    component: any; // TODO ReactComponent;
    context: any;
  }

  interface GatsbyCreatePage {
    (options: GatsbyCreatePageOptions): void;
  }

  interface GatsbyActions {
    createNode: GatsbyCreateNode;
    createNodeField: GatsbyCreateNodeField;
    createPage: GatsbyCreatePage;
  }

  interface GatsbyOnCreateNodeOptions {
    resolvableExtensions: string[];
    createPages: (options: { graphql: any; actions: GatsbyActions }) => void;
    createPagesStatefully: GatsbyOnCreateNodeOptions['createPages'];
    sourceNodes: (options: { actions: GatsbyActions }) => void;
    actions: GatsbyActions;
    node: GatsbyNode;
    reporter: {
      error(...args: any): void;
      success(...args: any): void;
      info(...args: any): void;
    };
  }

  interface GatsbyCreatePagesOptions {
    actions: GatsbyActions;
    graphql: any;
    reporter: any;
  }

  interface GatsbyCreatePages<PluginOptions> {
    (options: GatsbyCreatePagesOptions, pluginOptions: PluginOptions): void;
  }

  interface GatsbyOnCreateNode<PluginOptions> {
    (options: GatsbyOnCreateNodeOptions, pluginOptions: PluginOptions): void;
  }
}

// gatsby-transformer-remark
declare module 'gatsby' {
  import * as gatsby from 'gatsby';

  interface GatsbyNode {
    fileAbsolutePath: string;
    frontmatter: any;
    fields: any;
  }
}
