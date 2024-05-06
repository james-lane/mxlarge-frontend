import styles from './footer.module.css';
import Image from 'next/image';
import Link from 'next/link';
import LogoLight from '../../public/mxlarge-logo-light.svg';
import LogoDark from '../../public/mxlarge-logo-dark.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquareFacebook,
  faYoutubeSquare,
} from '@fortawesome/free-brands-svg-icons';
import { Inter } from 'next/font/google';
import classNames from 'classnames';

const inter = Inter({ subsets: ['latin'] });

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link href="/">
        <picture>
          {/* <source srcSet={LogoLight.src} media="(prefers-color-scheme: dark)" /> */}
          <Image
            src={LogoLight.src}
            data-src={LogoLight.src}
            alt="MXLarge Logo"
            className="lazyload d-inline-block align-top logo"
            width={200}
            height={31}
            priority
          />
        </picture>
      </Link>
      <div className={styles.socialLinks}>
        <Link href="/" className={styles.socialLink} title="MX Large Facebook">
          <FontAwesomeIcon icon={faSquareFacebook} className={styles.icon} />
        </Link>
        <Link href="/" className={styles.socialLink} title="MX Large Youtube">
          <FontAwesomeIcon icon={faYoutubeSquare} className={styles.icon} />
        </Link>
      </div>
      <div className={styles.footerLinks}>
        <Link href="/" className={styles.footerLink}>
          About
        </Link>
        <Link href="/" className={styles.footerLink}>
          Advertise with us
        </Link>
        <Link href="/" className={styles.footerLink}>
          Cookie policy
        </Link>
        <Link href="/" className={styles.footerLink}>
          Contact us
        </Link>
      </div>
      <small className={classNames(inter.className, styles.copyrightText)}>
        Copyright © MX Large {new Date().getFullYear()}
      </small>
    </footer>
  );
};
