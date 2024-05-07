import Link from 'next/link';
import SanityImage from '../sanityImage/SanityImage';
import { Advert } from '../types';

export interface AdvertProps {
  functionBasedProps: () => Advert;
  width: number;
  height: number;
  quality: number;
  sizes?: string;
  priority?: boolean;
}

export const AdvertComponent = ({
  functionBasedProps,
  width,
  height,
  quality,
  sizes,
  priority,
}: AdvertProps) => {
  const { url, imageAsset, title } = functionBasedProps();
  return (
    <Link href={url}>
      <SanityImage
        src={imageAsset}
        alt={title}
        width={width}
        height={height}
        quality={quality}
        sizes={sizes}
        priority={priority}
      />
    </Link>
  );
};
