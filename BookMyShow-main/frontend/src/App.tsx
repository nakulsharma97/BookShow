// src/App.tsx (or similar main routing file)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your page components
import Home from './pages/Home';
import Login from './pages/Login'; // <--- Ensure this import exists
import Signup from './pages/Signup';
import MovieDetail from './pages/MovieDetail';
import ProtectedRoute from './components/ProtectedRoute'; // Import the new component
import SeatSelection from './pages/SeatSelection';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> {/* <--- This route is crucial */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/movie/:id" element={<MovieDetail />} /> {/* Movie details can be public */}
        {/* Protect the SeatSelection route */}
        <Route
          path="/book/:id"
          element={<ProtectedRoute><SeatSelection /></ProtectedRoute>}
        />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
