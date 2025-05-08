import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
// Helper function for API requests
const apiRequest = async (endpoint, method = "GET", body = null, headers = {}) => {
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    credentials: 'include'
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.detail || 
      errorData.message || 
      Object.values(errorData).flat().join('\n') || 
      "Request failed"
    );
  }

  return response.json();
};

// Authentication functions
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/user/login/`, {
      email,
      password,
    });

    const { access, refresh,user } = response.data;

    // Save tokens to localStorage
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
    localStorage.setItem("isAuthenticated", "true");  // This must be a string
    localStorage.setItem("userRole", user.role)
    // You can fetch user details using /me endpoint if available
  //   const role = response.data.role;
  // if (role === "client") {
  //   navigate("/");
  // } else if (role === "lawyer") {
  //   navigate("/lawyer/dashboard");
  // }
    return { user, access, refresh };
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Login failed"
    );
      }
};

export const handleGoogleLoginSuccess = () => {
  window.location.href = `${API_URL}/auth/login/google-oauth2/`;
};


export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/user/register/`, userData);
    return response.data;
  } catch (error) {
    console.log("REGISTER API ERROR:", error.response?.data); // Inspect server errors
    const message =
    error.response?.data?.password?.[0] ||
    error.response?.data?.email?.[0] ||
    error.response?.data?.username?.[0] ||
    error.response?.data?.non_field_errors?.[0] ||
    "Registration failed";
    console.log("THROWING ERROR:", message);
  throw new Error(message);
  }
};

export const logout = async () => {
  try {
    await apiRequest("/user/logout/", "POST");
    clearAuthData();
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("No refresh token available");
    
    const { access } = await apiRequest("/api/auth/token/refresh/", "POST", {
      refresh: refreshToken,
    });

    localStorage.setItem("accessToken", access);
    return access;
  } catch (error) {
    console.error("Token refresh error:", error);
    clearAuthData();
    throw error;
  }
};

export const getUserData = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("No access token available");
    
    const data = await apiRequest("/api/auth/user/", "GET", null, {
      Authorization: `Bearer ${accessToken}`,
    });

    if (!data.role) data.role = 'client';
    localStorage.setItem("userData", JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Get user data error:", error);
    throw error;
  }
};

{/* <GoogleLogin
  onSuccess={handleGoogleLoginSuccess}
  onError={() => console.log('Login Failed')}
/> */}
// export const handleGoogleCallback = async (code) => {
//   try {
//     const response = await apiRequest(
//       `/api/auth/social/google/callback/?code=${code}`, 
//       'GET'
//     );
    
//     if (response.access) {
//       localStorage.setItem('accessToken', response.access);
//       if (response.refresh) {
//         localStorage.setItem('refreshToken', response.refresh);
//       }
//       return await getUserData();
//     }
//     throw new Error('Authentication failed: No tokens received');
//   } catch (error) {
//     console.error('Google auth failed:', error);
//     throw error;
//   }
// };

// Helper functions
// const clearAuthData = () => {
//   localStorage.removeItem("accessToken");
//   localStorage.removeItem("refreshToken");
//   localStorage.removeItem("userData");
// };

// export const checkAuth = async () => {
//   try {
//     const accessToken = localStorage.getItem("accessToken");
//     if (!accessToken) return false;
    
//     await getUserData();
//     return true;
//   } catch (error) {
//     return false;
//   }
// };