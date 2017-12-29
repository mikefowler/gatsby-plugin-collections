import ensureSlash from '../ensureSlash';

describe('ensureSlash', () => {
  it('adds leading slashes', () => {
    expect(ensureSlash('foo/bar/')).toEqual('/foo/bar/');
  });

  it('adds trailing slashes', () => {
    expect(ensureSlash('/foo/bar')).toEqual('/foo/bar/');
  });

  it('adds leading and trailing slashes', () => {
    expect(ensureSlash('foo/bar')).toEqual('/foo/bar/');
  });

  it('does nothing if the string already has leading and trailing slashes', () => {
    expect(ensureSlash('/foo/bar/')).toEqual('/foo/bar/');
  });
});
