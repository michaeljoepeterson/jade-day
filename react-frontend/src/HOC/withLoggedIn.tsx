import React, { PropsWithChildren, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";

/**
 * HOC to handle the logged in rules for a page
 * could convert to hook
 * @param Component
 * @returns
 */
const withLoggedIn = (Component: React.FC<PropsWithChildren<any>>) => (props: React.PropsWithChildren) => {
    const {isLoggedIn, loading} = useContext(AuthContext);
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const loggedIn = isLoggedIn();
    let navigate = useNavigate();
    useEffect(() => {
        if(!loggedIn && !loading){
            navigate('/');
        }
        if(!loading){
            setIsChecked(true);
        }
    }, [loggedIn, loading])
    if(loading || !isChecked){
        return (
            <></>
        )
    }

    return (
        <Component {...props}/>
    );
}

export default withLoggedIn;