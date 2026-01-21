import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/SideBar/sidebar.tsx";
import React from "react";

export default function App() {
    return (
        <BrowserRouter>
            <div className="layout">
                <Sidebar />
                <div className="content">
                    <Routes>
                        </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}