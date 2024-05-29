import styles from './page.module.css';
import { Advert, Post } from '@/lib/types';
import { AdvertComponent } from '@/lib/advert';
import { HeroContent } from '@/lib/content/heroContent';
import { PageContent } from '@/lib/content/pageContent';
import { chunkPosts } from '@/utils/posts/chunk';
import { getPosts } from '@/utils/posts/getPosts';
import { getAdverts } from '@/utils/adverts/getAdverts';

export default async function Home() {
  const posts: Post[] = await getPosts();
  const adverts: Advert[] = await getAdverts();

  return (
    <main>
      <div className={styles.clientImg_billboard}>
        <AdvertComponent size={'billboard'} adverts={adverts} />
      </div>
      <div className={styles.content}>
        <HeroContent content={posts.slice(0, 3)} adverts={adverts} />
        {chunkPosts(posts).map((chunk: Post[], i: number) => (
          <PageContent content={chunk} key={i} adverts={adverts} />
        ))}
      </div>
    </main>
  );
}
