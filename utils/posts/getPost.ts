import { Post } from '@/lib/types';
import { sanityFetch } from '../sanity/client';
import { singlePostQuery } from '../sanity/query';

export const getPost = async ({
  params,
}: {
  params: { slug: string };
}): Promise<Post> => {
  return await sanityFetch({
    query: singlePostQuery,
    tags: ['post'],
    qParams: { slug: params.slug },
  });
};
