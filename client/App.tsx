import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* Expertise area pages */}
            <Route path="/psicologia" element={<Placeholder />} />
            <Route path="/fonoaudiologia" element={<Placeholder />} />
            <Route path="/terapia-ocupacional" element={<Placeholder />} />
            <Route path="/psicopedagogia" element={<Placeholder />} />
            <Route path="/servico-social" element={<Placeholder />} />
            <Route path="/fisioterapia" element={<Placeholder />} />
            <Route path="/arteterapia" element={<Placeholder />} />
            <Route path="/nutricao" element={<Placeholder />} />
            <Route path="/psiquiatria" element={<Placeholder />} />
            <Route path="/neurologia" element={<Placeholder />} />
            {/* Other pages */}
            <Route path="/servicos" element={<Index />} />
            <Route path="/equipe" element={<Placeholder />} />
            <Route path="/contato" element={<Placeholder />} />
            <Route path="/sobre" element={<Placeholder />} />
            <Route path="/blog" element={<Placeholder />} />
            <Route path="/trabalhe-conosco" element={<Placeholder />} />
            <Route path="/acesso" element={<Placeholder />} />
            <Route path="/privacidade" element={<Placeholder />} />
            <Route path="/termos" element={<Placeholder />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
