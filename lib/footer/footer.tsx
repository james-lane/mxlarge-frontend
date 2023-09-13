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
    <footer className={styles.footer} role="header">
      <Link href="/">
        <picture>
          <source srcSet={LogoLight.src} media="(prefers-color-scheme: dark)" />
          <Image
            src={LogoDark.src}
            data-src={LogoDark.src}
            alt="Lazy Load Image"
            className="lazyload d-inline-block align-top logo"
            width={200}
            height={31}
            priority
          />
        </picture>
      </Link>
      <div className={styles.socialLinks}>
        <FontAwesomeIcon icon={faSquareFacebook} className={styles.icon} />
        <FontAwesomeIcon icon={faYoutubeSquare} className={styles.icon} />
      </div>
      <Link href="/">About</Link>
      <Link href="/">Advertise with us</Link>
      <Link href="/">Cookie policy</Link>
      <Link href="/">Contact us</Link>
      <small className={classNames(inter.className, styles.copyrightText)}>
        Copyright © MX Large {new Date().getFullYear()}
      </small>
    </footer>
  );
};
