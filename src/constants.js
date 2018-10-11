import path from 'path';

// Are we in a non-production environment?
export const DEV = process.env.NODE_ENV !== 'production';

// The root path of the Gatsby project
export const ROOT_PATH = process.cwd();

// The default path used for requiring template components. This
// path can be overriden in the plugin options.
export const TEMPLATES_PATH = path.resolve(ROOT_PATH, 'src/templates');

// Define a handful of built-in permalinks. The full set of placeholder values
// are found below, in the definition of the placeholders object.
export const PERMALINK_PRESETS = new Map(
  Object.entries({
    pretty: '/:categories/:year/:month/:year/:title',
    ordinal: '/:categories/:year/:y_day/:title',
    none: '/:categories/:title',
  }),
);

// @TODO
export const DEFAULT_COLLECTIONS = [
  {
    name: 'pages',
    folder: 'src/pages',
  },
  {
    name: 'posts',
    folder: 'src/posts',
    permalink: 'pretty',
  },
];
