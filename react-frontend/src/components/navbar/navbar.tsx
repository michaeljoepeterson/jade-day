import { AppBar, Toolbar, IconButton, Typography, Box, Drawer, Divider, List, ListItem, ListItemButton, ListItemText, Button } from '@mui/material'
import { useCallback, useContext, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import AuthModal from '../auth/auth-modal';
import { AuthContext } from '../../contexts/auth.context';
import { INavbarConfig, NavbarConfig } from './navbar-config';
import NavLinks from './nav-links';

/**
 * simple mobile responsive placeholder navbar mainly for demo purposes
 * @returns
 */
const Navbar = ({
    config = NavbarConfig
}: {
    config?: INavbarConfig[]
}) => {
    const {
        loginWithEmail, 
        createUserWithEmail, 
        loginWithGoogle,
        logout,
        authState,
        isLoggedIn
    } = useContext(AuthContext);
    const {loading, user} = authState;
    const isLoading = loading;
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
            setModal(false);
        }
        catch(e){
            console.warn(e);
        }
    }, []);

    const createUser = useCallback(async (email: string, pass: string) => {
        try{
            await createUserWithEmail(email, pass);
            setModal(false);
        }
        catch(e){
            console.warn(e);
        }
    }, [])

    const handleGoogleSignIn = useCallback(async () => {
        try{
            await loginWithGoogle();
            setModal(false);
        }
        catch(e){
            console.warn(e);
        }
    }, []);

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <h6 className="text-lg font-bold p-1">
                Jade Day
            </h6>
            <Divider />
            <div className="flex flex-col">
                <Link
                    className="p-2"
                    to="/"
                >
                    Home
                </Link>
                <NavLinks
                    config={config}
                    user={user}
                    userIsLogged={isLoggedIn()}
                />
            </div>
        </Box>
    );
    
    const drawerWidth = 240;
    const container = window !== undefined ? () => window.document.body : undefined;
    const loginButton = !isLoggedIn() ? 
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
                    className="inline-block sm:hidden"
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <div className="hidden flex-1 sm:block">
                    <Link
                        className="font-bold p-2"
                        to="/"
                    >
                        Jade Day
                    </Link>
                    <NavLinks
                        config={config}
                        user={user}
                        userIsLogged={isLoggedIn()}
                    />
                </div>
                <Box className="hidden sm:block">
                    {isLoading ? null : loginButton}
                </Box>
            </Toolbar>
            <Box component="nav">
                <Drawer
                className='block sm:hidden'
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true
                }}
                sx={{
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

export default Navbar;