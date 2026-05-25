import type { MGCard } from "~/types";

const VITE_ENV = import.meta.env.VITE_ENV;

export const localImageURL = (c: MGCard, image: 'normal' | 'png' | 'art_crop') => {
  const array = c.id.split('_');
  // const hasFaces = c.faces && c.faces.length > 0;
  const isTwoFaces = c.layout?.name === 'Art Series'
    || c.layout?.name === 'Double Faced Token'
    || c.layout?.name === 'Modal Dfc'
    || c.layout?.name === 'Reversible Card'
    || c.layout?.name === 'Split'
    || c.layout?.name === 'Transform';

  let imageURL = '';
  let cardBackURL = '';
  let set = '';
  if (array.length >= 3) {
    imageURL = `/images/cards/${array[0]}/${array[1]}/${array[2]}${isTwoFaces ? '_0' : ''}/${image}.jpg`;
    set = array[0];
  }
  
  switch (c.set?.id) {
    case 'ced':
      cardBackURL = '/images/collectorscardback-hq.png';
    case 'cei':
      cardBackURL = '/images/internationalcollectorscardback-hq.png';
    default:
      cardBackURL = '/images/cardback-hq.png';
  };  

  return VITE_ENV === 'production'
    ? array.length == 3
      ? imageURL
      : cardBackURL
    : cardBackURL;
}

export const cssClassForCard = (c: MGCard) => {
  let array = c.id.split('_')
  let set = array.length > 0 ? array[0] : '';
  let css = '';

  if (set === 'lea') {
    css = 'card lea';
  } else if (set === 'cei' || set === 'ced') {
    css = 'card cei';
  } else {
    css = 'card';
  }

  return css;
}    