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
}

export const ArticleCard = ({
  link,
  title,
  publishedDate,
  tags,
  img,
  className,
}: ArticleCardProps) => {
  return (
    <Link href={link} className={classnames(styles.articleCard, className)}>
      <SanityImage
        src={img}
        alt="Lazy Load Image"
        className={styles.image}
        priority
        fill
      />
      <Description
        title={title}
        tags={tags}
        publishedDate={publishedDate}
        className={styles.articleDescription}
      />
    </Link>
  );
};
