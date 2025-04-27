import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button
} from '@mui/material';

export default function ChatWindow({ thread, onSend }) {
  const [input, setInput] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input.trim());
    setInput('');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '80vh' }}>
      {/* Messages */}
      <Box sx={{ flex: 1, overflowY: 'auto', mb: 2 }}>
        {thread.messages.map((msg, idx) => {
          const isStudent = msg.from === 'student';
          return (
            <Box
              key={idx}
              sx={{
                display: 'flex',
                justifyContent: isStudent ? 'flex-end' : 'flex-start',
                mb: 1
              }}
            >
              <Paper
                sx={{
                  p: 1,
                  maxWidth: '70%',
                  bgcolor: isStudent ? 'primary.light' : 'grey.200'
                }}
              >
                <Typography variant="body2">{msg.text}</Typography>
                <Typography variant="caption" sx={{ display: 'block', textAlign: 'right' }}>
                  {new Date(msg.timestamp).toLocaleString()}
                </Typography>
              </Paper>
            </Box>
          );
        })}
      </Box>

      {/* Input */}
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <Button variant="contained" type="submit">
          Send
        </Button>
      </Box>
    </Box>
  );
}

ChatWindow.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    student: PropTypes.string.isRequired,
    messages: PropTypes.arrayOf(PropTypes.shape({
      from: PropTypes.string,
      text: PropTypes.string,
      timestamp: PropTypes.string
    })).isRequired,
  }).isRequired,
  onSend: PropTypes.func.isRequired,
};
