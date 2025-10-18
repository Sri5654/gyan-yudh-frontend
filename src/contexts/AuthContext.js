import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Set API base URL based on environment
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Configure axios
if (API_BASE_URL) {
  axios.defaults.baseURL = API_BASE_URL;
  console.log('🔗 API connected to:', API_BASE_URL);
}

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setCurrentUser(null);
    delete axios.defaults.headers.common['x-auth-token'];
  }, []);

  const fetchUserProfile = useCallback(async () => {
    try {
      console.log('📡 Fetching user profile...');
      const response = await axios.get('/api/users/profile');
      setCurrentUser(response.data);
      console.log('✅ User profile loaded:', response.data.name);
    } catch (error) {
      console.error('❌ Error fetching user profile:', error);
      // Don't logout on API errors during initial load
      if (error.response?.status === 401) {
        logout();
      } else {
        // Use mock data if API is not available
        setCurrentUser({
          _id: 'demo-user',
          name: 'Demo User',
          email: 'demo@example.com',
          teamId: { _id: '1', name: 'Demo Team' },
          xp: 1250,
          dailyGoal: 100,
          dailyProgress: 75,
          avatar: 'https://via.placeholder.com/100x100/1a1a2e/00d2ff?text=DU'
        });
        console.log('🔄 Using demo data due to API error');
      }
    } finally {
      setLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [token, fetchUserProfile]);

  const login = async (email, password) => {
    try {
      console.log('🔐 Attempting login...');
      const response = await axios.post('/api/auth/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      setToken(token);
      axios.defaults.headers.common['x-auth-token'] = token;
      setCurrentUser(user);
      
      console.log('✅ Login successful:', user.name);
      return { success: true };
    } catch (error) {
      console.error('❌ Login failed:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const register = async (name, email, password, teamName) => {
    try {
      console.log('📝 Attempting registration...');
      const response = await axios.post('/api/auth/register', {
        name,
        email,
        password,
        teamName
      });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      setToken(token);
      axios.defaults.headers.common['x-auth-token'] = token;
      setCurrentUser(user);
      
      console.log('✅ Registration successful:', user.name);
      return { success: true };
    } catch (error) {
      console.error('❌ Registration failed:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed' 
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