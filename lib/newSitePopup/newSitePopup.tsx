'use client';

import { useSearchParams } from 'next/navigation';
import styles from './newSitePopup.module.css';
import Link from 'next/link';

export const NewSitePopup = () => {
  const searchParams = useSearchParams();
  const oldSearchParam = searchParams.get('p');

  return (
    <>
      {oldSearchParam && (
        <div className={styles.popupContainer}>
          <div className={styles.popup}>
            <p className={styles.popupTitle}>Story not found!</p>
            <p className={styles.popupDescription}>
              Unfortunately, the link you clicked doesn't work anymore, but you
              might have some luck clicking the button below.
            </p>
            <div className={styles.links}>
              <Link
                className={styles.primary}
                href={`/${searchParams.get('p')}`}
              >
                Let's try it
              </Link>
              <Link className={styles.secondary} href={'/'}>
                Go home
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
