import path from 'path';
import { GatsbyCollection } from './interfaces';

/* Are we in a non-production environment? */
export const DEV = process.env.NODE_ENV !== 'production';

/* The root path of the Gatsby project */
export const ROOT_PATH = process.cwd();

/**
 * The default path used for requiring template components. This
 * path can be overriden in the plugin options.
 */
export const LAYOUTS_PATH = path.resolve(ROOT_PATH, 'src/layouts');

/**
 * Define a handful of built-in permalinks. The full set of placeholder values
 * are found below, in the definition of the placeholders object.
 */
export const PERMALINK_PRESETS: { [presetName: string]: string } = {
  pretty: '/:collection/:year/:month/:year/:title',
  ordinal: '/:collection/:year/:y_day/:title',
  none: '/:collection/:title',
};

/** By default, paginated collections will render this number of items per page */
export const DEFAULT_PER_PAGE = 10;

/** The default template to use for generating permalinks */
export const DEFAULT_PERMALINK_TEMPLATE = PERMALINK_PRESETS.pretty;

export const DEFAULT_COLLECTIONS: GatsbyCollection[] = [
  {
    name: 'posts',
    path: 'src/posts',
  },
];
