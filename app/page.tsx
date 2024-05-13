import styles from './page.module.css';
import { ArticleCard } from '@/lib/articleCard';
import { sanityFetch } from '@/utils/sanity/client';
import { Post, Advert } from '@/lib/types';
import { adsQuery, postQuery } from '@/utils/sanity/query';
import { AdvertComponent } from '@/lib/advert';
import classnames from 'classnames';

export default async function Home() {
  const posts: Post[] = await sanityFetch({
    query: postQuery,
    // You can add multiple tags that matches with your document _id: ['post', 'about', ...]
    tags: ['post'],
  });

  const allAds: Advert[] = await sanityFetch({
    query: adsQuery,
    // You can add multiple tags that matches with your document _id: ['post', 'about', ...]
    tags: ['advert'],
  });

  const homepageAds: Advert[] = allAds.filter(
    (ad) =>
      ad.advertCategory === 'sidebar' ||
      ad.advertCategory === 'medium-rectangle'
  );

  const billboardAds: Advert[] = allAds.filter(
    (ad) => ad.advertCategory === 'billboard'
  );

  const leaderboardAds: Advert[] = allAds.filter(
    (ad) => ad.advertCategory === 'leaderboard'
  );

  let chosenAd: Advert;

  const getRandomExceptCurrentAd = (adArray: Advert[]) => {
    const randomAd = adArray[Math.floor(Math.random() * adArray.length)];

    chosenAd =
      randomAd === chosenAd ? getRandomExceptCurrentAd(adArray) : randomAd;

    return chosenAd;
  };

  const randomHomepageAd = (): Advert => {
    return getRandomExceptCurrentAd(homepageAds);
  };

  const randomBillboardAd = (): Advert => {
    return getRandomExceptCurrentAd(billboardAds);
  };

  const randomLeaderboardAd = (): Advert => {
    return getRandomExceptCurrentAd(leaderboardAds);
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
                            className={classnames(
                              styles.article,
                              index === 0 && styles.heroArticle
                            )}
                            size="large"
                          />
                          <div className={styles.clientImg_leaderboard}>
                            <AdvertComponent
                              functionBasedProps={randomLeaderboardAd}
                              width={728}
                              height={90}
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
                />
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
