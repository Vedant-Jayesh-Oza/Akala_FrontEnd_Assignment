import React, { useState, useMemo } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TableSortLabel, Paper, Typography, Box
} from '@mui/material';
import PropTypes from 'prop-types';

// comparator helpers
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function StudentTable({ students, searchTerm }) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const filteredList = students.filter(s =>
      s.id.toLowerCase().includes(term) ||
      s.name.toLowerCase().includes(term)
    );
    return filteredList.sort(getComparator(order, orderBy));
  }, [students, searchTerm, order, orderBy]);

  if (filtered.length === 0) {
    return (
      <Box mt={2}>
        <Typography>No students match your search.</Typography>
      </Box>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 2,
        overflowX: 'auto'       
      }}
    >
      <Table
        sx={{
          minWidth: 600          
        }}
      >
        <TableHead>
          <TableRow>
            {[
              { id: 'id',    label: 'Student ID' },
              { id: 'name',  label: 'Name' },
              { id: 'course',label: 'Course' },
              { id: 'grade', label: 'Grade' },
              { id: 'enrollmentDate', label: 'Enrollment Date' },
            ].map(headCell => (
              <TableCell key={headCell.id}>
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={() => handleSort(headCell.id)}
                >
                  {headCell.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {filtered.map((stud) => (
            <TableRow key={stud.id}>
              <TableCell>{stud.id}</TableCell>
              <TableCell>{stud.name}</TableCell>
              <TableCell>{stud.course}</TableCell>
              <TableCell>{stud.grade}</TableCell>
              <TableCell>{stud.enrollmentDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

StudentTable.propTypes = {
  students: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    course: PropTypes.string,
    grade: PropTypes.string,
    enrollmentDate: PropTypes.string,
  })).isRequired,
  searchTerm: PropTypes.string.isRequired,
};
