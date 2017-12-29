import getDateAndSlug, {
  DATE_FILENAME_MATCHER,
  DATELESS_FILENAME_MATCHER,
} from '../getDateAndSlug';

describe('getDateAndSlug', () => {
  describe('DATELESS_FILENAME_MATCHER', () => {
    it('matches paths without dates', () => {
      const result = '/foo/bar/my-post.md'.match(DATELESS_FILENAME_MATCHER);
      expect(result).not.toBeNull();
      expect(result[1]).toBe('my-post');
    });
  });

  describe('DATE_FILENAME_MATCHER', () => {
    it('does not match paths lacking the expected date format', () => {
      const result = '/foo/bar/my-post.md'.match(DATE_FILENAME_MATCHER);
      expect(result).toBeNull();
    });

    it('matches paths with dates', () => {
      const result = '/foo/bar/2017-12-25-my-post.md'.match(DATE_FILENAME_MATCHER);
      expect(result).not.toBeNull();
      expect(result[1]).toBe('2017-12-25');
      expect(result[2]).toBe('my-post');
    });
  });

  it('parses a slug from paths with letters (no date)', () => {
    const result = getDateAndSlug('/foo/bar/my-post.md');
    expect(result.slug).toEqual('my-post');
  });

  it('parses a slug from paths letters and numbers (no date)', () => {
    const result = getDateAndSlug('/foo/bar/2017-my-post.md');
    expect(result.slug).toEqual('2017-my-post');
  });

  it('does not parse dates from paths with an incorrect date format', () => {
    const result = getDateAndSlug('/foo/bar/10-12-2017-hello-world.html');
    expect(result.date).toBeUndefined();
  });

  it('parses a date from paths in format YYYY-MM-DD-slug', () => {
    const result = getDateAndSlug('/foo/bar/2017-10-12-my-post.md');
    expect(result.slug).toEqual('my-post');
    expect(result.date).toEqual('2017-10-12');
  });

  it('can override the slug', () => {
    const result = getDateAndSlug('/foo/bar/my-slug.md', { slug: 'another-slug' });
    expect(result.slug).toEqual('another-slug');
  });

  it('can override the date', () => {
    const result = getDateAndSlug('/foo/bar/2017-10-12-my-slug.md', {
      date: '2017-10-24',
    });
    expect(result.date).toEqual('2017-10-24');
  });
});
