import type { MGCardPrice } from '~/types';

interface SetCardsListPricingProps {
  prices: MGCardPrice[];
}

const SetCardsListPricing = ({ prices }: SetCardsListPricingProps) => {
  let normal = 0
  let foil = 0;
  
  for (const price of prices) { 
    if (price.isFoil) {
      foil = price.market || 0;
    } else {
      normal = price.market || 0;
    }
  }

  return (
    <div className="mt-2 text-sm grid grid-cols-2 gap-2">
        {normal > 0 ? (
          <div>Normal: ${normal.toFixed(2)}</div>
        ) : (
          <div>Normal: &#8212;</div>
        )}
        {foil > 0 ? (
          <div>Foil: ${foil.toFixed(2)}</div>
        ) : (
          <div>Foil: &#8212;</div>
        )}
    </div>
  );
}

export default SetCardsListPricing;