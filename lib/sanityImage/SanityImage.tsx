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
  const base64ImageUrl = btoa(
    urlForImage(src)
      .width(100)
      .height(100)
      .quality(10)
      .blur(100)
      .auto('format')
      .url()
  );

  return (
    <div className={classnames(styles.imageContainer, props.className)}>
      <Image
        src="Fake src to avoid error"
        alt={alt}
        blurDataURL={base64ImageUrl}
        loader={({ quality = 75 }) =>
          urlForImage(src).quality(quality).auto('format').url()
        }
        {...props}
      />
    </div>
  );
}
