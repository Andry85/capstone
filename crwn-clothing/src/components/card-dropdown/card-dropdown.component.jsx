import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { useNavigate } from "react-router-dom";

import Button from '../button/button.component';
import CartItem from '../cart-icon/cart-item/cart-item.component';

import {CartDropdownContainer, EmptyMesage, CartItems} from './card-dropdown.styles';


const CardDropdown = () => {

    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();

    const gotToCheckoutHandler = () => {
        navigate('/checkout');
    }

    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? (cartItems.map(item => <CartItem key={item.id} cartItem={item} />)) : (
                        <EmptyMesage>Your card is empty</EmptyMesage>
                    )
                }

                
            </CartItems>
            <Button onClick={gotToCheckoutHandler}>Go to checkout</Button>
        </CartDropdownContainer>
    );
}


export default CardDropdown;