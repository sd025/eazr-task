import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';
import Signup from './pages/Signup';
import ProtectedRoute from "./components/ProtectRoute";
import Dashboard from "./components/Dashboard";

function App() {

  return (
    <>
      <div>
      <Router>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
        <Toaster position="top-right" />
      </div>
    </>
  )
}

export default App
