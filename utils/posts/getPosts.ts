import { Post } from '@/lib/types';
import { sanityFetch } from '../sanity/client';
import { postQuery } from '../sanity/query';

export const getPosts = async (): Promise<Post[]> => {
  return await sanityFetch({
    query: postQuery,
    tags: ['post'],
  });
};
