import { Post } from '@/lib/types';

const chunkSize = 4;
export const chunkPosts = (posts: Post[]): Post[][] => {
  const remainingPosts = posts.splice(3);
  return Array.from(
    { length: Math.ceil(remainingPosts.length / chunkSize) },
    (v, i) => remainingPosts.slice(i * chunkSize, i * chunkSize + chunkSize)
  );
};
