import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import ChatbotWidget from "./components/ChatbotWidget";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { LanguageProvider } from "./contexts/LanguageContext";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import HomePage from "./pages/HomePage";
import MembershipPage from "./pages/MembershipPage";
import NDCPage from "./pages/NDCPage";
import TendersPage from "./pages/TendersPage";

// Root layout route
const rootRoute = createRootRoute({
  component: () => (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <ChatbotWidget />
      </div>
    </LanguageProvider>
  ),
  notFoundComponent: () => (
    <div className="flex flex-col items-center justify-center py-24 text-center px-4">
      <h1 className="text-4xl font-bold text-olive mb-4">404</h1>
      <p className="text-[#555] mb-6">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="px-5 py-2 bg-olive text-white rounded font-semibold hover:bg-olive-dark"
      >
        Back to Home
      </Link>
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
const membershipRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/membership",
  component: MembershipPage,
});
const ndcRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ndc",
  component: NDCPage,
});
const announcementsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/announcements",
  component: AnnouncementsPage,
});
const tendersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tenders",
  component: TendersPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  membershipRoute,
  ndcRoute,
  announcementsRoute,
  tendersRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
