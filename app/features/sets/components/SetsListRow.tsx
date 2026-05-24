import { Button, TableCell, TableRow } from '@mui/material';

import type { MGSet } from '~/types';

interface SetsListRowProps {
  set: MGSet;
  index: number;
}

const SetsListRow = ({
  set,
  index
}: SetsListRowProps) => {
  return ( 
    <TableRow
      key={index}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell 
        align='center'
        style={{ minWidth: 100 }}>
        <img
          src={set.smallLogoURL || ''}
          alt={`${set.id} logo`}
          loading="lazy"
          width={100}
        />
      </TableCell>
      <TableCell 
        align='center'
        style={{ minWidth: 10 }}>
        <i className={`ss ss-${set.keyruneClass ?? ''} ss-2x`} />
      </TableCell>
      <TableCell 
        align='left'
        style={{ minWidth: 250 }}>
          <p>{set.name} ({set.id}) </p>
          {set.languages.map((lang, index) => (
            <Button 
              href={`/set/${set.id}/${lang.id}`}
              key={index}
              size="small"
              sx={{ mt: 1, mr: 1 }}
              variant="contained"
              disableElevation
            >
              {lang.displayID}
            </Button>
          ))}
      </TableCell>
      <TableCell 
        align='right'
        style={{ minWidth: 10 }}>
        {set.cardCount ?? 'N/A'}
      </TableCell>
      <TableCell 
        align='right'
        style={{ minWidth: 20 }}>
        {set.releaseDate}
      </TableCell>
    </TableRow>
  );  
}
    
export default SetsListRow