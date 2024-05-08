import styles from './page.module.css';
import { ArticleCard } from '@/lib/articleCard';
import { sanityFetch } from '@/utils/sanity/client';
import { Post, Advert } from '@/lib/types';
import {
  billboardAdsQuery,
  categoryQuery,
  homepageAdsQuery,
  leaderboardAdsQuery,
} from '@/utils/sanity/query';
import { AdvertComponent } from '@/lib/advert';

export default async function Category({
  params,
}: {
  params: { category: string };
}) {
  const posts: Post[] = await sanityFetch({
    query: categoryQuery,
    // You can add multiple tags that matches with your document _id: ['post', 'about', ...]
    tags: ['post'],
    qParams: { category: params.category },
  });

  const homepageAds: Advert[] = await sanityFetch({
    query: homepageAdsQuery,
    // You can add multiple tags that matches with your document _id: ['post', 'about', ...]
    tags: ['advert'],
  });

  const billboardAds: Advert[] = await sanityFetch({
    query: billboardAdsQuery,
    // You can add multiple tags that matches with your document _id: ['post', 'about', ...]
    tags: ['advert'],
  });

  const leaderboardAds: Advert[] = await sanityFetch({
    query: leaderboardAdsQuery,
    // You can add multiple tags that matches with your document _id: ['post', 'about', ...]
    tags: ['advert'],
  });

  const randomHomepageAd = (): Advert => {
    return homepageAds[Math.floor(Math.random() * homepageAds.length)];
  };

  const randomBillboardAd = (): Advert => {
    return billboardAds[Math.floor(Math.random() * billboardAds.length)];
  };

  const randomLeaderboardAd = (): Advert => {
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
        <AdvertComponent
          functionBasedProps={randomBillboardAd}
          width={970}
          height={250}
          quality={90}
        />
      </div>
      <div className={styles.page}>
        {chunkPosts(posts).map((posts: Post[], index: number) => {
          if (index === 0) {
            return (
              <div className={styles.articleGroup} key={index}>
                <div className={styles.articleContainer}>
                  {posts.map((post: Post, index: number) => {
                    if (index % 2 === 0) {
                      return (
                        <>
                          <ArticleCard
                            key={post._id}
                            link={`news/${post?.slug.current}`}
                            title={post?.title}
                            publishedDate={post?.publishedAt || null}
                            tags={post?.categories || null}
                            img={post?.imageAsset}
                            className={styles.article}
                          />
                          <div className={styles.clientImg_leaderboard}>
                            <AdvertComponent
                              functionBasedProps={randomLeaderboardAd}
                              width={728}
                              height={90}
                              quality={90}
                            />
                          </div>
                        </>
                      );
                    }
                    return (
                      <ArticleCard
                        key={post._id}
                        link={`news/${post?.slug.current}`}
                        title={post?.title}
                        publishedDate={post?.publishedAt || null}
                        tags={post?.categories || null}
                        img={post?.imageAsset}
                        className={styles.article}
                      />
                    );
                  })}
                </div>
                <div className={styles.clientImg_sidebar}>
                  <AdvertComponent
                    functionBasedProps={randomHomepageAd}
                    width={300}
                    height={600}
                    quality={90}
                    sizes="300px"
                  />
                </div>
              </div>
            );
          }

          return (
            <div className={styles.articleGroup} key={index}>
              <div className={styles.articleContainer}>
                {posts.map((post: Post, index: number) => {
                  if (index === 1 || index === 3) {
                    return (
                      <>
                        <ArticleCard
                          key={post._id}
                          link={`news/${post?.slug.current}`}
                          title={post?.title}
                          publishedDate={post?.publishedAt || null}
                          tags={post?.categories || null}
                          img={post?.imageAsset}
                          className={styles.article}
                        />
                        <div className={styles.clientImg_leaderboard}>
                          <AdvertComponent
                            functionBasedProps={randomLeaderboardAd}
                            width={728}
                            height={90}
                            quality={90}
                          />
                        </div>
                      </>
                    );
                  }

                  return (
                    <ArticleCard
                      key={post._id}
                      link={`news/${post?.slug.current}`}
                      title={post?.title}
                      publishedDate={post?.publishedAt || null}
                      tags={post?.categories || null}
                      img={post?.imageAsset}
                      className={styles.article}
                    />
                  );
                })}
              </div>
              <div className={styles.clientImg_sidebar}>
                <AdvertComponent
                  functionBasedProps={randomHomepageAd}
                  width={300}
                  height={600}
                  quality={90}
                  sizes="300px"
                />
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
