import styles from './backgroundWallpaper.module.css';
import { AdvertComponent } from '../advert';
import { getAdverts } from '@/utils/adverts/getAdverts';

export const BackgroundWallpaper = async () => {
  const adverts = await getAdverts();
  return (
    <div className={styles.wallpaperContainer}>
      <AdvertComponent
        adverts={adverts}
        size={'wallpaper'}
        style={{ maxWidth: 'initial', borderRadius: 0 }}
      />
    </div>
  );
};
