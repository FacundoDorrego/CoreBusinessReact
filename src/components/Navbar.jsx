import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar"; // Importar Sidebar

const Navbar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false); // Estado que controla si la Sidebar está abierta

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen); // Alternar el estado de la Sidebar
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" sx={{ mr: 2 }} onClick={toggleSidebar}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        CoreBusiness
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Pasar el estado y la función toggleSidebar a Sidebar */}
            <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
        </>
    );
};

export default Navbar;
