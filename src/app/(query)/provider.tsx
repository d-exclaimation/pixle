"use client";

import { isbrowser, layout } from "@d-exclaimation/next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 5, // 5 minutes
      staleTime: 1000, // 30 seconds
      enabled: isbrowser(),
    },
  },
});

export default layout(({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
});
