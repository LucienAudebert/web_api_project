import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

function Confirm() {
    const navigate = useNavigate();

    // Behavior
    const handleClickGoBack = () => {
        navigate('/products');
    };

    // Display
    return (
        <div className="Confirm">
            <h3>Thank you for your order !</h3>
            <button onClick={handleClickGoBack}>Go back</button>
        </div>
    );
}

export default Confirm;
