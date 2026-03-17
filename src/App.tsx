import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { DealerProvider } from "@/contexts/DealerContext";
import Index from "./pages/Index";
import WaterQuality from "./pages/WaterQuality";
import TestDetail from "./pages/TestDetail";
import ScamAlerts from "./pages/ScamAlerts";
import ScheduleTest from "./pages/ScheduleTest";
import StatePage from "./pages/StatePage";
import CityPage from "./pages/CityPage";
import CompanyPage from "./pages/CompanyPage";
import ServiceCityPage from "./pages/ServiceCityPage";
import BestOfPage from "./pages/BestOfPage";
import WaterQualityReport from "./pages/WaterQualityReport";
import WaterProblemPage from "./pages/WaterProblemPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <DealerProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/water-quality/:zip" element={<WaterQuality />} />
              <Route path="/tests/:testId" element={<TestDetail />} />
              <Route path="/scam-alerts" element={<ScamAlerts />} />
              <Route path="/water-treatment/:state" element={<StatePage />} />
              <Route path="/water-treatment/:state/:city" element={<CityPage />} />
              <Route path="/water-treatment/:state/:city/services/:service" element={<ServiceCityPage />} />
              <Route path="/water-treatment/:state/:city/:company" element={<CompanyPage />} />
              <Route path="/best-water-treatment/:state/:city" element={<BestOfPage />} />
              <Route path="/water-quality/:city" element={<WaterQualityReport />} />
              <Route path="/water-problems/:state/:city/:problem" element={<WaterProblemPage />} />
              <Route path="/schedule-test" element={<ScheduleTest />} />
              <Route path="/water-testing" element={<Navigate to="/schedule-test" replace />} />
              <Route path="/filters" element={<Navigate to="/" replace />} />
              <Route path="/privacy" element={<Navigate to="/" replace />} />
              <Route path="/terms" element={<Navigate to="/" replace />} />
              <Route path="/contact" element={<Navigate to="/" replace />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </DealerProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
