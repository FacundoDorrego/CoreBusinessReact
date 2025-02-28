import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import ExitonApp from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = ({ open, toggleSidebar }) => {
    return (
        <Drawer
            variant="temporary"
            open={open}
            onClose={toggleSidebar} // Cierra el sidebar cuando haces clic fuera
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
                {/* Cuando se hace clic en un ListItem, se cierra el Sidebar */}
                <ListItem button component={Link} to="/" onClick={toggleSidebar}>
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary="Inicio" />
                </ListItem>
                <ListItem button component={Link} to="/login" onClick={toggleSidebar}>
                    <ListItemIcon><ExitonApp/></ListItemIcon>
                    <ListItemText primary="Login" />
                </ListItem>
                <ListItem button component={Link} to="/productos" onClick={toggleSidebar}>
                    <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
                    <ListItemText primary="Productos" />
                </ListItem>
                <ListItem button component={Link} to="/perfil" onClick={toggleSidebar}>
                    <ListItemIcon><PersonIcon /></ListItemIcon>
                    <ListItemText primary="Perfil" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;
