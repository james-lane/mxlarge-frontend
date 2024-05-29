import { SanityAsset } from '@sanity/image-url/lib/types/types';
import { PortableTextBlock } from '@portabletext/react';
import { Tag } from './descriptionContainer';

export interface Post {
  _id: string;
  _type: string;
  title: string;
  publishedAt: string;
  slug: {
    current: string;
  };
  categories?: Tag[];
  imageAsset: SanityAsset;
  body: PortableTextBlock[];
}

export interface Advert {
  _id: string;
  _type: string;
  title: string;
  advertCategory: string;
  url: string;
  imageAsset: SanityAsset;
}

export interface AdvertProps {
  adverts: Advert[];
  size:
    | 'leaderboard'
    | 'billboard'
    | 'sidebar'
    | 'medium-rectangle'
    | 'wallpaper';

  style?: React.CSSProperties;
  className?: string;
}

export interface AdvertIndicator {
  _type: string;
  size: string;
}
