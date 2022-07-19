import { AppBar, Toolbar, IconButton, Typography, Box, Drawer, Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

/**
 * simple mobile responsive placeholder navbar mainly for demo purposes
 * @returns
 */
export const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ my: 2 }}>
            Job Reviews
          </Typography>
          <Divider />
          <List>
                <ListItem disablePadding>
                    <ListItemButton style={{justifyContent: 'center'}}>
                        <Link className="nav-link-mobile-button" to="/">
                            <ListItemText primary={'Home'}/>
                        </Link>
                    </ListItemButton>
                </ListItem>
          </List>
        </Box>
    );
    
    const drawerWidth = 240;
    const container = window !== undefined ? () => window.document.body : undefined;

    return (
        <AppBar component="nav">
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
            >
                <MenuIcon />
            </IconButton>
            <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
                Job Reviews
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Link className="nav-link-button" to={'/'}>
                    Home
                </Link>
            </Box>
            </Toolbar>
            <Box component="nav">
                <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                >
                {drawer}
                </Drawer>
             </Box>
        </AppBar>
    )
}
