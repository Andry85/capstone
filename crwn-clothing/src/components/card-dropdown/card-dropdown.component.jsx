import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { useNavigate } from "react-router-dom";

import Button from '../button/button.component';
import './card-dropdown.styles.scss';
import CartItem from '../cart-icon/cart-item/cart-item.component';


const CardDropdown = () => {

    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();

    const gotToCheckoutHandler = () => {
        navigate('/checkout');
    }

    return (
        <div className='cart-dropdown-container'>
            <div className="cart-items">
                {cartItems.map(item => <CartItem key={item.id} cartItem={item} />)}
            </div>
            <Button onClick={gotToCheckoutHandler}>Go to checkout</Button>
        </div>
    );
}


export default CardDropdown;