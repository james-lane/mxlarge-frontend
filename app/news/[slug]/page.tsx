import styles from './articlePage.module.css';
import { Oswald } from 'next/font/google';
import classNames from 'classnames';
import { sanityFetch } from '@/utils/sanity/client';
import { Advert, Post } from '@/lib/types';
import SanityImage from '@/lib/sanityImage/SanityImage';
import { PortableText } from '@portabletext/react';
import { ArticleCard } from '@/lib/articleCard';
import VideoPlayer from '@/lib/videoPlayer/videoPlayer';
import { Description } from '@/lib/descriptionContainer';
import {
  adsQuery,
  similarPostsQuery,
  singlePostQuery,
} from '@/utils/sanity/query';
import { AdvertComponent } from '@/lib/advert';
import { notFound } from 'next/navigation';
import { getImageDimensions } from '@sanity/asset-utils';

const oswald = Oswald({ subsets: ['latin'] });

export default async function Page({ params }: { params: { slug: string } }) {
  const post: Post = await sanityFetch({
    query: singlePostQuery,
    // You can add multiple tags that matches with your document _id: ['post', 'about', ...]
    tags: ['post'],
    qParams: { slug: params.slug },
  });

  const similarStories: Post[] = await sanityFetch({
    query: similarPostsQuery,
    // You can add multiple tags that matches with your document _id: ['post', 'about', ...]
    tags: ['post'],
    qParams: { slug: params.slug },
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

  const randomHomepageAd = (): Advert => {
    return homepageAds[Math.floor(Math.random() * homepageAds.length)];
  };

  const serializers = {
    types: {
      youtube: ({ value }: any) => {
        const { url } = value;
        return <VideoPlayer url={url} />;
      },
      image: ({ value }: any) => {
        const { height } = getImageDimensions(value.asset);

        return (
          <SanityImage
            src={value.asset}
            alt={value.title}
            width={596}
            height={height}
            style={{
              width: '100%',
              height: 'auto',
            }}
            sizes={'(min-width: 768px) 392px, (min-width: 1024px) 596px, 100vw'}
            className={styles.contentImage}
          />
        );
      },
    },
  };

  if (!post) notFound();

  return (
    <main className={styles.article}>
      <div className={styles.imageContainer}>
        <SanityImage
          src={post.imageAsset}
          width={1024}
          height={480}
          alt={post.title || 'Story hero image'}
          className={styles.image}
          priority
        />
      </div>
      <div className={styles.articleBody}>
        <div className={styles.content}>
          <Description
            title={post.title}
            publishedDate={post.publishedAt || null}
            tags={post.categories || null}
            className={styles.articleDescription}
          />
          <PortableText value={post.body!} components={serializers} />
        </div>
        <div className={styles.clientImg_sidebar}>
          <AdvertComponent
            functionBasedProps={randomHomepageAd}
            width={300}
            height={600}
          />
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
              publishedDate={story?.publishedAt || null}
              tags={story?.categories || null}
              img={story?.imageAsset}
              className={styles.similarArticle}
            />
          ))}
      </div>
    </main>
  );
}
