import fs from 'fs';

import type { MGCard } from "~/types";

export const localImageURL = (c: MGCard, image: 'normal' | 'png' | 'art_crop') => {
    const array = c.id.split('_');
    // const hasFaces = c.faces && c.faces.length > 0;
    const isTwoFaces = c.layout?.name === 'Art Series'
      || c.layout?.name === 'Double Faced Token'
      || c.layout?.name === 'Modal Dfc'
      || c.layout?.name === 'Reversible Card'
      || c.layout?.name === 'Split'
      || c.layout?.name === 'Transform';

    const imageURL = `/images/cards/${array[0]}/${array[1]}/${array[2]}${isTwoFaces ? '_0' : ''}/${image}.jpg`;

    return array.length == 3
      ? imageURL
      : c.normalURL;
  }