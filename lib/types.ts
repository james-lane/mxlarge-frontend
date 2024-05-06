import { SanityAsset } from '@sanity/image-url/lib/types/types';
import { PortableTextBlock } from '@portabletext/react';
import { Tag } from './descriptionContainer';

export type Post = {
  _id: string;
  title?: string;
  publishedAt?: string;
  slug: {
    current: string;
  };
  categories?: Tag[];
  imageAsset: SanityAsset;
  body?: PortableTextBlock[];
};

export type Advert = {
  _id: string;
  title: string;
  url: string;
  imageAsset: SanityAsset;
};
