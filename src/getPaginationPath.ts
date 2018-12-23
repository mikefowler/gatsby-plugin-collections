import ensureSlash from './ensureSlash';

export default function getPaginationPath(basePath: string, pageNumber?: number) {
  if (!pageNumber) {
    return undefined;
  }

  const suffix = pageNumber > 1 ? `/${pageNumber}` : '';

  return ensureSlash(`${basePath}${suffix}`);
}
