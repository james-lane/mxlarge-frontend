import { Advert } from '@/lib/types';
import { sanityFetch } from '../sanity/client';
import { adsQuery } from '../sanity/query';

export const getAdverts = async (): Promise<Advert[]> => {
  return await sanityFetch({
    query: adsQuery,
    tags: ['post'],
  });
};
