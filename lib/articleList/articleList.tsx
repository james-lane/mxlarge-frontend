import styles from './articleList.module.css';
import Image from 'next/image';
import { Oswald, Inter } from 'next/font/google';
import classNames from 'classnames';
import Link from 'next/link';

const oswald = Oswald({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

interface ArticleListProps {
  title?: string;
  highlight?: boolean;
}

export const ArticleList = ({ title, highlight }: ArticleListProps) => {
  const lists = ['1', '2', '3', '4', '5'];

  return (
    <div
      className={classNames(styles.articleList, highlight && styles.highlight)}
    >
      {title && (
        <h3 className={classNames(oswald.className, styles.articleListTitle)}>
          {title}
        </h3>
      )}
      <ul>
        {lists.map((_, index) => (
          <li key={index}>
            <Link href="/article" className={styles.article}>
              <Image
                src="/example-story-header-small.jpeg"
                data-src="/example-story-header-small.jpeg"
                alt="Lazy Load Image"
                className={styles.image}
                width={50}
                height={50}
                priority
              />
              <div className={styles.articleDescription}>
                <p
                  className={classNames(oswald.className, styles.articleTitle)}
                >
                  ADAC Masters - Live Stream
                </p>
                <p className={classNames(inter.className, styles.meta)}>
                  SEP 10
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
