
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./hooks/use-theme";
import { HelmetProvider } from "react-helmet-async";
import React, { StrictMode } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Accommodations from "./pages/Accommodations";
import AccommodationDetail from "./pages/AccommodationDetail";
import ReservationForm from "./pages/ReservationForm";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Blog from "./pages/Blog";
import ClientArea from "./pages/ClientArea";
import RefundPolicy from "./pages/RefundPolicy";
import Terms from "./pages/Terms";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminReservations from "./pages/admin/Reservations";
import AdminClients from "./pages/admin/Clients";
import AdminDocuments from "./pages/admin/Documents";
import AdminCommunication from "./pages/admin/Communication";
import AdminUsers from "./pages/admin/Users";
import AdminFinance from "./pages/admin/Finance";
import AdminAccommodations from "./pages/admin/Accommodations";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light">
          <HelmetProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/accommodations" element={<Accommodations />} />
                  <Route path="/accommodations/:id" element={<AccommodationDetail />} />
                  <Route path="/reservation-form" element={<ReservationForm />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/client-area" element={<ClientArea />} />
                  <Route path="/refund-policy" element={<RefundPolicy />} />
                  <Route path="/terms" element={<Terms />} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="reservations" element={<AdminReservations />} />
                    <Route path="clients" element={<AdminClients />} />
                    <Route path="documents" element={<AdminDocuments />} />
                    <Route path="communication" element={<AdminCommunication />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="finance" element={<AdminFinance />} />
                    <Route path="accommodations" element={<AdminAccommodations />} />
                  </Route>
                  
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </HelmetProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
