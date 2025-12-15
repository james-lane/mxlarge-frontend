import styles from './articleCard.module.css';
import Link from 'next/link';
import { SanityAsset } from '@sanity/image-url/lib/types/types';
import SanityImage from '../sanityImage/SanityImage';
import classnames from 'classnames';
import {
  Description,
  DescriptionProps,
} from '../descriptionContainer/descriptionContainer';

interface ArticleCardProps extends DescriptionProps {
  link: string;
  img: SanityAsset;
  className?: string;
  size?: 'large' | 'small';
}

export const ArticleCard = ({
  link,
  title,
  publishedDate,
  tags,
  img,
  className,
  size,
}: ArticleCardProps) => {
  return (
    <Link href={link} prefetch={false} className={classnames(styles.articleCard, className)}>
      {size ? (
        <SanityImage
          src={img}
          alt={`${title} image`}
          className={styles.image}
          width={1352}
          height={760}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 676px"
        />
      ) : (
        <SanityImage
          src={img}
          alt={`${title} image`}
          className={styles.image}
          width={860}
          height={484}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 430px"
        />
      )}
      <Description
        title={title}
        tags={tags}
        publishedDate={publishedDate}
        className={styles.articleDescription}
      />
    </Link>
  );
};
