import "./styles.global.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { withDashboard } from "@wix/dashboard-react";
import { WixDesignSystemProvider } from "@wix/design-system";
import "@wix/design-system/styles.global.css";
import React from "react";

const queryClient = new QueryClient();

export default function withLayout(Component: React.FC) {
  return withDashboard(function Layout() {
    return (
      <WixDesignSystemProvider>
        <QueryClientProvider client={queryClient}>
          <Component />
        </QueryClientProvider>
      </WixDesignSystemProvider>
    );
  });
}
