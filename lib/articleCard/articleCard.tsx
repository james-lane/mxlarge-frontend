import styles from './styles.module.css';
import Image from 'next/image';
import { Oswald, Inter } from 'next/font/google';
import classNames from 'classnames';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/sharp-regular-svg-icons';

const oswald = Oswald({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export const ArticleCard = () => {
  const tags = ['VIDEO', 'LIVE', 'STREAM'];
  return (
    <Link href={`/news/test`} className={styles.articleCard}>
      <Image
        src="/example-story-header-small.jpeg"
        data-src="/example-story-header-small.jpeg"
        alt="Lazy Load Image"
        className={styles.image}
        width={320}
        height={320}
        priority
      />
      <div className={styles.articleDescription}>
        <p className={classNames(oswald.className, styles.title)}>
          WSX Events Cancelled
        </p>
        <p className={classNames(inter.className, styles.subtitle)}>
          The free Livestream on the new ADAC Motorsport YouTube channel and are
          now available for Re-Live...
        </p>
        <div className={classNames(inter.className, styles.meta)}>
          <p className={classNames()}>SEP 10</p>
          <div className={classNames(styles.tags)}>
            <FontAwesomeIcon icon={faTag} className={styles.icon} />
            <ul>
              {tags.map((tag, index) => (
                <li key={index} className={classNames(styles.tag)}>
                  {index === tags.length - 1 ? tag : `${tag},\u00A0`}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Link>
  );
};
