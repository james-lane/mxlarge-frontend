'use client';

import { Advert } from '@/lib/types';
import { sendGAEvent } from '@next/third-parties/google';

export const SendAdEvent = ({ ad }: { ad: Advert }) => {
  sendGAEvent('event', 'advert_loaded', {
    name: ad.title,
    size: ad.advertCategory,
  });

  return null;
};
