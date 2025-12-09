'use client';

import { urlForImage } from '@/utils/sanity/client';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import Image, { ImageProps } from 'next/image';
import classnames from 'classnames';

type Props = Omit<ImageProps, 'src'> & {
  src: SanityImageSource;
  width: number;
  quality?: number;
  advert?: boolean;
};

export default function SanityImage({ src, alt, ...props }: Props) {
  const { width, height, quality = 75 } = props;

  const base64ImageUrl = btoa(
    urlForImage(src)
      .width(100)
      .height(100)
      .quality(10)
      .blur(100)
      .auto('format')
      .url()
  );

  // Use Sanity's CDN for image optimization to avoid Vercel image optimization costs
  const optimizedImageUrl = urlForImage(src)
    .width(width)
    .height(height || width)
    .quality(quality)
    .auto('format')
    .fit('max')
    .url();

  return (
    <div className={classnames(props.className)}>
      <Image
        src={optimizedImageUrl}
        alt={alt}
        blurDataURL={base64ImageUrl}
        unoptimized
        {...props}
      />
    </div>
  );
}
