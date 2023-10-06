import React from 'react';
import DisplayCart from '../components/DisplayCart';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';

function Order() {
    const [product, setProduct] = React.useState(null);
    const [cartContent, setCart] = React.useState({});

    React.useEffect(() => {
        try {
            const cartContent = JSON.parse(localStorage.getItem('cartContent'));
            if (cartContent) {
                setCart(cartContent);
            }
        } catch (error) {
            alert(error);
        }

        fetch('/api')
            .then((res) => res.json())
            .then((products) => {
                try {
                    const cartContent = JSON.parse(localStorage.getItem('cartContent'));
                    const productsCopy = products.slice();
                    for (let i = 0; i < productsCopy.length; i++) {
                        if (productsCopy[i].name in cartContent) {
                            productsCopy[i].quantity -= cartContent[productsCopy[i].name].quantity;
                        }
                    }

                    setProduct(productsCopy);
                    return products;
                } catch (error) {
                    alert(error);
                    return products;
                }
            })
            .then((products) => setProduct(products));
    }, []);

    React.useEffect(() => {
        localStorage.setItem('cartContent', JSON.stringify(cartContent));
    }, [cartContent]);

    // Behavior
    const navigate = useNavigate();
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
