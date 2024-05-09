import { client } from '@/utils/sanity/client';
import styles from './backgroundWallpaper.module.css';
import { Advert } from '../types';
import { SanityImageAsset, getImageDimensions } from '@sanity/asset-utils';
import { AdvertComponent } from '../advert';

export const BackgroundWallpaper = async () => {
  const wallpaperAds = await client.fetch<Advert[]>(
    `*[_type == "advert" && advertCategory in ["wallpaper"]]{
        _id,
        title,
        url,
        "imageAsset": image.asset,
      }`
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
