import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./protectedRoutes";
import Login from "../views/Auth/Login";
import Signup from "../views/Auth/Signup";
import LawyerLayout from "../views/Lawyer/LawyerLayout";
import LawyerDashboard from "../views/Lawyer/LawyerDashboard";
import CasesView from "../views/Lawyer/CasesView";
import LandingPage from "../views/LandingPage";
import LawyersSection from "../views/Clients/LawyersSection";
import ServicesPage from "../views/Clients/ServicesPage";
import ServiceDetailPage from "../views/Clients/ServiceDetailPage";
import ContactUs from "../views/Clients/ContactUs";
// ✅ New Client Layout and Views
import ClientLayout from "../components/Layout/ClientLayout";
import ClientDashboard from "../views/Clients/ClientDashboard";
import AddCase from "../views/Clients/AddCase";
import NotificationSettings from "../views/Clients/NotificationSettings";
import PersonalInfo from "../views/Clients/PersonalInfo";
import SchedulingView from "../views/Lawyer/SchedulingView";
import NotificationView from "../views/Lawyer/NotificationView";
import ProfileSettingsView from "../views/Lawyer/ProfileSettingsView";
import OAuthSuccess from "../views/Auth/OAuthSuccess";
import AboutPage from "../views/Clients/AboutPage";
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/oauth-success" element={<OAuthSuccess />} />
      <Route path="/" element={<LandingPage />} />
    
      {/* Protected Routes for Lawyer */}
      <Route element={<ProtectedRoutes allowedRoles={["lawyer"]} />}>
      <Route path="/lawyer" element={<LawyerLayout />}>
        <Route path="dashboard" element={<LawyerDashboard />} />
        <Route path="cases" element={<CasesView />} />
        <Route path="calendar" element={<SchedulingView />} />
        <Route path="notifications" element={<NotificationView />} />
        <Route path="profile" element={<ProfileSettingsView />} />


        {/* <Route path="/lawyer/cases" element={<Cases />} /> */}
        </Route>
      </Route>

      {/* Protected Routes for Client */}
      <Route element={<ProtectedRoutes allowedRoles={["client"]} />}>
        <Route path="/lawyers" element={<LawyersSection />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services/:serviceName" element={<ServiceDetailPage />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* ✅ Client Profile Area with Sidebar Layout */}
        <Route path="/client" element={<ClientLayout />}>
          <Route path="dashboard" element={<ClientDashboard />} />
          <Route path="add-case" element={<AddCase />} />
          <Route path="notifications" element={<NotificationSettings />} />
          <Route path="profile" element={<PersonalInfo />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
