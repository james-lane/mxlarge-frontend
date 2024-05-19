import { groq } from 'next-sanity';

export const singlePostQuery = groq`*[_type == "post" && slug.current == $slug && !(_id in path('drafts.**')) && !(slug == null)] | order(_updatedAt desc) [0] {
  _id,
  title,
  publishedAt,
  slug,
  categories[]->{title},
  "imageAsset": mainImage.asset,
  body
}`;

export const postQuery = groq`*[_type == "post" && !(_id in path('drafts.**')) && !(slug == null)] | order(publishedAt desc) [0..26]{
  _id,
  _type,
  title,
  publishedAt,
  slug,
  categories[]->{title},
  "imageAsset": mainImage.asset
}`;

export const categoryQuery = groq`*[_type == "post" && !(_id in path('drafts.**')) && !(slug == null) && (count((categories[]->slug.current)[@ in [$category]]) > 0)] | order(publishedAt desc) [0..23]{
  _id,
  title,
  publishedAt,
  slug,
  categories[]->{title},
  "imageAsset": mainImage.asset
}`;

export const similarPostsQuery = groq`*[_type == "post" && !(_id in path('drafts.**')) && !(slug == null) && !(slug.current == $slug)] | order(publishedAt desc)[0..1]{
  _id,
  title,
  publishedAt,
  slug,
  categories[]->{title},
  "imageAsset": mainImage.asset
}`;

export const adsQuery = groq`*[_type == "advert" && !(_id in path('drafts.**'))]{
  _id,
  _type,
  title,
  advertCategory,
  url,
  "imageAsset": image.asset,
}`;
