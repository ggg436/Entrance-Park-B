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
import { FarmerRoute } from "./lib/RouteGuards";
import Data from './pages/Data';
import Messaging from './pages/Messaging';
import CVMaker from './pages/CVMaker';

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
      
      {/* Protected Dashboard Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="feed" element={<Feed />} />
        <Route path="data" element={<FarmerRoute><Data /></FarmerRoute>} />
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
      </Route>
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter; 