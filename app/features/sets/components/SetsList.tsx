import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import type { MGSet } from '~/types';

interface Column {
  id: 'id' | 'name';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'id', label: 'Code', minWidth: 50 },
  { id: 'name', label: 'Name', minWidth: 100 },
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
              {columns.map((column) => {
                let value = '';
                if (column.id === 'id') {
                  value = set.id;
                } else if (column.id === 'name') {
                  value = set.name;
                }
                return (
                  <TableCell key={column.id} align={column.align}>
                    {value}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    
  );
}
