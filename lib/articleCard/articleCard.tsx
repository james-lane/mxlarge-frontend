import styles from './articleCard.module.css';
import Link from 'next/link';
import { SanityAsset } from '@sanity/image-url/lib/types/types';
import SanityImage from '../sanityImage/SanityImage';
import classnames from 'classnames';
import {
  Description,
  DescriptionProps,
  Tag,
} from '../descriptionContainer/descriptionContainer';

interface ArticleCardProps extends DescriptionProps {
  link: string;
  img: SanityAsset;
  className?: string;
  size?: 'large';
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
    <Link href={link} className={classnames(styles.articleCard, className)}>
      {size ? (
        <SanityImage
          src={img}
          alt={`${title} image`}
          className={styles.image}
          width={676}
          height={380}
        />
      ) : (
        <SanityImage
          src={img}
          alt={`${title} image`}
          className={styles.image}
          width={430}
          height={242}
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
