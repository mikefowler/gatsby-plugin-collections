import { DEFAULT_COLLECTIONS } from './constants';
import { GatsbyCollectionOptions } from './interfaces';

export default function getCollections({ collections }: GatsbyCollectionOptions) {
  if (!collections) {
    return DEFAULT_COLLECTIONS;
  }

  return collections;
}
