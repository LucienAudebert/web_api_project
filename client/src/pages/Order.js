import React from 'react';
import DisplayCart from '../components/DisplayCart';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';

function Order() {
    // State
    const [product, setProduct] = React.useState(null);
    const [cartContent, setCart] = React.useState(JSON.parse(localStorage.getItem('cartContent'))); // initializing with what is in local storage
    const navigate = useNavigate();

    // Behavior
    // Redirecting on home page after clicking on button 'cancel'
    const handleClick = () => {
        navigate('/');
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
            <br />
            <Form cart={cartContent} />
            <br />
            <button onClick={handleClick}>Cancel</button>
        </div>
    );
}

export default Order;
