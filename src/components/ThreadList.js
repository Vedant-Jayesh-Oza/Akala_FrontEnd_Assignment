import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Paper
} from '@mui/material';

export default function ThreadList({ threads, selectedThreadId, onSelect }) {
  return (
    <Paper sx={{ height: '80vh', overflowY: 'auto' }}>
      <List disablePadding>
        {threads.map(thread => (
          <ListItemButton
            key={thread.id}
            selected={thread.id === selectedThreadId}
            onClick={() => onSelect(thread.id)}
          >
            <ListItemAvatar>
              <Avatar>{thread.student.charAt(0)}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={thread.student}
              secondary={thread.messages[thread.messages.length - 1]?.text}
            />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    student: PropTypes.string.isRequired,
    messages: PropTypes.array.isRequired,
  })).isRequired,
  selectedThreadId: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};
