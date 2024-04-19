import { client } from '@/utils/sanity/client';
import styles from './backgroundWallpaper.module.css';
import { Advert } from '../types';
import Link from 'next/link';
import SanityImage from '../sanityImage/SanityImage';
import { SanityImageAsset, getImageDimensions } from '@sanity/asset-utils';

export const BackgroundWallpaper = async () => {
  const wallpaperAds = await client.fetch<Advert[]>(
    `*[_type == "advert" && advertCategory in ["wallpaper"]]{
        _id,
        title,
        url,
        "imageAsset": image.asset,
      }`
  );

  const randomWallpaperAd = () => {
    return wallpaperAds[Math.floor(Math.random() * wallpaperAds.length)];
  };

  const { height, width } = getImageDimensions(
    randomWallpaperAd().imageAsset as SanityImageAsset
  );

  return (
    <div className={styles.wallpaperContainer}>
      <Link href={randomWallpaperAd().url}>
        <SanityImage
          src={randomWallpaperAd().imageAsset}
          alt={randomWallpaperAd().title}
          width={width}
          height={height}
          quality={100}
          priority
        />
      </Link>
    </div>
  );
};
