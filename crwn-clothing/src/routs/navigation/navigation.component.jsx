import { Fragment, useContext } from 'react';
import {Outlet, Link} from 'react-router-dom';
import './navigation.styles.scss';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CardDropdown from '../../components/card-dropdown/card-dropdown.component';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import {UserContext} from "../../contexts/users.context";
import {signOutUser} from '../../utils/firebase/firebase.utils';

const Navigation = () => {

    const {currentUser} = useContext(UserContext);
   
   
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
                    (<span onClick={signOutUser} className="nav-link">Sign Out</span>)
                    : (
                        <Link className="nav-link" to="/auth">
                            Sign In
                        </Link>
                    )
                }
                <CartIcon/>
            </div>
            <CardDropdown/>
        </div>
        <Outlet/>
      </Fragment>
    );
  }


  export default Navigation;