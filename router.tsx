import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultPreload: "intent",
    // Show route skeletons quickly, but keep them on screen long enough
    // that fast navigations don't flicker.
    defaultPendingMs: 150,
    defaultPendingMinMs: 400,
  });

  return router;
};
