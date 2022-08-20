import { TextField } from "@mui/material";
import { FormEvent } from "react"

const LoginModal = ({
    emailUpdated,
    passUpdated
}: {emailUpdated: (email: string) => any, passUpdated: (email: string) => any}) => {
    

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

    return (
        <div>
            <form className="flex-form" onSubmit={(e) => handleSubmit(e)}>
                <TextField 
                type="email" 
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
            </form>
        </div>
    )
}

export default LoginModal