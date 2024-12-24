import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { CompanionProfile } from "./pages/CompanionProfile";
import { CompanionDashboard } from "./pages/companion/Dashboard";
import { AdminDashboard } from "./pages/admin/Dashboard";
import { ProfileSettings } from "@/components/companion/dashboard/ProfileSettings";
import { MediaManager } from "@/components/companion/dashboard/MediaManager";
import { VerificationRequest } from "@/components/companion/dashboard/VerificationRequest";
import { Analytics } from "@/components/companion/dashboard/Analytics";
import { Subscription } from "@/components/companion/dashboard/Subscription";
import VarzeaGrande from "./pages/cities/VarzeaGrande";
import { CitiesDirectory } from "./pages/CitiesDirectory";
import { CompanionRegistrationForm } from "@/components/companion/registration/CompanionRegistrationForm";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/varzea-grande" element={<VarzeaGrande />} />
                  <Route path="/cidades" element={<CitiesDirectory />} />
                  <Route path="/acompanhante/:id" element={<CompanionProfile />} />
                  <Route path="/cadastro-acompanhante" element={<CompanionRegistrationForm />} />
                  <Route path="/painel" element={<CompanionDashboard />}>
                    <Route path="midia" element={<MediaManager />} />
                    <Route path="verificacao" element={<VerificationRequest />} />
                    <Route path="assinatura" element={<Subscription />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="configuracoes" element={<ProfileSettings />} />
                  </Route>
                  <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;