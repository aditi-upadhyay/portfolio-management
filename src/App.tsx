import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/SideBar/sidebar.tsx";
import React from "react";
import Home from "./pages/home.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <div className="layout">
                <Sidebar />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}