import { groq } from 'next-sanity';

// export const postQuery = groq`*[_type == "post"] {
//   _id,
//   _createdAt,
//   title,
//   "slug": slug.current,
//   cover {
//     "image": asset->url,
//     "lqip": asset->metadata.lqip,
//     alt,
//   },
//   content,
// }`;

export const singlePostQuery = groq`*[_type == "post" && slug.current == $slug && !(_id in path('drafts.**')) && !(slug == null)] | order(_updatedAt desc) [0] {
  _id,
  title,
  publishedAt,
  slug,
  categories[]->{title},
  "imageAsset": mainImage.asset,
  body
}`;

export const postQuery = groq`*[_type == "post" && !(_id in path('drafts.**')) && !(slug == null)] | order(publishedAt desc){
  _id,
  title,
  publishedAt,
  slug,
  categories[]->{title},
  "imageAsset": mainImage.asset
}`;

export const categoryQuery = groq`*[_type == "post" && !(_id in path('drafts.**')) && !(slug == null) && (count((categories[]->slug.current)[@ in [$category]]) > 0)] | order(publishedAt desc){
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

export const homepageAdsQuery = groq`*[_type == "advert" && advertCategory in ["sidebar", "medium-rectangle"]]{
  _id,
  title,
  url,
  "imageAsset": image.asset,
}`;

export const billboardAdsQuery = groq`*[_type == "advert" && advertCategory in ["billboard"]]{
  _id,
  title,
  url,
  "imageAsset": image.asset,
}`;

export const leaderboardAdsQuery = groq`*[_type == "advert" && advertCategory in ["leaderboard"]]{
  _id,
  title,
  url,
  "imageAsset": image.asset,
}`;
