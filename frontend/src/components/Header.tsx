import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="bg-white shadow px-4 py-3 flex justify-between">
      <h1 className="text-xl font-bold">Task Management</h1>
      <button
        onClick={handleLogout}
        className="text-red-500 hover:text-red-700"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
