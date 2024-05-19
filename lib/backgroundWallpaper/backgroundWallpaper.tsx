import styles from './backgroundWallpaper.module.css';
import { AdvertComponent } from '../advert';

export const BackgroundWallpaper = async () => {
  return (
    <div className={styles.wallpaperContainer}>
      <AdvertComponent
        size={'wallpaper'}
        style={{ maxWidth: 'initial', borderRadius: 0 }}
      />
    </div>
  );
};
