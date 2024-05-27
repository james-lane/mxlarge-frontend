import Link from 'next/link';
import { Advert, AdvertProps } from '../types';
import { getAdverts } from '@/utils/adverts/getAdverts';
import { AdvertImage } from './advertImage';

let previousSidebarAdId: string;

export const AdvertComponent = async ({
  size,
  style,
  className,
}: AdvertProps) => {
  const allAds: Advert[] = await getAdverts();

  const randomAd = (size: AdvertProps['size']): Advert => {
    const filteredAds: Advert[] = allAds.filter(
      (ad) => ad.advertCategory === size && ad._id !== previousSidebarAdId
    );

    const filteredAd =
      filteredAds[Math.floor(Math.random() * filteredAds.length)];

    return filteredAd;
  };

  let chosenAd = randomAd(size);

  if (chosenAd.advertCategory === 'sidebar') {
    previousSidebarAdId = chosenAd._id;
  }

  const { url } = chosenAd;

  return (
    <Link href={url} target="_blank" className={className}>
      <AdvertImage chosenAd={chosenAd} size={size} style={style} />
    </Link>
  );
};
