import styles from './page.module.css';
import { ArticleCard } from '@/lib/articleCard';
import { client } from '@/utils/sanity/client';
import Link from 'next/link';
import SanityImage from '@/lib/sanityImage/SanityImage';
import { Post, Advert } from '@/lib/types';

export default async function Home() {
  const posts = await client.fetch<Post[]>(
    `*[_type == "post"]{
      _id,
      title,
      slug,
      categories[]->{title},
      "imageAsset": mainImage.asset,
      "excerpt": array::join(string::split((pt::text(body)), "")[0..70], "") + "..."}`
  );

  const homepageAds = await client.fetch<Advert[]>(
    `*[_type == "advert" && advertCategory in ["sidebar", "medium-rectangle"]]{
        _id,
        title,
        url,
        "imageAsset": image.asset,
      }`
  );

  const billboardAds = await client.fetch<Advert[]>(
    `*[_type == "advert" && advertCategory in ["billboard"]]{
        _id,
        title,
        url,
        "imageAsset": image.asset,
      }`
  );

  const leaderboardAds = await client.fetch<Advert[]>(
    `*[_type == "advert" && advertCategory in ["leaderboard"]]{
        _id,
        title,
        url,
        "imageAsset": image.asset,
      }`
  );

  const randomHomepageAd = () => {
    return homepageAds[Math.floor(Math.random() * homepageAds.length)];
  };

  const randomBillboardAd = () => {
    return billboardAds[Math.floor(Math.random() * billboardAds.length)];
  };

  const randomLeaderboardAd = () => {
    return leaderboardAds[Math.floor(Math.random() * leaderboardAds.length)];
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
            quality={90}
            sizes="300px"
            priority
          />
        </Link>
      </div>
      <div className={styles.page}>
        <div className={styles.articles}>
          {posts.map((post: Post, index) => {
            if (index % 2 === 0) {
              return (
                <>
                  <div key={post._id} className={styles.articleContainer}>
                    <ArticleCard
                      link={`news/${post?.slug.current}`}
                      title={post?.title}
                      tags={post?.categories}
                      excerpt={post?.excerpt}
                      img={post?.imageAsset}
                      className={styles.article}
                    />
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
                </>
              );
            }

            return (
              <div key={post._id} className={styles.articleContainer}>
                <ArticleCard
                  link={`news/${post?.slug.current}`}
                  title={post?.title}
                  tags={post?.categories}
                  excerpt={post?.excerpt}
                  img={post?.imageAsset}
                  className={styles.article}
                />
              </div>
            );
          })}
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
    </main>
  );
}
