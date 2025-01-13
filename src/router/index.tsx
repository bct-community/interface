import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Layout } from "../components";
import { Chat, Home, Links, Metrics, Raid, Whitepaper } from "../features";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/raid" element={<Raid />} />
          <Route path="/links" element={<Links />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/metrics" element={<Metrics />} />
          <Route path="/whitepaper" element={<Whitepaper />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
