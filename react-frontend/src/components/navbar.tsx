import { AppBar, Toolbar, IconButton, Typography, Box, Drawer, Divider, List, ListItem, ListItemButton, ListItemText, Button, Dialog } from '@mui/material'
import { useCallback, useContext, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { AuthModal } from './auth/auth-modal';
import { useSelector } from 'react-redux';
import { selectAuthLoading, selectIsLoggedIn } from '../auth/state/auth-slice';
import { AuthContext } from '../auth/auth.context';

/**
 * simple mobile responsive placeholder navbar mainly for demo purposes
 * @returns
 */
export const Navbar = () => {
    const {
        loginWithEmail, 
        createUserWithEmail, 
        loginWithGoogle,
        logout
    } = useContext(AuthContext);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const isLoading = useSelector(selectAuthLoading);
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const setModal = (open: boolean) => {
        setModalOpen(open);
    }

    const handleLogout = () => {
        logout();
        setModal(false);
    }

    const loginEmail = useCallback(async (email: string, pass: string) => {
        try{
            await loginWithEmail(email, pass);
        }
        catch(e){
            console.warn(e);
        }
    }, []);

    const createUser = useCallback(async (email: string, pass: string) => {
        try{
            await createUserWithEmail(email, pass);
        }
        catch(e){
            console.warn(e);
        }
    }, [])

    const handleGoogleSignIn = useCallback(async () => {
        try{
            await loginWithGoogle();
        }
        catch(e){
            console.warn(e);
        }
    }, []);

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ my: 2 }}>
            Jade Day
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
    const loginButton = !isLoggedIn ? 
    (<Button 
    variant="contained" 
    color="secondary"
    onClick={(e) => setModal(true)}>
        Login
    </Button>) : 
    (<Button 
    variant="contained" 
    color="secondary"
    onClick={(e) => handleLogout()}>
        Logout
    </Button>);
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
                Jade Day
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Link 
                className="nav-link-button" to={'/'}>
                    Home
                </Link>
                {isLoading ? null : loginButton}
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
            <AuthModal 
            createUser={createUser} 
            login={loginEmail}
            modalOpen={modalOpen}
            modalClosed={(isOpen: boolean) => setModal(false)}
            googleLogin={handleGoogleSignIn}/>
        </AppBar>
    )
}
