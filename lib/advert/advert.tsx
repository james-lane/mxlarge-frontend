import Link from 'next/link';
import { Advert, AdvertProps } from '../types';
import Image from 'next/image';
import { sanityFetch, urlForImage } from '@/utils/sanity/client';
import styles from './advert.module.css';
import { adsQuery } from '@/utils/sanity/query';

export const runtime = 'edge';

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

export const AdvertComponent = async ({
  size,
  style,
  className,
}: AdvertProps) => {
  const allAds: Advert[] = await sanityFetch({
    query: adsQuery,
    tags: ['advert'],
  });

  const randomAd = (size: AdvertProps['size']): Advert => {
    const filteredAds: Advert[] = allAds.filter(
      (ad) => ad.advertCategory === size
    );

    return filteredAds[Math.floor(Math.random() * filteredAds.length)];
  };

  const { url, imageAsset, title } = randomAd(size);

  return (
    <Link href={url} target="_blank" className={className}>
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
      />
    </Link>
  );
};
