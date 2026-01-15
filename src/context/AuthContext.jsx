import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('ecommerce_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Sign up function
  const signup = async (userData) => {
    try {
      // In a real app, this would be an API call
      const newUser = {
        id: Date.now(),
        ...userData,
        createdAt: new Date().toISOString(),
      };
      
      // Save to localStorage (in real app, this would be a backend)
      localStorage.setItem('ecommerce_user', JSON.stringify(newUser));
      setUser(newUser);
      
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Login function
  const login = async (emailOrPhone, password) => {
    try {
      // Mock validation - in real app, this would be API call
      const savedUser = localStorage.getItem('ecommerce_user');
      
      if (!savedUser) {
        return { success: false, error: 'User not found. Please sign up first.' };
      }
      
      const userData = JSON.parse(savedUser);
      
      // Check credentials
      const isEmailMatch = userData.email === emailOrPhone;
      const isPhoneMatch = userData.phone === emailOrPhone;
      const isPasswordMatch = userData.password === password;
      
      if ((isEmailMatch || isPhoneMatch) && isPasswordMatch) {
        setUser(userData);
        return { success: true, user: userData };
      } else {
        return { success: false, error: 'Invalid email/phone or password' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('ecommerce_user');
    setUser(null);
  };

  // Update user profile
  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    localStorage.setItem('ecommerce_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    return { success: true, user: updatedUser };
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};