import { DateTime } from 'luxon';

import getPermalink from '../getPermalink';
import getPermalinkPlaceholders from '../getPermalinkPlaceholders';

const date = DateTime.fromISO('2017-05-05T11:12:13');

const placeholders = getPermalinkPlaceholders({
  collection: 'posts',
  categories: ['one', 'two', 'three'],
  slug: 'my-post-slug',
  date,
});

describe('getPermalink', () => {
  it('requires either permalink or template arguments', () => {
    // @ts-ignore
    expect(() => getPermalink()).toThrowError('getPermalink requires either permalink or template');
  });

  it('uses a predefined permalink, if defined', () => {
    const permalink = '/foo/bar/hello-world/';
    expect(getPermalink({ permalink })).toEqual(permalink);
  });

  it('ensures slashes on predefined permalinks', () => {
    expect(getPermalink({ permalink: 'foo/bar/foo' })).toEqual('/foo/bar/foo/');
  });

  it('accepts templates without placeholders', () => {
    const result = getPermalink({
      template: '/foo/bar/bat',
    });
    expect(result).toEqual('/foo/bar/bat/');
  });

  it('throws an error for missing placeholders', () => {
    const result = () =>
      getPermalink({
        template: '/:year/:foo',
        placeholders,
      });
    expect(result).toThrow();
  });

  it('replaces :year in the template', () => {
    const result = getPermalink({ template: '/:year', placeholders });
    expect(result).toEqual('/2017/');
  });

  it('replaces :month in the template', () => {
    const result = getPermalink({ template: '/:month', placeholders });
    expect(result).toEqual('/05/');
  });

  it('replaces :day in the template', () => {
    const result = getPermalink({ template: '/:day', placeholders });
    expect(result).toEqual('/05/');
  });

  it('replaces :hour in the template', () => {
    const result = getPermalink({ template: '/:hour', placeholders });
    expect(result).toEqual('/11/');
  });

  it('replaces :minute in the template', () => {
    const result = getPermalink({ template: '/:minute', placeholders });
    expect(result).toEqual('/12/');
  });

  it('replaces :second in the template', () => {
    const result = getPermalink({ template: '/:second', placeholders });
    expect(result).toEqual('/13/');
  });

  it('replaces :i_day in the template', () => {
    const result = getPermalink({ template: '/:i_day', placeholders });
    expect(result).toEqual('/5/');
  });

  it('replaces :i_month in the template', () => {
    const result = getPermalink({ template: '/:i_month', placeholders });
    expect(result).toEqual('/5/');
  });

  it('replaces :short_month in the template', () => {
    const result = getPermalink({ template: '/:short_month', placeholders });
    expect(result).toEqual('/May/');
  });

  it('replaces :short_year in the template', () => {
    const result = getPermalink({ template: '/:short_year', placeholders });
    expect(result).toEqual('/17/');
  });

  it('replaces :y_day in the template', () => {
    const result = getPermalink({ template: '/:y_day', placeholders });
    expect(result).toEqual('/125/');
  });
});
