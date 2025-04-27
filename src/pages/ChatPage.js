import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import ThreadList from '../components/ThreadList';
import ChatWindow from '../components/ChatWindow';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/storage';

const sampleThreads = [
  {
    id: 't1',
    student: 'Alice',
    messages: [
      { from: 'student', text: 'Hi Advisor, I have a question about my grade.', timestamp: '2024-10-01T10:00:00Z' },
      { from: 'advisor', text: 'Sure, what is it?', timestamp: '2024-10-01T10:05:00Z' },
    ],
  },
  {
    id: 't2',
    student: 'Bob',
    messages: [
      { from: 'student', text: 'Can we discuss my enrollment date?', timestamp: '2024-10-02T09:00:00Z' },
      { from: 'advisor', text: "Yes, let's schedule a time.", timestamp: '2024-10-02T09:10:00Z' },
    ],
  },
];

export default function ChatPage() {
  const [threads, setThreads] = useState(() => 
    getFromLocalStorage('chatThreads', sampleThreads)
  );
  
  const [selectedThreadId, setSelectedThreadId] = useState(() => 
    getFromLocalStorage('selectedThreadId', threads[0]?.id || null)
  );

  useEffect(() => {
    saveToLocalStorage('chatThreads', threads);
  }, [threads]);

  useEffect(() => {
    saveToLocalStorage('selectedThreadId', selectedThreadId);
  }, [selectedThreadId]);

  const handleSelectThread = id => {
    setSelectedThreadId(id);
  };

  const handleSendMessage = text => {
    setThreads(prev =>
      prev.map(thread =>
        thread.id === selectedThreadId
          ? {
              ...thread,
              messages: [
                ...thread.messages,
                { from: 'student', text, timestamp: new Date().toISOString() },
              ],
            }
          : thread
      )
    );
  };

  const selectedThread = threads.find(t => t.id === selectedThreadId);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', sm: 260 },
          mb: { xs: 2, sm: 0 }
        }}
      >
        <Typography variant="h6" sx={{ p: 1 }}>
          Conversations
        </Typography>
        <ThreadList
          threads={threads}
          selectedThreadId={selectedThreadId}
          onSelect={handleSelectThread}
        />
      </Box>
      <Box sx={{ flex: 1, width: { xs: '100%', sm: 'auto' } }}>
        {selectedThread ? (
          <ChatWindow thread={selectedThread} onSend={handleSendMessage} />
        ) : (
          <Typography>Select a conversation to start.</Typography>
        )}
      </Box>
    </Box>
  );
}