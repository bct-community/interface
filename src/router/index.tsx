import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Layout } from "../components";
import { Chat, Home, Links, News } from "../features";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/links" element={<Links />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
