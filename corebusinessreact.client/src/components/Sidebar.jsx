import React from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
} from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import { Link as RouterLink, useParams } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = ({ open, toggleSidebar, isAuthenticated }) => {
    const { id: empresaId } = useParams();
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
                <ListItem disablePadding>
                    <ListItemButton component={RouterLink} to="/" onClick={toggleSidebar}>
                        <ListItemIcon>
                            <HomeRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inicio" />
                    </ListItemButton>
                </ListItem>

                {/* Mostrar opciones distintas según si hay empresa seleccionada */}
                {empresaId ? (
                    <>
                        <ListItem disablePadding>
                            <ListItemButton
                                component={RouterLink}
                                to={`/empresa/${empresaId}`}
                                onClick={toggleSidebar}
                            >
                                <ListItemIcon>
                                    <BusinessRoundedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Empresas" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton
                                component={RouterLink}
                                to={`/empresa/${empresaId}/productos`}
                                onClick={toggleSidebar}
                            >
                                <ListItemIcon>
                                    <ShoppingCartIcon />
                                </ListItemIcon>
                                <ListItemText primary="Productos" />
                            </ListItemButton>
                        </ListItem>
                    </>
                ) : (
                    <ListItem disablePadding>
                        <ListItemButton
                            component={RouterLink}
                            to="/empresas"
                            onClick={toggleSidebar}
                        >
                            <ListItemIcon>
                                <BusinessRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Empresas" />
                        </ListItemButton>
                    </ListItem>
                )}

                {isAuthenticated && (
                    <ListItem disablePadding>
                        <ListItemButton
                            component={RouterLink}
                            to="/perfil"
                            onClick={toggleSidebar}
                        >
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary="Perfil" />
                        </ListItemButton>
                    </ListItem>
                )}

                {!isAuthenticated && (
                    <ListItem disablePadding>
                        <ListItemButton
                            component={RouterLink}
                            to="/login"
                            onClick={toggleSidebar}
                        >
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary="Login" />
                        </ListItemButton>
                    </ListItem>
                )}
            </List>
        </Drawer>
    );
};

export default Sidebar;
