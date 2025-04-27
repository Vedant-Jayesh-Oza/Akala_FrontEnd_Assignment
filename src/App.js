import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import StudentsPage from './pages/StudentsPage';
import ChatPage from './pages/ChatPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="students" replace />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="chat"     element={<ChatPage />} />
          <Route path="*"        element={<Navigate to="students" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
