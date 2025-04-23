// src/components/Layout.jsx
import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet, useParams } from "react-router-dom";
import { useAuth } from "../auth/authContext";

const Layout = () => {
    const { user } = useAuth();
    const { empresaId } = useParams(); // Detecta si estamos dentro de una empresa
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            <Sidebar
                open={sidebarOpen}
                toggleSidebar={toggleSidebar}
                isAuthenticated={!!user}
                empresaId={empresaId}
            />
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <Navbar toggleSidebar={toggleSidebar} />
                <Box sx={{ flexGrow: 1, p: 3, overflow: "auto" }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;
