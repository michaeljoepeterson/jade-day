import { Button, DialogContent, DialogTitle, Dialog } from "@mui/material"
import { useCallback, useState } from "react";
import { CreateUserModal } from "./create-user-modal";
import { LoginModal } from "./login-modal";
import googleIcon from '../../assets/icons/g-icon.png';
import './styles.css';

type header = 'Login' | 'Create Account';

export const AuthModal = ({
    login,
    createUser,
    modalOpen = false,
    modalClosed,
    googleLogin
}: {
    login: (email: string, pass: string) => any; 
    createUser: (email: string, pass: string) => any;
    modalOpen?: boolean;
    modalClosed: (isOpen: boolean) => any;
    googleLogin: () => any;
}) => {
    const [email, setEmail] = useState<string | undefined>();
    const [pass, setPass] = useState<string | undefined>();
    const [confirmPass, setConfirmPass] = useState<string | undefined>();
    const [modalHeader, setModalHeader] = useState<header>('Login');
    
    const emailUpdated = useCallback((email: string) => setEmail(email), []);
    const passUpdated = useCallback((pass: string) => setPass(pass), []);
    const confirmPassUpdated = useCallback((pass: string) => setConfirmPass(pass), []);
    
    const loginWithEmail = () => {
        if(email && pass && modalHeader === 'Login'){
            login(email, pass);
        }
        else{
            setModalHeader('Login');
        }
    }

    const createNewUser = () => {
        if(email && pass && pass === confirmPass && modalHeader === 'Create Account'){
            createUser(email, pass);
        }
        else{
            setModalHeader('Create Account');
        }
    }

    const closeModal = () => {
        modalClosed(false);
    }

    const handleGoogleLogin = () => {
        try{
            googleLogin();
        }
        catch(e){
            console.warn(e);
        }
    }

    return (
        <Dialog
        open={modalOpen}
        onClose={(e) => closeModal()}>
            <DialogTitle id="alert-dialog-title">
                {modalHeader}
            </DialogTitle>
            <DialogContent>
                {
                modalHeader === 'Login' ? 
                <LoginModal 
                emailUpdated={emailUpdated} 
                passUpdated={passUpdated}/> : 
                <CreateUserModal
                    emailUpdated={emailUpdated} 
                    passUpdated={passUpdated}
                    confirmPassUpdated={confirmPassUpdated}
                />
                }
                <div className="auth-buttons">
                    <Button 
                    variant="outlined"
                    onClick={(e) => loginWithEmail()}
                    sx={{
                        width: "100%"
                    }}>Login</Button>
                    <Button
                    variant="outlined" 
                    onClick={(e) => handleGoogleLogin()}
                    sx={{
                        width: "100%"
                    }}>
                        <img
                        className="google-image"
                        src={googleIcon} 
                        alt="google icon"/>
                        Google Sign In
                    </Button>
                    <Button
                    variant="outlined" 
                    onClick={(e) => createNewUser()}
                    sx={{
                        width: "100%"
                    }}>Create Account</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}