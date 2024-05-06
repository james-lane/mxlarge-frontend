import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/sharp-regular-svg-icons';
import { Oswald, Inter } from 'next/font/google';
import styles from './descriptionContainer.module.css';

const oswald = Oswald({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export interface Tag {
  title: string;
}

export interface DescriptionProps {
  title: string | undefined;
  tags: Tag[] | null;
  publishedDate: string | null;
  className?: string;
}

export const Description = ({
  title,
  tags,
  publishedDate,
  className,
}: DescriptionProps) => {
  const metaDate = new Date(publishedDate || '').toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className={classnames(styles.articleDescription, className)}>
      <p className={classnames(oswald.className, styles.title)}>{title}</p>
      <div className={classnames(inter.className, styles.meta)}>
        {publishedDate && (
          <p className={classnames(styles.meta_date)}>{metaDate}</p>
        )}
        {tags && (
          <div className={classnames(styles.tags)}>
            <FontAwesomeIcon icon={faTag} className={styles.icon} />
            <ul>
              {tags.map((tag, index) => (
                <li key={index} className={classnames(styles.tag)}>
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
  );
};
