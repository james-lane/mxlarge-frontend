import { sanityFetch } from '@/utils/sanity/client';
import styles from './backgroundWallpaper.module.css';
import { Advert } from '../types';
import { getImageDimensions } from '@sanity/asset-utils';
import { AdvertComponent } from '../advert';
import { adsQuery } from '@/utils/sanity/query';

export const BackgroundWallpaper = async () => {
  const allAds: Advert[] = await sanityFetch({
    query: adsQuery,
    tags: ['advert'],
  });

  const wallpaperAds: Advert[] = allAds.filter(
    (ad) => ad.advertCategory === 'wallpaper'
  );

  const randomWallpaperAd = (): Advert => {
    return wallpaperAds[Math.floor(Math.random() * wallpaperAds.length)];
  };

  const { title, url, imageAsset } = randomWallpaperAd();
  const { height, width } = getImageDimensions(imageAsset._ref);

  return (
    <div className={styles.wallpaperContainer}>
      <AdvertComponent
        size={'wallpaper'}
        style={{ maxWidth: 'initial', borderRadius: 0 }}
      />
    </div>
  );
};
