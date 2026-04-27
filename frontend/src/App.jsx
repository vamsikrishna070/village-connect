import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Dashboard from "@/pages/dashboard";
import Job from "@/pages/job";
import JobDetail from "@/pages/job-detail";
import Agriculture from "@/pages/agriculture";
import Healthcare from "@/pages/healthcare";
import Education from "@/pages/education";
import Environmental from "@/pages/environmental";
import EnvironmentalDetail from "@/pages/environmental-detail";
import Grievance from "@/pages/grievance";
import GrievanceDetail from "@/pages/grievance-detail";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/job" element={<ProtectedRoute><Job /></ProtectedRoute>} />
          <Route path="/job/:id" element={<ProtectedRoute><JobDetail /></ProtectedRoute>} />
          <Route path="/agriculture" element={<ProtectedRoute><Agriculture /></ProtectedRoute>} />
          <Route path="/healthcare" element={<ProtectedRoute><Healthcare /></ProtectedRoute>} />
          <Route path="/education" element={<ProtectedRoute><Education /></ProtectedRoute>} />
          <Route path="/environmental" element={<ProtectedRoute><Environmental /></ProtectedRoute>} />
          <Route path="/environmental/:id" element={<ProtectedRoute><EnvironmentalDetail /></ProtectedRoute>} />
          <Route path="/grievance" element={<ProtectedRoute><Grievance /></ProtectedRoute>} />
          <Route path="/grievance/:id" element={<ProtectedRoute><GrievanceDetail /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster richColors position="top-right" />
      </AuthProvider>
    </BrowserRouter>
  );
}
