import type { MGSet } from "~/types";

interface SetHeaderProps {
    set: MGSet;
}
const SetHeader = ({ set }: SetHeaderProps) => {
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
    </div>
  );
}
 
export default SetHeader;
