import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Feed from "./pages/Feed";
import Marketplace from "./pages/Marketplace";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./pages/AddProduct";
import Transactions from "./pages/Transactions";
import TransactionDetails from "./pages/TransactionDetails";
import Pricing from "./pages/Pricing";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import Team from "./pages/Team";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import SocialImpact from "./pages/SocialImpact";
import OurServices from "./pages/OurServices";
import Technology from "./pages/Technology";
import SuccessStories from "./pages/SuccessStories";
import DashboardLayout from "./components/DashboardLayout";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Checkout from "./pages/Checkout";
import { AuthProvider, ProtectedRoute, PublicRoute } from "./lib/AuthProvider";
import { AgencyRoute, AdminRoute } from "./lib/RouteGuards";
import Data from './pages/Data';
import Messaging from './pages/Messaging';
import CVMaker from './pages/CVMaker';
import Jobs from './pages/Jobs';
import Courses from './pages/Courses';
import JobDetails from './pages/JobDetails';
import Admin from './pages/Admin';
import ChatPage from './pages/ChatPage';
import ApplyJob from './pages/ApplyJob'; // Import the ApplyJob page
import CVAnalyzer from './pages/CVAnalyzer'; // Import the CV Analyzer page

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/team" element={<Team />} />
      <Route path="/social-impact" element={<SocialImpact />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogPost />} />
      <Route path="/services" element={<OurServices />} />
      <Route path="/technology" element={<Technology />} />
      <Route path="/success-stories" element={<SuccessStories />} />
      
      {/* Auth Routes */}
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
      
      {/* Admin Route - only accessible by specific email */}
      <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
      
      {/* Protected Dashboard Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="feed" element={<Feed />} />
        <Route path="data" element={<AgencyRoute><Data /></AgencyRoute>} />
        <Route path="marketplace" element={<Marketplace />} />
        <Route path="marketplace/add-product" element={<AddProduct />} />
        <Route path="marketplace/:id" element={<ProductDetails />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="transactions/:id" element={<TransactionDetails />} />
        <Route path="messaging" element={<Messaging />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="settings" element={<Settings />} />
        <Route path="help" element={<Help />} />
        <Route path="cv-maker" element={<CVMaker />} />
        <Route path="cv-analyzer" element={<CVAnalyzer />} /> {/* Add the CV Analyzer route */}
        <Route path="jobs" element={<Jobs />} />
        <Route path="jobs/:id" element={<JobDetails />} />
        <Route path="jobs/apply/:id" element={<ApplyJob />} /> {/* Add the route for applying to a job */}
        <Route path="courses" element={<Courses />} />
        <Route path="chat" element={<ChatPage />} />
      </Route>
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter; 