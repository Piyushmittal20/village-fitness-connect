import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/AppLayout";
import NotFound from "@/pages/not-found";

import Home from "@/pages/home";
import TrainersList from "@/pages/trainers/index";
import TrainerDetail from "@/pages/trainers/[id]";
import RoutinesList from "@/pages/routines/index";
import RoutineDetail from "@/pages/routines/[id]";
import DietPlansList from "@/pages/diet-plans/index";
import DietPlanDetail from "@/pages/diet-plans/[id]";
import ProgressDashboard from "@/pages/progress";
import PlatformDashboard from "@/pages/dashboard";

const queryClient = new QueryClient();

function Router() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/trainers" component={TrainersList} />
        <Route path="/trainers/:id" component={TrainerDetail} />
        <Route path="/routines" component={RoutinesList} />
        <Route path="/routines/:id" component={RoutineDetail} />
        <Route path="/diet-plans" component={DietPlansList} />
        <Route path="/diet-plans/:id" component={DietPlanDetail} />
        <Route path="/progress" component={ProgressDashboard} />
        <Route path="/dashboard" component={PlatformDashboard} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
