import axios from "axios";

// Using the exact pattern requested by the user
const API_BASE = `${import.meta.env.VITE_API_URL}/api`;

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("village_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ==================== AUTH ====================
export const loginUser = (data) => api.post("/auth/login", data);
export const registerUser = (data) => api.post("/auth/register", data);
export const getMe = () => api.get("/auth/me");

// ==================== DASHBOARD ====================
export const getDashboardSummary = () => api.get("/dashboard/summary");
export const getRecentActivity = () => api.get("/dashboard/recent-activity");
export const getGrievanceStats = () => api.get("/dashboard/grievance-stats");

// ==================== JOB (Singular) ====================
export const getJob = (params) => api.get("/job", { params });
export const getJobById = (id) => api.get(`/job/${id}`);
export const createJob = (data) => api.post("/job", data);
export const updateJob = (id, data) => api.put(`/job/${id}`, data);
export const deleteJob = (id) => api.delete(`/job/${id}`);

// ==================== AGRICULTURE ====================
export const getAgriculture = () => api.get("/agriculture");
export const createAgriculture = (data) => api.post("/agriculture", data);
export const updateAgriculture = (id, data) => api.put(`/agriculture/${id}`, data);
export const deleteAgriculture = (id) => api.delete(`/agriculture/${id}`);

// ==================== HEALTHCARE ====================
export const getHealthcare = () => api.get("/healthcare");
export const createHealthcare = (data) => api.post("/healthcare", data);
export const updateHealthcare = (id, data) => api.put(`/healthcare/${id}`, data);
export const deleteHealthcare = (id) => api.delete(`/healthcare/${id}`);

// ==================== EDUCATION ====================
export const getEducation = () => api.get("/education");
export const createEducation = (data) => api.post("/education", data);
export const updateEducation = (id, data) => api.put(`/education/${id}`, data);
export const deleteEducation = (id) => api.delete(`/education/${id}`);

// ==================== ENVIRONMENTAL ====================
export const getEnvironmental = (params) => api.get("/environmental", { params });
export const getEnvironmentalById = (id) => api.get(`/environmental/${id}`);
export const createEnvironmental = (data) => api.post("/environmental", data);
export const updateEnvironmental = (id, data) => api.patch(`/environmental/${id}`, data);
export const deleteEnvironmental = (id) => api.delete(`/environmental/${id}`);

// ==================== GRIEVANCE (Singular) ====================
export const getGrievance = (params) => api.get("/grievance", { params });
export const getGrievanceById = (id) => api.get(`/grievance/${id}`);
export const createGrievance = (data) => api.post("/grievance", data);
export const updateGrievanceStatus = (id, data) => api.put(`/grievance/${id}`, data);

export default api;
