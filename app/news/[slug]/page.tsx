import styles from './articlePage.module.css';
import Image from 'next/image';
import { Oswald } from 'next/font/google';
import classNames from 'classnames';
import { client } from '@/utils/sanity/client';
import { Advert, Post } from '@/lib/types';
import SanityImage from '@/lib/sanityImage/SanityImage';
import { PortableText } from '@portabletext/react';
import { ArticleCard } from '@/lib/articleCard';
import Link from 'next/link';
import VideoPlayer from '@/lib/videoPlayer/videoPlayer';
import { Description } from '@/lib/descriptionContainer';

const oswald = Oswald({ subsets: ['latin'] });

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
    `*[_type == "post"][0..1]{
        _id,
        title,
        slug,
        categories[]->{title},
        "imageAsset": mainImage.asset
    }`
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

  const serializers = {
    types: {
      youtube: ({ value }: any) => {
        const { url } = value;
        return <VideoPlayer url={url} />;
      },
      image: ({ value }: any) => {
        console.log(value);
        return (
          <div className={styles.contentImage}>
            <SanityImage
              src={value.asset}
              alt={'alt'}
              className={styles.image}
              fill
            />
          </div>
        );
      },
    },
  };

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
      <div className={styles.articleBody}>
        <div className={styles.content}>
          <Description
            title={post.title}
            tags={post.categories || null}
            className={styles.articleDescription}
          />
          <PortableText value={post.body!} components={serializers} />
          <div className={classNames(styles.clientImg)}>
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
        <h2
          className={classNames(oswald.className, styles.similarArticlesTitle)}
        >
          More similar articles
        </h2>
        {similarStories &&
          similarStories.map((story: Post, index) => (
            <ArticleCard
              key={index}
              link={`/news/${story?.slug.current}`}
              title={story?.title}
              tags={story?.categories || null}
              img={story?.imageAsset}
            />
          ))}
      </div>
    </main>
  );
}
