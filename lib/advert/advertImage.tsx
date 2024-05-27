'use client';

import Image from 'next/image';
import { SendAdEvent } from '@/utils/google/sendEvent';
import { urlForImage } from '@/utils/sanity/client';
import { Advert, AdvertProps } from '../types';
import styles from './advert.module.css';

const dimensions = {
  leaderboard: {
    width: 768,
    height: 90,
  },
  billboard: {
    width: 970,
    height: 250,
  },
  sidebar: {
    width: 300,
    height: 600,
  },
  'medium-rectangle': {
    width: 300,
    height: 250,
  },
  wallpaper: {
    width: 1920,
    height: 1080,
  },
};

export const AdvertImage = ({
  chosenAd,
  size,
  style,
}: {
  chosenAd: Advert;
  size: AdvertProps['size'];
  style: React.CSSProperties | undefined;
}) => {
  const { imageAsset, title } = chosenAd;

  return (
    <Image
      className={styles.advert}
      src={urlForImage(imageAsset._ref)
        .width(dimensions[size].width)
        .quality(50)
        .fit('clip')
        .auto('format')
        .url()}
      alt={title}
      width={dimensions[size].width}
      height={dimensions[size].height}
      unoptimized
      style={style}
      onLoad={() => <SendAdEvent ad={chosenAd} />}
    />
  );
};
