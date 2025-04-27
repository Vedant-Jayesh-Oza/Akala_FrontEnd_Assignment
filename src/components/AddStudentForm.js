import React, { useState } from 'react';
import {
  TextField, Button, Box, Alert, Stack
} from '@mui/material';
import PropTypes from 'prop-types';

const initialForm = {
  id: '',
  name: '',
  course: '',
  grade: '',
  enrollmentDate: '',
};

export default function AddStudentForm({ onAdd }) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for (let key of Object.keys(form)) {
      if (!form[key].trim()) {
        setError(`Please fill in the ${key} field.`);
        return;
      }
    }
    
    onAdd(form);
    setForm(initialForm);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Student ID"
          name="id"
          value={form.id}
          onChange={handleChange}
          required
        />
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Course"
          name="course"
          value={form.course}
          onChange={handleChange}
          required
        />
        <TextField
          label="Grade"
          name="grade"
          value={form.grade}
          onChange={handleChange}
          required
        />
        <TextField
          label="Enrollment Date"
          name="enrollmentDate"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={form.enrollmentDate}
          onChange={handleChange}
          required
        />
        <Button variant="contained" type="submit">
          Add Student
        </Button>
      </Stack>
    </Box>
  );
}

AddStudentForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};