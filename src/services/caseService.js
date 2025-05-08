import axios from 'axios';

// Update caseService.js
const API_URL = `${import.meta.env.VITE_API_URL}/user/`; // Base URL

export const predictLawyers = async (caseData, token) => {
  try {
    const response = await axios.post(`${API_URL}predict-lawyers/`, caseData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Prediction error:', error.response?.data);
    throw error;
  }
};

export const createCase = async (data, token) => {
  const config = {
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  };

  // Convert FormData to regular object if needed
  const payload = data instanceof FormData ? data : convertToFormData(data);
  
  const response = await axios.post(`${API_URL}cases/`, payload, config);
  return response.data;
};

// Helper function
const convertToFormData = (data) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });
  return formData;
};
// 🆕 fetch all lawyers
export const getLawyers = async (token) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/user/lawyers-list/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    throw new Error("Failed to fetch lawyers");
  }
  return await response.json();
};

// export const fetchCases = async (token) => {
//   const response = await axios.get(API_URL, {
//     headers: { Authorization: `Bearer ${token}` }
//   });
//   return response.data;
// };
  