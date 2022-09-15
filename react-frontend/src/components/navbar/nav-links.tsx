import { Link } from "react-router-dom";
import { IUser } from "../../models/user";
import { INavbarConfig } from "./navbar-config";

const NavLinks = ({
    config,
    user,
    userIsLogged
}: {
    config: INavbarConfig[];
    user?: IUser | null;
    userIsLogged: boolean;
}) => {
    return (
        <>
            {
                config.map(navConfig => {
                    const {role, loggedIn, linkUrl, displayName} = navConfig;
                    if((role || role === 0) && user?.role === role){
                        return (
                            <Link
                                className='p-2'
                                to={linkUrl}
                            >
                                {displayName}
                            </Link>
                        );
                    }
                    else if(loggedIn && userIsLogged){
                        return (
                            <Link
                                className='p-2'
                                to={linkUrl}
                            >
                                {displayName}
                            </Link>
                        );
                    }
                    else if(!loggedIn && (!role && role !== 0)){
                        return (
                            <Link
                                className='p-2'
                                to={linkUrl}
                            >
                                {displayName}
                            </Link>
                        );
                    }
                })
            }
        </>
    );
}

export default NavLinks;