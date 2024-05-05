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

interface DescriptionProps {
  title: string | undefined;
  tags: Tag[] | null;
  className?: string;
}

export const Description = ({ title, tags, className }: DescriptionProps) => {
  return (
    <div className={classnames(styles.articleDescription, className)}>
      <p className={classnames(oswald.className, styles.title)}>{title}</p>
      <div className={classnames(inter.className, styles.meta)}>
        <p className={classnames()}>SEP 10</p>
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
