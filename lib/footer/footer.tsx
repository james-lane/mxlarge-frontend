import styles from './footer.module.css';
import Image from 'next/image';
import Link from 'next/link';
import LogoLight from '../../public/mxlarge-logo-light.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquareFacebook,
  faYoutubeSquare,
} from '@awesome.me/kit-5002308279/icons/classic/brands';
import { Inter } from 'next/font/google';
import classNames from 'classnames';
import { faSquareEnvelope } from '@awesome.me/kit-5002308279/icons/classic/solid';

const inter = Inter({ subsets: ['latin'] });

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link href="/">
        <picture>
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
        <a
          href="https://www.facebook.com/mxlargemotocross/?locale=en_GB"
          className={styles.socialLink}
          title="MX Large Facebook"
          target="_blank"
        >
          <FontAwesomeIcon icon={faSquareFacebook} className={styles.icon} />
        </a>
        <a
          href="https://www.youtube.com/channel/UCyd3w4QzLV-2DVX23Z_QT7Q"
          className={styles.socialLink}
          title="MX Large Youtube"
          target="_blank"
        >
          <FontAwesomeIcon icon={faYoutubeSquare} className={styles.icon} />
        </a>
        <a
          href="mailto:mxlarge@live.nl"
          className={styles.socialLink}
          title="MX Large Youtube"
          target="_blank"
        >
          <FontAwesomeIcon icon={faSquareEnvelope} className={styles.icon} />
        </a>
      </div>
      <div className={styles.footerLinks}>
        {/* <Link href="/" className={styles.footerLink}>
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
        </Link> */}
      </div>
      <small className={classNames(inter.className, styles.copyrightText)}>
        Copyright © MX Large {new Date().getFullYear()}
      </small>
    </footer>
  );
};
