// src/components/Sidebar.jsx
import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = ({ open, toggleSidebar, isAuthenticated }) => {
    return (
        <Drawer
            variant="temporary"
            open={open}
            onClose={toggleSidebar}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                },
            }}
        >
            <Toolbar />
            <List>
                <ListItem button component={Link} to="/" onClick={toggleSidebar}>
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary="Inicio" />
                </ListItem>

                {!isAuthenticated && (
                    <ListItem button component={Link} to="/login" onClick={toggleSidebar}>
                        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                        <ListItemText primary="Login" />
                    </ListItem>
                )}

                <ListItem button component={Link} to="/productos" onClick={toggleSidebar}>
                    <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
                    <ListItemText primary="Productos" />
                </ListItem>

                {isAuthenticated && (
                    <ListItem button component={Link} to="/perfil" onClick={toggleSidebar}>
                        <ListItemIcon><PersonIcon /></ListItemIcon>
                        <ListItemText primary="Perfil" />
                    </ListItem>
                )}
            </List>
        </Drawer>
    );
};

export default Sidebar;
