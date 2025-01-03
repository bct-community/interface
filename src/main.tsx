import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import WebFont from "webfontloader";

WebFont.load({
  google: {
    families: [
      "Inter:300,400,600,700",
      "Roboto Slab:300,400,600,700,900",
      "Chathura:100,200,300,400,600,700",
      "sans-serif",
    ],
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
