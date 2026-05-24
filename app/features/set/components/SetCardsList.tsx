import {
  ImageList,
  ImageListItem,
  Paper
} from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";

import { cssClassForCard, localImageURL } from "~/utils/localImage";
import type { MGCard } from "~/types";
import SetCardsListPricing from "./SetCardsListPricing";

interface SetCardsListProps {
  cards: MGCard[];
}

const SetCardsList = ({ cards }: SetCardsListProps) => {
  const theme = useTheme();
  
  // Define breakpoints
  const isXsmall = useMediaQuery(theme.breakpoints.only('xs'));
  const isSmall = useMediaQuery(theme.breakpoints.only('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.only('md'));
  const isLarge = useMediaQuery(theme.breakpoints.only('lg'));

  // Logic to determine column count
  const getCols = () => {
    if (isXsmall) return 1;
    if (isSmall) return 2;
    if (isMedium) return 3;
    if (isLarge) return 4;
    return 4; // default for lg and xl
  };

  return ( 
    
    <ImageList sx={{ width: '100%', height: 'auto' }} gap={20} cols={getCols()}>
      {cards.map((card) => (
        <Paper>
        <ImageListItem key={card.id}>
          <img
            srcSet={localImageURL(card, 'normal')}
            src={localImageURL(card, 'normal')}
            alt={card.displayName ?? ''}
            loading="lazy"
            className={cssClassForCard(card)}
          />
          <div className="p-4">
          {card.displayName !== undefined ? (
            <div className="text-m">
              {card.displayName}
            </div>
          ) : null}
          {card.prices && (
            <SetCardsListPricing prices={card.prices} />
          )}
          </div>
        </ImageListItem>
        </Paper>
    ))}
    </ImageList>
  );
}

export default SetCardsList;