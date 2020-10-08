import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import CheckoutStripeButton from '../../components/stripe-button/stripe-button.component';

import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';

import './checkout.styles.scss';

const CheckoutPage = ({cartItems, total}) =>(
    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='header-block'>
                <span> Product </span>
            </div>
            <div className='header-block'>
                <span> Descrition </span>
            </div>
            <div className='header-block'>
                <span> Quantity </span>
            </div>
            <div className='header-block'>
                <span> Price </span>
            </div>
            <div className='header-block'>
                <span> Remove </span>
            </div>
        </div>
        {
            cartItems.map(cartItem => (
                <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
            ))
        }

        <div className='total'>
             <span>TOTAL: ${total}</span>
             <div className='test-warning'>
                 <p>
                 *Please use the following credit card for payment*
                 4242 4242 4242 4242 - Exp: Any/Future CVV: 123
                 </p>
                
             </div>

        </div>
        <div className='button'>
            <CheckoutStripeButton price={total} />
        </div>
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems, 
    total: selectCartTotal
})

export default connect(mapStateToProps)(CheckoutPage);