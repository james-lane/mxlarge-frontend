import styles from './styles.module.css';
import Image from 'next/image';
import { Oswald, Inter } from 'next/font/google';
import classNames from 'classnames';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/sharp-regular-svg-icons';
import { SanityAsset } from '@sanity/image-url/lib/types/types';
import SanityImage from '../sanityImage/SanityImage';

const oswald = Oswald({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export interface Tag {
  title: string;
}

interface ArticleCardProps {
  link: string;
  title: string | undefined;
  tags: Tag[] | undefined;
  excerpt: string | undefined;
  img: SanityAsset;
}

export const ArticleCard = ({
  link,
  title,
  tags,
  excerpt,
  img,
}: ArticleCardProps) => {
  return (
    <Link href={link} className={styles.articleCard}>
      <SanityImage
        src={img}
        alt="Lazy Load Image"
        className={styles.image}
        width={414}
        height={300}
        priority
      />
      <div className={styles.articleDescription}>
        <p className={classNames(oswald.className, styles.title)}>{title}</p>
        <p className={classNames(inter.className, styles.subtitle)}>
          {excerpt}
        </p>
        <div className={classNames(inter.className, styles.meta)}>
          <p className={classNames()}>SEP 10</p>
          {tags && (
            <div className={classNames(styles.tags)}>
              <FontAwesomeIcon icon={faTag} className={styles.icon} />

              <ul>
                {tags.map((tag, index) => (
                  <li key={index} className={classNames(styles.tag)}>
                    {index === tags.length - 1
                      ? tag.title
                      : `${tag.title},\u00A0`}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
