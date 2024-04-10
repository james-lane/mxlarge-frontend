import styles from './articlePage.module.css';
import Image from 'next/image';
import { Oswald, Inter } from 'next/font/google';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/sharp-regular-svg-icons';
import { ArticleList } from '@/lib/articleList';
import { client } from '@/utils/sanity/client';
import { Post } from '@/lib/types';
import SanityImage from '@/lib/sanityImage/SanityImage';
import { PortableText } from '@portabletext/react';

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
      <div className={classNames(inter.className, styles.clientImg)}>
        <Image
          src="/example-ad.gif"
          alt="Example Ad"
          width={728}
          height={90}
          sizes="100vw"
        />
      </div>
      <div className={styles.content}>
        <PortableText value={post.body!} />
      </div>
      <div className={classNames(inter.className, styles.clientImg)}>
        <Image
          src="/example-ad.gif"
          alt="Example Ad"
          width={728}
          height={90}
          sizes="100vw"
        />
      </div>
      <ArticleList highlight={true} />
    </main>
  );
}
