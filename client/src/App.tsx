import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import ListingDetails from "@/pages/ListingDetails";
import LandlordDashboard from "@/pages/LandlordDashboard";
import LandlordVerification from "@/pages/LandlordVerification";
import CreateListing from "@/pages/CreateListing";
import Auth from "@/pages/Auth";
import About from "@/pages/About";
import Favorites from "@/pages/Favorites";
import Messages from "@/pages/Messages";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/search" component={Search} />
      <Route path="/listing/:id" component={ListingDetails} />
      <Route path="/landlord" component={LandlordDashboard} />
      <Route path="/landlord/new" component={CreateListing} />
      <Route path="/landlord/verify" component={LandlordVerification} />
      <Route path="/login" component={Auth} />
      <Route path="/register" component={Auth} />
      <Route path="/about" component={About} />
      <Route path="/favorites" component={Favorites} />
      <Route path="/messages" component={Messages} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
