import styles from './page.module.css';
import { sanityFetch } from '@/utils/sanity/client';
import { Post } from '@/lib/types';
import { postQuery } from '@/utils/sanity/query';
import { AdvertComponent } from '@/lib/advert';
import { HeroContent } from '@/lib/content/heroContent';
import { PageContent } from '@/lib/content/pageContent';

export default async function Home() {
  const posts: Post[] = await sanityFetch({
    query: postQuery,
    tags: ['post'],
  });

  const chunkSize = 4;
  const chunkPosts = (): Post[][] => {
    const remainingPosts = posts.splice(3);
    return Array.from(
      { length: Math.ceil(remainingPosts.length / chunkSize) },
      (v, i) => remainingPosts.slice(i * chunkSize, i * chunkSize + chunkSize)
    );
  };

  return (
    <main>
      <div className={styles.clientImg_billboard}>
        <AdvertComponent size={'billboard'} />
      </div>
      <div className={styles.content}>
        <HeroContent content={posts.slice(0, 3)} />
        {chunkPosts().map((chunk: Post[], i: number) => (
          <PageContent content={chunk} key={i} />
        ))}
      </div>
    </main>
  );
}
