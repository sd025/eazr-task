import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
import axios from 'axios';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
    } finally {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <header className="bg-white shadow px-4 py-3 flex justify-between ">
      <h1 className="text-xl font-semibold">Task Management</h1>
      <div>
        <Button
          onClick={handleLogout}
          variant='outline'
          >
          <LogOut/>
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Header;
