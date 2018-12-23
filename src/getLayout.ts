import fs from 'fs';
import path from 'path';

import { LAYOUTS_PATH, ROOT_PATH } from './constants';

// Resolve paths to layouts using the following filename extensions, in this order.
const SUPPORTED_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];

// Determines whether a case-sensitive
// file exists at the given path
function existsSyncCaseSensitive(filepath: string) {
  const dir = path.dirname(filepath);
  const filenames = fs.readdirSync(dir);

  if (filenames.includes(path.basename(filepath))) {
    return true;
  }

  return false;
}

export default function getLayout(layoutName: string, { layoutPath = LAYOUTS_PATH }) {
  const layoutsPath = path.resolve(ROOT_PATH, layoutPath);

  const possibleLayoutFiles = SUPPORTED_EXTENSIONS.reduce(
    (memo, extension) => {
      const layoutNameExt = `${layoutName}${extension}`;

      // Support capitalized and lowercase variations of the given layout name. Using a lowercase
      // layout name in Markdown is familiar to folks coming from Jekyll-world, but naming React
      // component files with an uppercase at the start is standard.
      const layoutNameDowncase = layoutNameExt.charAt(0).toLowerCase() + layoutNameExt.slice(1);
      const layoutNameUpcase = layoutNameExt.charAt(0).toUpperCase() + layoutNameExt.slice(1);

      return [
        ...memo,
        path.resolve(layoutsPath, layoutNameDowncase),
        path.resolve(layoutsPath, layoutNameUpcase),
      ];
    },
    [] as string[],
  );

  // Now, given the array of possible paths, find the
  // first one that actually exists…
  const validLayoutFile = possibleLayoutFiles.find((possiblePath) =>
    existsSyncCaseSensitive(possiblePath),
  );

  if (!validLayoutFile) {
    throw new Error(
      `Couldn't find a valid layout file for layout “${layoutName}” in ` +
        `${layoutsPath}. We looked for files named:\n` +
        possibleLayoutFiles.map((p) => `\t- ${p}\n`),
    );
  }

  // …and return it
  return validLayoutFile;
}
