import styles from './articlePage.module.css';
import Image from 'next/image';
import { Oswald, Inter } from 'next/font/google';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/sharp-regular-svg-icons';
import { client } from '@/utils/sanity/client';
import { Advert, Post } from '@/lib/types';
import SanityImage from '@/lib/sanityImage/SanityImage';
import { PortableText } from '@portabletext/react';
import { SimilarArticles } from '@/lib/similarArticles/similarArticles';
import { ArticleList } from '@/lib/articleList';
import { ArticleCard } from '@/lib/articleCard';
import Link from 'next/link';

const oswald = Oswald({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await client.fetch<Post>(
    `*[_type == "post" && slug.current == "${params.slug}"] | order(_updatedAt desc) [0] {
      _id,
      title,
      slug,
      categories[]->{title},
      "imageAsset": mainImage.asset,
      body
    }`
  );

  const similarStories = await client.fetch<Post[]>(
    `*[_type == "post"]{
        _id,
        title,
        slug,
        categories[]->{title},
        "imageAsset": mainImage.asset,
        "excerpt": array::join(string::split((pt::text(body)), "")[0..70], "") + "..."}[0..1]`
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

  const tags = post.categories;

  return (
    <main className={styles.article}>
      <div className={styles.imageContainer}>
        <SanityImage
          src={post.imageAsset}
          alt="Lazy Load Image"
          className={styles.image}
          priority
          fill
        />
      </div>
      <div className={styles.articleDescription}>
        <p className={classNames(oswald.className, styles.title)}>
          {post.title}
        </p>
        <div className={classNames(inter.className, styles.meta)}>
          <p className={classNames()}>SEP 10</p>
          <div className={classNames(styles.tags)}>
            <FontAwesomeIcon icon={faTag} className={styles.icon} />
            {tags && tags.length > 0 && (
              <ul>
                {tags.map((tag, index) => (
                  <li key={index} className={classNames(styles.tag)}>
                    {index === tags.length - 1
                      ? tag.title
                      : `${tag.title},\u00A0`}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className={styles.articleBody}>
        <div className={styles.content}>
          <PortableText value={post.body!} />
          <div className={classNames(inter.className, styles.clientImg)}>
            <Image
              src="/example-ad.gif"
              alt="Example Ad"
              width={728}
              height={90}
              sizes="100vw"
            />
          </div>
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
              className={styles.clientImg_sidebar_asset}
            />
          </Link>
        </div>
      </div>
      <div className={styles.similarArticles}>
        <h2 className={styles.similarArticlesTitle}>More similar articles</h2>
        {similarStories &&
          similarStories.map((story: Post, index) => (
            <Link href={'#'} key={index}>
              <ArticleCard
                link={`news/${story?.slug.current}`}
                title={story?.title}
                tags={story?.categories}
                excerpt={story?.excerpt}
                img={story?.imageAsset}
              />
            </Link>
          ))}
      </div>
    </main>
  );
}
