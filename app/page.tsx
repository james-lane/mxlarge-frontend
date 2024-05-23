import styles from './page.module.css';
import { Post } from '@/lib/types';
import { AdvertComponent } from '@/lib/advert';
import { HeroContent } from '@/lib/content/heroContent';
import { PageContent } from '@/lib/content/pageContent';
import { chunkPosts } from '@/utils/posts/chunk';
import { getPosts } from '@/utils/posts/getPosts';

export default async function Home() {
  const posts: Post[] = await getPosts();

  return (
    <main>
      <div className={styles.clientImg_billboard}>
        <AdvertComponent size={'billboard'} />
      </div>
      <div className={styles.content}>
        <HeroContent content={posts.slice(0, 3)} />
        {chunkPosts(posts).map((chunk: Post[], i: number) => (
          <PageContent content={chunk} key={i} />
        ))}
      </div>
    </main>
  );
}
