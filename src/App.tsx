import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LandingPage from "./pages/LandingPage";
import OnboardingPage from "./pages/OnboardingPage";
import MapPage from "./pages/MapPage";
import ChatsPage from "./pages/ChatsPage";
import EventsPage from "./pages/EventsPage";
import ProfilePage from "./pages/ProfilePage";
import AdminEventsPage from "./pages/AdminEventsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/chats" element={<ChatsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin/events" element={<AdminEventsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
