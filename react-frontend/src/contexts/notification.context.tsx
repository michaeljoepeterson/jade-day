import { IconButton, Snackbar, snackbarClasses } from "@mui/material";
import { createContext, PropsWithChildren, useCallback, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

export interface INotificationContext{
    openSnackBar: (message: string) => void
};

export const NotificationContext = createContext({} as INotificationContext);

export const NotificationProvider = ({children}: PropsWithChildren) => {
    const [open, setOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);

    const openSnackBar = useCallback((message: string) => {
        setMessage(message);
        setOpen(true);
    }, []);

    const handleSnackBarClosed = () => {
        setMessage(null);
        setOpen(false);
    }

    return (
        <NotificationContext.Provider
        value={{
            openSnackBar
        }}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleSnackBarClosed}
                message={message}
                action={
                    (
                    <>
                        <IconButton
                            className="text-secondary"
                            size="small"
                            aria-label="close"
                            onClick={handleSnackBarClosed}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </>
                    )
                }
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
            />
        </NotificationContext.Provider>
    )
} 