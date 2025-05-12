
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";
import LoadingScreen from "./components/LoadingScreen";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    // Mark the content as loaded
    const loadContentTimer = setTimeout(() => {
      setContentLoaded(true);
    }, 1000); // Content is considered loaded after 1s
    
    // If you want to ensure a minimum display time for the loading screen
    // even if the content loads faster, use this approach
    const minDisplayTimer = setTimeout(() => {
      if (contentLoaded) {
        setIsLoading(false);
      }
    }, 4000); // Minimum 4 seconds loading time
    
    return () => {
      clearTimeout(loadContentTimer);
      clearTimeout(minDisplayTimer);
    };
  }, [contentLoaded]);

  // When contentLoaded changes, check if we should stop the loading screen
  useEffect(() => {
    if (contentLoaded) {
      // Add a slight delay to ensure smooth transition
      const transitionTimer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);
      
      return () => clearTimeout(transitionTimer);
    }
  }, [contentLoaded]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
        {isLoading ? (
          <LoadingScreen onLoadingComplete={() => setContentLoaded(true)} />
        ) : (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<Products />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
