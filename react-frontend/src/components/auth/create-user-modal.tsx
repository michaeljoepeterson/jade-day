import { Button, TextField } from "@mui/material";
import { FormEvent, useState } from "react"

const CreateUserModal = ({
    emailUpdated,
    passUpdated,
    confirmPassUpdated
}: {emailUpdated: (email: string) => any, passUpdated: (pass: string) => any, confirmPassUpdated: (pass: string) => any}) => {


    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
    }

    const updateEmail = (event: any) => {
        const value = event?.target?.value;
        emailUpdated(value);
    }

    const updatePass = (event: any) => {
        const value = event?.target?.value;
        passUpdated(value);
    }

    const updateConfirmPass = (event: any) => {
        const value = event?.target?.value;
        confirmPassUpdated(value);
    }

    return (
        <div>
            <form className="flex-form" onSubmit={(e) => handleSubmit(e)}>
                <TextField 
                type="text" 
                onChange={(e) => updateEmail(e)} 
                label="Email" 
                variant="outlined" 
                required/>
                <TextField 
                type="password" 
                onChange={(e) => updatePass(e)}
                label="Password" 
                variant="outlined" 
                required/>
                <TextField 
                type="password" 
                onChange={(e) => updateConfirmPass(e)}
                label="Password" 
                variant="outlined" 
                required/>
            </form>
        </div>
    )
}

export default CreateUserModal;