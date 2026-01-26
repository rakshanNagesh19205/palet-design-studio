import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PublicOnlyRoute } from "@/components/PublicOnlyRoute";

// Pages
import Landing from "./pages/Landing";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import TemplateSelection from "./pages/create/TemplateSelection";
import StyleSelection from "./pages/create/StyleSelection";
import Studio from "./pages/Studio";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Marketing */}
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            
            {/* Authentication - redirect to dashboard if already logged in */}
            <Route path="/auth/signin" element={
              <PublicOnlyRoute>
                <SignIn />
              </PublicOnlyRoute>
            } />
            <Route path="/auth/signup" element={
              <PublicOnlyRoute>
                <SignUp />
              </PublicOnlyRoute>
            } />
            <Route path="/auth/forgot-password" element={
              <PublicOnlyRoute>
                <ForgotPassword />
              </PublicOnlyRoute>
            } />
            
            {/* Protected: Create Flow */}
            <Route path="/create/template" element={
              <ProtectedRoute>
                <TemplateSelection />
              </ProtectedRoute>
            } />
            <Route path="/create/style" element={
              <ProtectedRoute>
                <StyleSelection />
              </ProtectedRoute>
            } />
            
            {/* Protected: Studio */}
            <Route path="/studio" element={
              <ProtectedRoute>
                <Studio />
              </ProtectedRoute>
            } />
            <Route path="/studio/:projectId" element={
              <ProtectedRoute>
                <Studio />
              </ProtectedRoute>
            } />
            
            {/* Protected: Dashboard */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
