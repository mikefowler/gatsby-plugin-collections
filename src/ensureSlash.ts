export default function ensureSlash(str: string) {
  if (typeof str !== 'string') {
    throw new Error('ensureSlash must receive a valid string');
  }

  let result = str;

  if (!result.startsWith('/')) {
    result = `/${result}`;
  }

  if (!result.endsWith('/')) {
    result = `${result}/`;
  }

  return result;
}
