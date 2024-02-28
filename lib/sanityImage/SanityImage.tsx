'use client';

import { urlForImage } from '@/utils/sanity/client';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import Image, { ImageProps } from 'next/image';
import styles from './sanityImage.module.css';
import classnames from 'classnames';

type Props = Omit<ImageProps, 'src'> & {
  src: SanityImageSource;
  advert?: boolean;
};

export default function SanityImage({ src, alt, ...props }: Props) {
  return (
    <div className={classnames(styles.imageContainer, props.className)}>
      <Image
        src="Fake src to avoid error"
        alt={alt}
        loader={({ width, quality = 75 }) =>
          urlForImage(src).width(width).quality(quality).url()
        }
        {...props}
      />
    </div>
  );
}
