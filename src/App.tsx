import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider } from "./providers/theme";
import { Router } from "./router";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
