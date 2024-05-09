'use client';

import { urlForImage } from '@/utils/sanity/client';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import Image, { ImageProps } from 'next/image';
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
    <div className={classnames(props.className)}>
      <Image
        src="Fake src to avoid error"
        alt={alt}
        blurDataURL={base64ImageUrl}
        loader={({ width, quality = 50 }) =>
          urlForImage(src).width(width).quality(quality).auto('format').url()
        }
        {...props}
      />
    </div>
  );
}
