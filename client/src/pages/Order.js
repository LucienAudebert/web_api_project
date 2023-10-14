import React from 'react';
import DisplayCart from '../components/DisplayCart';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Order() {
    // State
    const [product, setProduct] = React.useState(null);
    const [cartContent, setCart] = React.useState(JSON.parse(localStorage.getItem('cartContent'))); // initializing with what is in local storage
    const [error, setError] = React.useState('');
    const navigate = useNavigate();

    // Behavior
    const handleClickCancel = () => {
        navigate('/products');
    };

    const handleClickConfirm = () => {
        // Can't confirm an order if we are not logged in with an email, return to Login page
        if (JSON.parse(localStorage.getItem('email')) === null) {
            navigate('/');
            return;
        }

        axios
            .post('http://127.0.0.1:3000/api/order', {
                cart: cartContent,
                email: JSON.parse(localStorage.getItem('email'))
            })
            .then((res) => {
                if (res.data === 'Order is stored in database') {
                    localStorage.removeItem('cartContent');
                    setCart({});
                    navigate('/confirm');
                } else {
                    setError(res.data);
                }
            })
            .catch((err) => {
                setError(err);
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
            <button onClick={handleClickCancel}>Go Back</button>
            <br />
            <button onClick={handleClickConfirm}>Confirm your cart</button>
            <div className="Error"> {error && <p>Error : {error.message}</p>} </div>
        </div>
    );
}

export default Order;
