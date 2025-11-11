import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import CreateOrder from "./pages/CreateOrder";
import Profile from "./pages/Profile";
import Exchange from "./pages/Exchange";
import Chat from "./pages/Chat";
import ChatWebSocket from "./pages/ChatWebSocket";
import Reviews from "./pages/Reviews";
import BuyTokens from "./pages/BuyTokens";
import Admin from "./pages/Admin";
import Notifications from "./pages/Notifications";
import Reports from "./pages/Reports";
import Support from "./pages/Support";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/marketplace" component={Marketplace} />
      <Route path="/create-order" component={CreateOrder} />
      <Route path="/profile" component={Profile} />
      <Route path="/exchange" component={Exchange} />
      <Route path="/chat" component={Chat} />
      <Route path="/chat-websocket" component={ChatWebSocket} />
      <Route path="/reviews" component={Reviews} />
      <Route path="/buy-tokens" component={BuyTokens} />
      <Route path="/admin" component={Admin} />
      <Route path="/notifications" component={Notifications} />
      <Route path="/reports" component={Reports} />
      <Route path="/support" component={Support} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
