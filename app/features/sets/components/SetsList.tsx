import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import type { MGSet } from '~/types';

interface Column {
  id: 'smallLogoURL' | 'keyruneCode' | 'id' | 'type' | 'cards' | 'releaseDate' | 'name';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'smallLogoURL', label: 'Logo', minWidth: 100, align: 'center' },
  { id: 'keyruneCode', label: 'Icon', minWidth: 10, align: 'center' },
  { id: 'id', label: 'Code', minWidth: 10, align: 'left' },
  { id: 'name', label: 'Name', minWidth: 250, align: 'left' },
  { id: 'type', label: 'Type', minWidth: 50, align: 'left' },
  { id: 'cards', label: 'Cards', minWidth: 10, align: 'right' },
  { id: 'releaseDate', label: 'Release Date', minWidth: 20, align: 'right' },
  
];


interface SetsListPageProps {
  sets: MGSet[];
}

export default function SetsListPage({ sets }: SetsListPageProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sets.map((set, index) => (
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
                style={{ minWidth: 10 }}>
                {set.id}
              </TableCell>
              <TableCell 
                align='left'
                style={{ minWidth: 250 }}>
                {set.name}
              </TableCell>
              <TableCell 
                align='left'
                style={{ minWidth: 50 }}>
                {set.setType?.name ?? 'N/A'}
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
