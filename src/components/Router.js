import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Create from "./Pages/CreatePage"; // Ensure proper casing
import Detail from "./Pages/DetailPage"; // Ensure proper casing
import ListPage from "./Pages/ListPage";
import Update from "./Pages/UpdatePage"; // Ensure proper casing
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 기본 경로를 /list로 리다이렉트 */}
        <Route path="/" element={<Navigate to="/list" />} />
        
        {/* 라우트 설정 */}
        <Route path="/list" element={<ListPage />} />
        <Route path="/create" element={<Create />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}
