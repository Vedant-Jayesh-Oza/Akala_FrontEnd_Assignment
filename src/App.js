import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import StudentsPage from './pages/StudentsPage';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/chat"     element={<ChatPage />} />
          <Route path="*"          element={<Navigate to="/students" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
