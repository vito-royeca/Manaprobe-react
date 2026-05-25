import { Button } from '@mui/material';
import { useParams } from "react-router";

import type { MGSet } from "~/types";

interface SetHeaderProps {
    set: MGSet;
}
const SetHeader = ({ set }: SetHeaderProps) => {
  const { lang } = useParams<{ lang: string }>();

  return ( 
    <div>
      <img
        src={set.bigLogoURL || ''}
        alt={`${set.id} logo`}
        loading="lazy"
        width={200}
      />

      <h1 className="text-3xl font-bold mb-4 inline-flex items-center gap-4 mt-4">
        {set.name} ({set.id})
      </h1>
      <p className="text-md items-center mb-2">
        &nbsp;<i className={`ss ss-${set.keyruneClass ?? ''} ss-2x`} />  &#11825; 
        &nbsp;{set.cardCount ?? 'N/A'} cards &#11825;
        &nbsp;{set.setType.name ?? 'N/A'} &#11825;
        &nbsp;Released on {Date.parse(set.releaseDate) ? new Date(set.releaseDate).toLocaleDateString() : 'N/A'}
      </p>
      <p>
        {set.languages.map((language, index) => (
          <Button 
            href={`/set/${set.id}/${language.id}`}
            key={index}
            size="small"
            sx={{ mt: 1, mr: 1 }}
            variant="contained"
            disableElevation
            disabled={language.id === lang}
            >
              {language.name}
            </Button>
        ))}
        </p>
    </div>
  );
}
 
export default SetHeader;
