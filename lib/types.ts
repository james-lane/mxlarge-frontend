import { SanityAsset } from '@sanity/image-url/lib/types/types';
import { Tag } from '@/lib/articleCard';
import { PortableTextBlock } from '@portabletext/react';

export type Post = {
  _id: string;
  title?: string;
  slug: {
    current: string;
  };
  categories?: Tag[];
  excerpt?: string;
  imageAsset: SanityAsset;
  body?: PortableTextBlock[];
};

export type Advert = {
  _id: string;
  title: string;
  url: string;
  imageAsset: SanityAsset;
};
