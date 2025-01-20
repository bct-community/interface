import { Globals } from "@react-spring/web";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider } from "./providers/theme";
import { Router } from "./router";

const queryClient = new QueryClient();

function App() {
  // solve bug on @react-spring generated after installing @react-three
  Globals.assign({
    frameLoop: "always",
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
