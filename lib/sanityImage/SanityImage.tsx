'use client';

import { urlForImage } from '@/utils/sanity/client';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import Image, { ImageProps } from 'next/image';

type Props = Omit<ImageProps, 'src'> & {
  src: SanityImageSource;
  advert?: boolean;
};

export default function SanityImage({ src, alt, ...props }: Props) {
  return (
    <Image
      src="Fake src to avoid error"
      alt={alt}
      loader={({ width, quality = 75 }) =>
        urlForImage(src).width(width).quality(quality).url()
      }
      {...props}
    />
  );
}
