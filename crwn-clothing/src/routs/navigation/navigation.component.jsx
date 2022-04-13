import { Fragment, useContext } from 'react';
import {Outlet, Link} from 'react-router-dom';
import './navigation.styles.scss';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import {UserContext} from "../../contexts/users.context";
import {signOutUser} from '../../utils/firebase/firebase.utils';

const Navigation = () => {

    const {currentUser, setCurrentUser} = useContext(UserContext);
    console.log(currentUser);

    const singOutHandler = async () => {
        const res = await signOutUser();
        console.log(res);
        setCurrentUser(null);
    }
   

    return (
      <Fragment>
        <div className="navigation">
            <Link className="logo-container" to="/">
                <div><CrwnLogo/></div>
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" to="/shop">
                    Shop
                </Link>
                {currentUser ? 
                    (<span onClick={singOutHandler} className="nav-link">Sign Out</span>)
                    : (
                        <Link className="nav-link" to="/auth">
                            Sign In
                        </Link>
                    )
                }
                
            </div>
        </div>
        <Outlet/>
      </Fragment>
    );
  }


  export default Navigation;