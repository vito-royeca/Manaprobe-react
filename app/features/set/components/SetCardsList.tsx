import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  ImageList,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";

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
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              width="100%"
              height="auto"
              image={localImageURL(card, 'normal')}
              alt={card.displayName ?? ''}
              className={cssClassForCard(card)}
            />
            <CardContent>
              <Typography gutterBottom component="div">
                {card.displayName}
              </Typography>
              {card.prices && (
                <SetCardsListPricing prices={card.prices} />
              )}
            </CardContent>
          </CardActionArea>
        </Card>
    ))}
    </ImageList>
  );
}

export default SetCardsList;