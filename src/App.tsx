import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/SideBar/sidebar.tsx";
import React from "react";
import Dashboard from "./components/Dashboard/dashboard.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <div className="layout">
                <Sidebar />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}