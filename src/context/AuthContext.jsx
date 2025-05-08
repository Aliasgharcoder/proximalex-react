import { createContext, useContext, useState, useEffect } from "react";

// Create Auth Context
const AuthContext = createContext();

// Provide Auth Context to the App
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores user info like role
  const [loading, setLoading] = useState(true);

  // Simulate fetching user data from localStorage or API
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  // Function to login
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Function to logout
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use Auth Context
export const useAuth = () => useContext(AuthContext);
