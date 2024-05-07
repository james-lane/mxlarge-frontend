import styles from './page.module.css';
import { ArticleCard } from '@/lib/articleCard';
import { client, sanityFetch } from '@/utils/sanity/client';
import Link from 'next/link';
import SanityImage from '@/lib/sanityImage/SanityImage';
import { Post, Advert } from '@/lib/types';
import {
  billboardAdsQuery,
  homepageAdsQuery,
  leaderboardAdsQuery,
  postQuery,
} from '@/utils/sanity/query';

export default async function Home() {
  const posts: Post[] = await sanityFetch({
    query: postQuery,
    // You can add multiple tags that matches with your document _id: ['post', 'about', ...]
    tags: ['post'],
  });

  const homepageAds: Advert[] = await sanityFetch({
    query: homepageAdsQuery,
    // You can add multiple tags that matches with your document _id: ['post', 'about', ...]
    tags: [],
  });

  const billboardAds: Advert[] = await sanityFetch({
    query: billboardAdsQuery,
    // You can add multiple tags that matches with your document _id: ['post', 'about', ...]
    tags: [],
  });

  const leaderboardAds: Advert[] = await sanityFetch({
    query: leaderboardAdsQuery,
    // You can add multiple tags that matches with your document _id: ['post', 'about', ...]
    tags: [],
  });

  const randomHomepageAd = () => {
    return homepageAds[Math.floor(Math.random() * homepageAds.length)];
  };

  const randomBillboardAd = () => {
    return billboardAds[Math.floor(Math.random() * billboardAds.length)];
  };

  const randomLeaderboardAd = () => {
    return leaderboardAds[Math.floor(Math.random() * leaderboardAds.length)];
  };

  const chunkSize = 4;
  const chunkPosts = (posts: Post[]) => {
    const initialPosts = posts.splice(0, 3);
    return [
      initialPosts,
      ...Array.from({ length: Math.ceil(posts.length / chunkSize) }, (v, i) =>
        posts.slice(i * chunkSize, i * chunkSize + chunkSize)
      ),
    ];
  };

  return (
    <main>
      <div className={styles.clientImg_billboard}>
        <Link href={randomBillboardAd().url}>
          <SanityImage
            src={randomBillboardAd().imageAsset}
            alt={randomBillboardAd().title}
            width={970}
            height={250}
            quality={100}
            priority
          />
        </Link>
      </div>
      <div className={styles.page}>
        <div className={styles.articles}>
          {chunkPosts(posts).map((posts: Post[], index: number) => {
            return (
              <div className={styles.articleGroup} key={index}>
                <div className={styles.articleContainer}>
                  {posts.map((post: Post) => (
                    <ArticleCard
                      key={post._id}
                      link={`news/${post?.slug.current}`}
                      title={post?.title}
                      publishedDate={post?.publishedAt || null}
                      tags={post?.categories || null}
                      img={post?.imageAsset}
                      className={styles.article}
                    />
                  ))}
                </div>
                <div className={styles.clientImg_leaderboard}>
                  <Link href={randomLeaderboardAd().url}>
                    <SanityImage
                      src={randomLeaderboardAd().imageAsset}
                      alt={randomLeaderboardAd().title}
                      width={728}
                      height={90}
                      quality={90}
                    />
                  </Link>
                </div>
                <div className={styles.clientImg_sidebar}>
                  <Link href={randomHomepageAd().url}>
                    <SanityImage
                      src={randomHomepageAd().imageAsset}
                      alt={randomHomepageAd().title}
                      width={300}
                      height={600}
                      quality={90}
                      sizes="300px"
                    />
                  </Link>
                </div>
              </div>
            );
          })}
          ;
        </div>
      </div>
    </main>
  );
}
