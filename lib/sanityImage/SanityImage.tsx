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
  const { width, height, quality = 90 } = props;

  // Ensure height is a number for Sanity's image builder
  const heightValue = height ? (typeof height === 'number' ? height : parseInt(String(height), 10)) : width;

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
  const builder = urlForImage(src)
    .width(width)
    .quality(quality)
    .auto('format');

  // If height is specified and different from width, set it explicitly
  // Don't use fit() to avoid unwanted cropping from Sanity's hotspot data
  const optimizedImageUrl = height && height !== width
    ? builder.height(heightValue).url()
    : builder.url();

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
