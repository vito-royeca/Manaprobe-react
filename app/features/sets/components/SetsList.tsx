import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
 } from '@mui/material';

import type { MGSet } from '~/types';
import SetsListRow from './SetsListRow';

interface Column {
  id: 'smallLogoURL' | 'keyruneCode' | 'name' | 'cards' | 'releaseDate';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'smallLogoURL', label: 'Logo', minWidth: 100, align: 'center' },
  { id: 'keyruneCode', label: 'Symbol', minWidth: 10, align: 'center' },
  { id: 'name', label: 'Name', minWidth: 250, align: 'left' },
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
            <SetsListRow
              key={index}
              set={set} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
