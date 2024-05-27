'use client';

import { Advert } from '@/lib/types';
import { sendGAEvent } from '@next/third-parties/google';
import { useEffect } from 'react';

export const SendAdEvent = ({ ad }: { ad: Advert }) => {
  useEffect(() => {
    sendGAEvent('event', 'advert_loaded', {
      name: ad.title,
      size: ad.advertCategory,
    });
  }, []);

  return null;
};
