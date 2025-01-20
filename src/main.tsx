import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import WebFont from "webfontloader";

import App from "./App.tsx";
import "./index.css";

WebFont.load({
  google: {
    families: [
      "Inter:300,400italic,600,700",
      "Roboto Slab:300,400,600,700,900",
      "Chathura:100,200,300,400,600,700",
      "Sour Gummy:700,900",
      "sans-serif",
    ],
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
