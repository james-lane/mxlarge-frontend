import styles from './articlePage.module.css';
import { Oswald } from 'next/font/google';
import classNames from 'classnames';
import { sanityFetch, urlForImage } from '@/utils/sanity/client';
import { Post } from '@/lib/types';
import SanityImage from '@/lib/sanityImage/SanityImage';
import { PortableText } from '@portabletext/react';
import { ArticleCard } from '@/lib/articleCard';
import VideoPlayer from '@/lib/videoPlayer/videoPlayer';
import { Description } from '@/lib/descriptionContainer';
import { similarPostsQuery, singlePostQuery } from '@/utils/sanity/query';
import { AdvertComponent } from '@/lib/advert';
import { notFound } from 'next/navigation';
import { getImageDimensions } from '@sanity/asset-utils';
import classnames from 'classnames';
import { getPost } from '@/utils/posts/getPost';
import { getAdverts } from '@/utils/adverts/getAdverts';

const oswald = Oswald({ subsets: ['latin'] });

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost({ params });

  if (!post) notFound();

  return {
    openGraph: {
      title: `${post.title} | MX Large`,
      url: `https://www.mxlarge.com/news/${post.slug.current}`,
      siteName: 'MX Large',
      images: [
        {
          url: urlForImage(post.imageAsset).url(),
          width: 300,
          height: 300,
        },
      ],
      locale: 'en_GB',
      type: 'website',
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPost({ params });
  const adverts = await getAdverts();
  const similarStories: Post[] = await sanityFetch({
    query: similarPostsQuery,
    tags: ['post'],
    qParams: { slug: params.slug },
  });

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
          <div className={styles.clientImg_leaderboard}>
            <AdvertComponent size={'leaderboard'} adverts={adverts} />
          </div>
          <PortableText value={post.body!} components={serializers} />
          <div className={styles.clientImg_leaderboard}>
            <AdvertComponent size={'leaderboard'} adverts={adverts} />
          </div>
        </div>
        <div className={styles.clientImg_sidebar}>
          <AdvertComponent size={'sidebar'} adverts={adverts} />
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
        <div
          className={classnames(
            styles.clientImg_leaderboard,
            styles.similarArticles_ad
          )}
        >
          <AdvertComponent size={'leaderboard'} adverts={adverts} />
        </div>
      </div>
    </main>
  );
}
