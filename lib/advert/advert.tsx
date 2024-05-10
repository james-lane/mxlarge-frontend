import Link from 'next/link';
import { Advert } from '../types';
import Image from 'next/image';
import { urlForImage } from '@/utils/sanity/client';
import styles from './advert.module.css';

export interface AdvertProps {
  functionBasedProps: () => Advert;
  width: number;
  height: number;
  quality?: number;
  sizes?: string;
  priority?: boolean;
  style?: React.CSSProperties;
}

export const AdvertComponent = ({
  functionBasedProps,
  width,
  height,
  style,
}: AdvertProps) => {
  const { url, imageAsset, title } = functionBasedProps();
  return (
    <Link href={url} target="_blank">
      <Image
        className={styles.advert}
        src={urlForImage(imageAsset)
          .width(width)
          .quality(50)
          .fit('clip')
          .auto('format')
          .url()}
        alt={title}
        width={width}
        height={height}
        unoptimized
        style={style}
      />
    </Link>
  );
};
