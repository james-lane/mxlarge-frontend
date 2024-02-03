import styles from './page.module.css';
import { ArticleCard, Tag } from '@/lib/articleCard';
import { ArticleList } from '@/lib/articleList/articleList';
import { client } from '@/utils/sanity/client';
import Link from 'next/link';
import SanityImage from '@/lib/sanityImage/SanityImage';
import { SanityAsset } from '@sanity/image-url/lib/types/types';

type Post = {
  _id: string;
  title?: string;
  slug: {
    current: string;
  };
  categories?: Tag[];
  excerpt?: string;
  imageAsset: SanityAsset;
};

type Advert = {
  _id: string;
  title?: string;
  url: string;
  imageAsset: SanityAsset;
};

export default async function Home() {
  const posts = await client.fetch<Post[]>(
    `*[_type == "post"]{
      _id,
      title,
      slug,
      categories[]->{title},
      "imageAsset": mainImage.asset,
      "excerpt": array::join(string::split((pt::text(body)), "")[0..100], "") + "..."}`
  );

  const homepageAds = await client.fetch<Advert[]>(
    `*[_type == "advert" && advertCategory in ["sidebar", "medium-rectangle"]]{
        _id,
        title,
        url,
        "imageAsset": image.asset,
      }`
  );

  const randomHomepageAd = () => {
    return homepageAds[Math.floor(Math.random() * homepageAds.length)];
  };

  return (
    <main>
      <ul className={styles.articles}>
        {posts.map((post: Post, index) => {
          if (index === 0 || index % 2 === 0) {
            return (
              <>
                <li key={post._id}>
                  <ArticleCard
                    link={`news/${post?.slug.current}`}
                    title={post?.title}
                    tags={post?.categories}
                    excerpt={post?.excerpt}
                    img={post?.imageAsset}
                  />
                </li>
                <li className={styles.clientImg}>
                  <Link href={randomHomepageAd().url}>
                    <SanityImage
                      src={randomHomepageAd().imageAsset}
                      alt="Example Ad"
                      width={300}
                      height={600}
                    />
                  </Link>
                </li>
              </>
            );
          }

          return (
            <li key={post._id}>
              <ArticleCard
                link={`news/${post?.slug.current}`}
                title={post?.title}
                tags={post?.categories}
                excerpt={post?.excerpt}
                img={post?.imageAsset}
              />
            </li>
          );
        })}
      </ul>
      <ArticleList />
    </main>
  );
}
