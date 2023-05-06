import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import AddItem from "./components/AddItem.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/add" element={<AddItem />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
