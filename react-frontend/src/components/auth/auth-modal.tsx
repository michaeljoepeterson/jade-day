import { Button, DialogContent, DialogTitle, Dialog } from "@mui/material"
import { useState } from "react";
import { CreateUserModal } from "./create-user-modal";
import { LoginModal } from "./login-modal"
type header = 'Login' | 'Create Account';

export const AuthModal = ({
    login,
    createUser,
    modalOpen = false,
    modalClosed
}: {
    login: (email: string, pass: string) => any; 
    createUser: (email: string, pass: string) => any;
    modalOpen?: boolean;
    modalClosed: (isOpen: boolean) => any;
}) => {
    const [email, setEmail] = useState<string | undefined>();
    const [pass, setPass] = useState<string | undefined>();
    const [confirmPass, setConfirmPass] = useState<string | undefined>();
    const [modalHeader, setModalHeader] = useState<header>('Login');
    
    const emailUpdated = (email: string) => setEmail(email);
    const passUpdated = (pass: string) => setPass(pass);
    const confirmPassUpdated = (pass: string) => setConfirmPass(pass);
    
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
                
                <div>
                    <Button onClick={(e) => loginWithEmail()}>Login</Button>
                    <Button onClick={(e) => createNewUser()}>Create Account</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}