import styles from './styles.module.css';
import Image from 'next/image';
import Link from 'next/link';
import LogoLight from '../../public/mxlarge-logo-light.svg';
import LogoDark from '../../public/mxlarge-logo-dark.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/sharp-regular-svg-icons';

export const Header = () => {
  return (
    <header className={styles.header} role="header">
      <FontAwesomeIcon icon={faBars} className={styles.icon} />
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
    </header>
  );
};
