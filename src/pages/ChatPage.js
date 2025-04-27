import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import ThreadList from '../components/ThreadList';
import ChatWindow from '../components/ChatWindow';

const sampleThreads = [
  {
    id: 't1',
    student: 'Alice',
    messages: [
      { from: 'student', text: 'Hi Advisor, I have a question about my grade.', timestamp: '2024-10-01T10:00:00Z' },
      { from: 'advisor', text: 'Sure, what is it?',               timestamp: '2024-10-01T10:05:00Z' },
    ],
  },
  {
    id: 't2',
    student: 'Bob',
    messages: [
      { from: 'student', text: 'Can we discuss my enrollment date?',   timestamp: '2024-10-02T09:00:00Z' },
      { from: 'advisor', text: "Yes, let's schedule a time.",          timestamp: '2024-10-02T09:10:00Z' },
    ],
  },
];

export default function ChatPage() {
  const [threads, setThreads] = useState(sampleThreads);
  const [selectedThreadId, setSelectedThreadId] = useState(threads[0]?.id || null);

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
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Box sx={{ width: 260 }}>
        <Typography variant="h6" sx={{ p: 1 }}>
          Conversations
        </Typography>
        <ThreadList
          threads={threads}
          selectedThreadId={selectedThreadId}
          onSelect={handleSelectThread}
        />
      </Box>

      <Box sx={{ flex: 1 }}>
        {selectedThread ? (
          <ChatWindow thread={selectedThread} onSend={handleSendMessage} />
        ) : (
          <Typography>Select a conversation to start.</Typography>
        )}
      </Box>
    </Box>
  );
}
