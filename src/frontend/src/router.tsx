import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import React from "react";
import { Layout } from "./components/Layout";

// Lazy page imports for code splitting
const HomePage = () =>
  import("./pages/Home").then((m) => ({ default: m.HomePage }));
const PropertyDetailPage = () =>
  import("./pages/PropertyDetail").then((m) => ({
    default: m.PropertyDetailPage,
  }));
const AdminDashboardPage = () =>
  import("./pages/AdminDashboard").then((m) => ({
    default: m.AdminDashboardPage,
  }));
const AdminPropertyNewPage = () =>
  import("./pages/AdminPropertyNew").then((m) => ({
    default: m.AdminPropertyNewPage,
  }));
const AdminPropertyEditPage = () =>
  import("./pages/AdminPropertyEdit").then((m) => ({
    default: m.AdminPropertyEditPage,
  }));
const BuilderPartnersPage = () =>
  import("./pages/BuilderPartnersPage").then((m) => ({
    default: m.BuilderPartnersPage,
  }));
const AdminPartnersPage = () =>
  import("./pages/AdminPartnersPage").then((m) => ({
    default: m.AdminPartnersPage,
  }));

// Root route with layout
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

function PageLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

// Public routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => {
    const LazyHome = React.lazy(HomePage);
    return (
      <React.Suspense fallback={<PageLoader />}>
        <LazyHome />
      </React.Suspense>
    );
  },
});

const propertyDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/property/$id",
  component: () => {
    const LazyDetail = React.lazy(PropertyDetailPage);
    return (
      <React.Suspense fallback={<PageLoader />}>
        <LazyDetail />
      </React.Suspense>
    );
  },
});

// Admin routes
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => {
    const LazyAdmin = React.lazy(AdminDashboardPage);
    return (
      <React.Suspense fallback={<PageLoader />}>
        <LazyAdmin />
      </React.Suspense>
    );
  },
});

const adminPropertyNewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/property/new",
  component: () => {
    const LazyNew = React.lazy(AdminPropertyNewPage);
    return (
      <React.Suspense fallback={<PageLoader />}>
        <LazyNew />
      </React.Suspense>
    );
  },
});

const adminPropertyEditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/property/$id/edit",
  component: () => {
    const LazyEdit = React.lazy(AdminPropertyEditPage);
    return (
      <React.Suspense fallback={<PageLoader />}>
        <LazyEdit />
      </React.Suspense>
    );
  },
});

const partnersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/partners",
  component: () => {
    const LazyPartners = React.lazy(BuilderPartnersPage);
    return (
      <React.Suspense fallback={<PageLoader />}>
        <LazyPartners />
      </React.Suspense>
    );
  },
});

const adminPartnersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/partners",
  component: () => {
    const LazyAdminPartners = React.lazy(AdminPartnersPage);
    return (
      <React.Suspense fallback={<PageLoader />}>
        <LazyAdminPartners />
      </React.Suspense>
    );
  },
});

// 404 Not Found page
function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-6xl font-bold text-foreground mb-4">
        404
      </h1>
      <p className="text-lg text-muted-foreground mb-6">Page not found</p>
      <a
        href="/"
        className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        Go Home
      </a>
    </div>
  );
}

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: NotFoundPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  propertyDetailRoute,
  adminRoute,
  adminPropertyNewRoute,
  adminPropertyEditRoute,
  partnersRoute,
  adminPartnersRoute,
  notFoundRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
