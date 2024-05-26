'use client';
import styles from './header.module.css';
import Image from 'next/image';
import Link from 'next/link';
import LogoLight from '../../public/mxlarge-logo-light.svg';
// import LogoDark from '../../public/mxlarge-logo-dark.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/sharp-regular-svg-icons';
import { useEffect, useState } from 'react';

import { Oswald } from 'next/font/google';
import classNames from 'classnames';
import { usePathname, useRouter } from 'next/navigation';

const oswald = Oswald({ subsets: ['latin'] });

const navigation = [
  {
    name: 'Home',
    route: '/',
  },
  {
    name: 'Videos',
    route: '/videos',
  },
  {
    name: 'Interviews',
    route: '/interviews',
  },
  // {
  //   name: 'Galleries',
  //   route: '/galleries',
  // },
  // {
  //   name: 'Products',
  //   route: '/products',
  // },
  // {
  //   name: 'Calendar',
  //   route: '/calendar',
  // },
  {
    name: 'MXGP Live',
    route: 'https://results.mxgp.com/mxgp/livestandings.aspx',
  },
];

export const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => setNavOpen(false), [pathname]);

  return (
    <header className={styles.header}>
      <Link href="/" prefetch={false}>
        <picture className={styles.logo}>
          {/* <source srcSet={LogoLight.src} media="(prefers-color-scheme: dark)" /> */}
          <Image
            src={LogoLight.src}
            data-src={LogoLight.src}
            alt="MXLarge Logo"
            width={200}
            height={31}
            priority
          />
        </picture>
      </Link>
      <button
        className={styles.icon}
        title="Navigation"
        onClick={() => setNavOpen(true)}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      {navOpen && (
        <div className={styles.navContainer}>
          <div
            className={styles.navOverlay}
            onClick={() => setNavOpen(false)}
          ></div>
          <nav className={classNames(oswald.className, styles.nav)}>
            {navigation.map(({ name, route }, i) => (
              <Link key={i} href={route} onClick={() => router.push(route)}>
                {name}
              </Link>
            ))}
          </nav>
          <button
            className={classNames(styles.icon, navOpen && styles.icon_open)}
            onClick={() => setNavOpen(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      )}
    </header>
  );
};
