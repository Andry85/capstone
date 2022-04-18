import Button from '../button/button.component';
import './card-dropdown.styles.scss';
import CartItem from '../cart-icon/cart-item/cart-item.component';

const CardDropdown = () => {
    return (
        <div className='cart-dropdown-container'>
            <div className="cart-items">
                {[].map(item => <CartItem cartItem={item} />)}
            </div>
            <Button>Go to checkout</Button>
        </div>
    );
}


export default CardDropdown;