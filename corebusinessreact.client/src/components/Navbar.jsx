import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = ({ toggleSidebar }) => {
    return (
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
    );
};

export default Navbar;
