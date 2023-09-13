import styles from './styles.module.css';
import Image from 'next/image';
import { Oswald, Inter } from 'next/font/google';
import classNames from 'classnames';

const oswald = Oswald({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

interface ArticleListProps {
  title: string;
  highlight: boolean;
}

export const ArticleList = ({ title, highlight }: ArticleListProps) => {
  const lists = ['1', '2', '3', '4', '5'];
  console.log(highlight);
  return (
    <div
      className={classNames(styles.articleList, highlight && styles.highlight)}
    >
      {title && (
        <h3 className={classNames(oswald.className, styles.title)}>{title}</h3>
      )}
      <ul>
        {lists.map((_, index) => (
          <li key={index} className={styles.article}>
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
              <p className={classNames(oswald.className, styles.title)}>
                ADAC Masters - Live Stream
              </p>
              <p className={classNames(inter.className, styles.meta)}>SEP 10</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
