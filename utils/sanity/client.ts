import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { QueryParams, createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03';

export const client = createClient({
  projectId,
  dataset,
  apiVersion, // https://www.sanity.io/docs/api-versioning
  useCdn: true, // if you're using ISR or only static generation at build time then you can set this to `false` to guarantee no stale content
});

const builder = imageUrlBuilder(client);

export const urlForImage = (source: SanityImageSource) => {
  return builder.image(source);
};

export async function sanityFetch<QueryResponse>({
  query,
  qParams = {},
  tags,
  revalidate,
}: {
  query: string;
  qParams?: QueryParams;
  tags: string[];
  revalidate?: number | false;
}): Promise<QueryResponse> {
  // When revalidate is specified, don't use force-cache (they conflict)
  const cacheOption = revalidate !== undefined ? undefined : 'force-cache';

  return client.fetch<QueryResponse>(query, qParams, {
    ...(cacheOption && { cache: cacheOption }),
    next: { tags, ...(revalidate !== undefined && { revalidate }) },
  });
}
