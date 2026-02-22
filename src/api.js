import axios from "axios";

const API = axios.create({
<<<<<<< Updated upstream
  // baseURL: 'http://localhost:8080/api',
    // baseURL: 'https://api.advanceforte.in/api',
    baseURL: 'http://localhost:5000/api',
=======
  baseURL: 'http://localhost:8080/api',
    // baseURL: 'https://api.advanceforte.in/api',
>>>>>>> Stashed changes
  //baseURL: process.env.REACT_APP_API_URL,
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
