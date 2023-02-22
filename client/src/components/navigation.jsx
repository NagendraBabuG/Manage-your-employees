import  {Fragment, useContext} from "react"
import {Link, Outlet} from "react-router-dom"
import { UserContext } from "../contexts/userContext"
import { signOutUser } from "../utils/firebase"
import { useCookies } from "react-cookie"
const Navigation = () => {
    const {currentUser, setCurrentUser} = useContext(UserContext)
    const [removeCookie] = useCookies(["user"])
    console.log(currentUser)
    const signOutHandler = async ()=> {
        await signOutUser();
        removeCookie("user")
        setCurrentUser(null);
    }
    return (
        <Fragment>
            <div className="navigation-class">
                <Link className = "home-container" to = '/'>
                   <div> Home </div> 
                </Link>
               {!currentUser&&
                <Link className="signup-container" to= '/signup'>
                    <div> Signup </div>
                </Link>}

                <Link className="about-container" to = '/about'>
                   <div> About </div> 
                </Link>
                {
                    currentUser ? (<Link className="nav-link" onClick={signOutHandler}>Sign Out</Link>) :  (<Link className="signin-container" to = '/signin'> Sign In </Link>)

        
                }

            </div>
                
            <Outlet/>
        </Fragment>
    )
}
export default Navigation