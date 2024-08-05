import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/home/Home";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Jobs from "./components/job/Jobs";
import Browse from "./components/browse/Browse";
import Profile from "./components/profile/Profile";
import JobDescription from "./components/job/jobDescripiton/JobDescription";
import Companies from "./components/admin/companies/Companies";
import CompanyCreate from "./components/admin/companyCreate/CompanyCreate";
import CompanySetup from "./components/admin/companySetup/CompanySetup";

import AdminJob from "./components/admin/adminJob/job/AdminJob";
import PostJob from "./components/admin/adminJob/PostJob/PostJob";
import Applicants from "./components/admin/applicant/Applicants";
import ProtectedRoute from "./components/admin/ProtectedRoute";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/job" element={<Jobs />} />
          <Route path="/description/:id" element={<JobDescription />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/profile" element={<Profile />} />

          {/* for admin  */}
          <Route
            path="/admin/companies"
            element={
              <ProtectedRoute>
                <Companies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/companies/create"
            element={
              <ProtectedRoute>
                <CompanyCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/companies/:id"
            element={
              <ProtectedRoute>
                <CompanySetup />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/jobs"
            element={
              <ProtectedRoute>
                {" "}
                <AdminJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/jobs/create"
            element={
              <ProtectedRoute>
                <PostJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/jobs/:id/applicants"
            element={
              <ProtectedRoute>
                <Applicants />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
