import styles from './page.module.css';
import { sanityFetch } from '@/utils/sanity/client';
import { Post } from '@/lib/types';
import { categoryQuery } from '@/utils/sanity/query';
import { AdvertComponent } from '@/lib/advert';
import { PageContent } from '@/lib/content/pageContent';

export default async function Category({
  params,
}: {
  params: { category: string };
}) {
  const posts: Post[] = await sanityFetch({
    query: categoryQuery,
    tags: ['post'],
    qParams: { category: params.category },
  });

  const chunkSize = 4;
  const chunkPosts = (): Post[][] => {
    return Array.from({ length: Math.ceil(posts.length / chunkSize) }, (_, i) =>
      posts.slice(i * chunkSize, i * chunkSize + chunkSize)
    );
  };

  return (
    <main>
      <div className={styles.clientImg_billboard}>
        <AdvertComponent size={'billboard'} />
      </div>
      <div className={styles.content}>
        {chunkPosts().map((chunk: Post[], i: number) => (
          <PageContent content={chunk} key={i} />
        ))}
      </div>
    </main>
  );
}
