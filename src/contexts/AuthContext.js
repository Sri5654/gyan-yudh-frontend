import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Mock user data - no API calls
  const mockUser = {
    _id: 'demo-user-123',
    name: 'Demo Student',
    email: 'demo@btech.edu',
    teamId: { 
      _id: 'team-123', 
      name: 'The Segfault Squad' 
    },
    xp: 1250,
    dailyGoal: 100,
    dailyProgress: 75,
    avatar: 'https://via.placeholder.com/100x100/1a1a2e/00d2ff?text=DS',
    powerUps: [
      { name: 'Double XP', active: true, expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000) },
      { name: 'Streak Shield', active: true, expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) }
    ]
  };

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      if (token) {
        setCurrentUser(mockUser);
        console.log('✅ Demo user loaded:', mockUser.name);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [token]);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setCurrentUser(null);
    console.log('👋 User logged out');
  };

  const login = async (email, password) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password) {
      const mockToken = 'demo-jwt-token-' + Date.now();
      localStorage.setItem('token', mockToken);
      setToken(mockToken);
      setCurrentUser({
        ...mockUser,
        email: email,
        name: email.split('@')[0] || 'Demo Student'
      });
      
      console.log('✅ Demo login successful');
      return { success: true };
    } else {
      return { 
        success: false, 
        error: 'Please enter both email and password' 
      };
    }
  };

  const register = async (name, email, password, teamName) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (name && email && password && teamName) {
      const mockToken = 'demo-jwt-token-' + Date.now();
      localStorage.setItem('token', mockToken);
      setToken(mockToken);
      setCurrentUser({
        ...mockUser,
        name: name,
        email: email,
        teamId: { _id: 'team-new', name: teamName }
      });
      
      console.log('✅ Demo registration successful');
      return { success: true };
    } else {
      return { 
        success: false, 
        error: 'Please fill in all fields' 
      };
    }
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    token
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};