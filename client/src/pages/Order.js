import React from 'react';
import DisplayCart from '../components/DisplayCart';
import '../index.css';
import { useNavigate } from 'react-router-dom';

function Order() {
    // State
    const [product, setProduct] = React.useState(null);
    const [cartContent, setCart] = React.useState(JSON.parse(localStorage.getItem('cartContent'))); // initializing with what is in local storage
    const navigate = useNavigate();

    // Behavior
    const handleClickCancel = () => {
        navigate('/products');
    };

    const handleClickConfirm = () => {
        fetch('/api/order', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cart: cartContent,
                email: JSON.parse(localStorage.getItem('email'))
            })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('HTTP Error ' + response.status);
                }
                return response.json();
            })
            .then((data) => {
                if (data === 'Cart is valid') {
                    localStorage.removeItem('cartContent');
                    setCart({});
                    navigate('/confirm');
                }
            })
            .catch((error) => {
                console.error('Error :', error);
            });
    };

    // Display
    return (
        <div>
            <div className="Order">
                <h3>This is the Order page.</h3>
            </div>
            <div className="Cart">
                <DisplayCart cart={cartContent} setCart={setCart} product={product} setProduct={setProduct} />
            </div>
            <button onClick={handleClickCancel}>Cancel</button>
            <br />
            <button onClick={handleClickConfirm}>Confirm your cart</button>
        </div>
    );
}

export default Order;
