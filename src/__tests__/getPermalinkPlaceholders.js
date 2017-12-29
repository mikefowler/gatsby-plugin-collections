import { DateTime } from 'luxon';

import getPermalinkPlaceholders from '../getPermalinkPlaceholders';

describe('getPermalinkPlaceholders', () => {
  it('returns an object', () => {
    expect(typeof getPermalinkPlaceholders()).toEqual('object');
  });

  it('returns the expected keys with string values', () => {
    const keys = getPermalinkPlaceholders({
      categories: ['one', 'two', 'three'],
      date: DateTime.local(),
      slug: 'foo',
    });

    expect(keys).toMatchObject({
      categories: expect.any(String),
      title: expect.any(String),
      slug: expect.any(String),
      year: expect.any(String),
      month: expect.any(String),
      day: expect.any(String),
      hour: expect.any(String),
      minute: expect.any(String),
      second: expect.any(String),
      i_day: expect.any(String),
      i_month: expect.any(String),
      short_month: expect.any(String),
      short_year: expect.any(String),
      y_day: expect.any(String),
    });
  });
});
