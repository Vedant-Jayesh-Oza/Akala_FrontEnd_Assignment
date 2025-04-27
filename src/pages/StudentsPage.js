import React, { useState, useEffect } from 'react';
import { Typography, TextField, Box } from '@mui/material';
import StudentTable from '../components/StudentTable';
import AddStudentForm from '../components/AddStudentForm';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/storage';

const sampleData = [
  { id: 'S001', name: 'Alice', course: 'Math', grade: 'A', enrollmentDate: '2023-09-01' },
  { id: 'S002', name: 'Bob', course: 'Physics', grade: 'B', enrollmentDate: '2023-09-05' },
  { id: 'S003', name: 'Charlie', course: 'History', grade: 'A', enrollmentDate: '2023-09-10' },
];

export default function StudentsPage() {
  const [students, setStudents] = useState(() => 
    getFromLocalStorage('students', sampleData)
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const existingIds = students.map(student => student.id);

  useEffect(() => {
    saveToLocalStorage('students', students);
  }, [students]);

  const handleAdd = (newStud) => {
    setStudents(prev => [...prev, newStud]);
    setSuccessMessage('Student added successfully!');
    
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Students
      </Typography>
      <TextField
        label="Search by ID or Name"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        fullWidth
      />
      <StudentTable students={students} searchTerm={searchTerm} />
      <Typography variant="h5" sx={{ mt: 4 }}>
        Add New Student
      </Typography>
      {successMessage && (
        <Box sx={{ 
          p: 2, 
          my: 2, 
          bgcolor: 'success.light', 
          color: 'success.contrastText',
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center'
        }}>
          <span style={{ marginRight: '8px' }}>✓</span>
          {successMessage}
        </Box>
      )}
      <AddStudentForm onAdd={handleAdd} existingIds={existingIds} />
    </Box>
  );
}