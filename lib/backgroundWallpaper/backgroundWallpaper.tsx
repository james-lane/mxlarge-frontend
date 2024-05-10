import { client, sanityFetch } from '@/utils/sanity/client';
import styles from './backgroundWallpaper.module.css';
import { Advert } from '../types';
import { SanityImageAsset, getImageDimensions } from '@sanity/asset-utils';
import { AdvertComponent } from '../advert';
import { adsQuery } from '@/utils/sanity/query';

export const BackgroundWallpaper = async () => {
  const allAds: Advert[] = await sanityFetch({
    query: adsQuery,
    // You can add multiple tags that matches with your document _id: ['post', 'about', ...]
    tags: ['advert'],
  });

  const wallpaperAds: Advert[] = allAds.filter(
    (ad) => ad.advertCategory === 'wallpaper'
  );

  const randomWallpaperAd = (): Advert => {
    return wallpaperAds[Math.floor(Math.random() * wallpaperAds.length)];
  };

  const { height, width } = getImageDimensions(
    randomWallpaperAd().imageAsset as SanityImageAsset
  );

  return (
    <div className={styles.wallpaperContainer}>
      <AdvertComponent
        functionBasedProps={randomWallpaperAd}
        width={width}
        height={height}
        style={{ maxWidth: 'initial', borderRadius: 0 }}
      />
    </div>
  );
};
