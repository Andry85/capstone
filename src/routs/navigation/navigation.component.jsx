import { Fragment, useContext } from 'react';
import {Outlet} from 'react-router-dom';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CardDropdown from '../../components/card-dropdown/card-dropdown.component';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import {UserContext} from "../../contexts/users.context";
import {signOutUser} from '../../utils/firebase/firebase.utils';
import {CartContext} from "../../contexts/cart.context";

import {NavigationContainer, LogoContainer, NavLinksContainer, NavLink} from './navigation.styles';

const Navigation = () => {

    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);
   
   
    return (
      <Fragment>
        <NavigationContainer>
            <LogoContainer to="/">
                <div><CrwnLogo/></div>
            </LogoContainer>
            <NavLinksContainer>
                <NavLink to="/shop">
                    Shop
                </NavLink>
                {currentUser ? 
                    (<NavLink as="span" onClick={signOutUser}>Sign Out</NavLink>)
                    : (
                        <NavLink to="/auth">
                            Sign In
                        </NavLink>
                    )
                }
                <CartIcon/>
            </NavLinksContainer>
            {isCartOpen && <CardDropdown/>}    
        </NavigationContainer>
        <Outlet/>
      </Fragment>
    );
  }


  export default Navigation;