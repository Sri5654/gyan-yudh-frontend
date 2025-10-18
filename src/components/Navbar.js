import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Home, Users, Trophy, Sword, LogOut, Zap } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!currentUser) {
    return null;
  }

  const navItems = [
    { path: '/', icon: Home, label: 'Battleground' },
    { path: '/team', icon: Users, label: 'Your Squad' },
    { path: '/earn-xp', icon: Zap, label: 'Armory' },
    { path: '/coding-arena', icon: Sword, label: 'Coding Arena' },
    { path: '/leaderboard', icon: Trophy, label: 'Hall of Fame' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1 className="brand-title">
          <span className="text-primary">Gyan</span>
          <span className="text-secondary">Yudh</span>
        </h1>
      </div>
      
      <div className="navbar-nav">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`nav-link ${location.pathname === path ? 'active' : ''}`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </Link>
        ))}
      </div>

      <div className="navbar-user">
        <span className="user-name">{currentUser.name}</span>
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;