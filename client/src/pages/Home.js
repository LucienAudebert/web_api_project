import React from 'react';
import DisplayProduct from '../components/DisplayProduct';
import DisplayCart from '../components/DisplayCart';
import { useNavigate } from 'react-router-dom';
import '../index.css';

function Home() {
    // State
    const [product, setProduct] = React.useState(null);
    const [cartContent, setCart] = React.useState(JSON.parse(localStorage.getItem('cartContent'))); // initializing with what is in local storage
    const navigate = useNavigate();

    // Behavior
    // Redirecting on page /order after validating cart
    const handleClick = () => {
        navigate('/order');
    };

    // This useEffect is executed when cartContent is modified (ex: when clicking on button 'add to cart' or 'empty cart')
    // because cartContent is set as a dependency
    React.useEffect(() => {
        fetch('/api')
            .then((res) => res.json())
            .then((products) => {
                try {
                    // Update available quantity display after adding products in cart
                    const productsCopy = products.slice();
                    for (let i = 0; i < productsCopy.length; i++) {
                        if (productsCopy[i].name in cartContent) {
                            productsCopy[i].quantity -= cartContent[productsCopy[i].name].quantity;
                        }
                    }
                    // update product
                    setProduct(productsCopy);
                    return products;
                } catch (error) {
                    alert(error);
                }
            })
            .then((products) => setProduct(products));
    }, [cartContent]);

    // This useEffect is executed when carContent changed to update local storage
    React.useEffect(() => {
        localStorage.setItem('cartContent', JSON.stringify(cartContent));
    }, [cartContent]);

    // Display
    return (
        <div>
            <div className="Home">
                <DisplayProduct
                    productsInfo={!product ? 'Loading' : product}
                    setProducts={setProduct}
                    index={0}
                    cart={cartContent}
                    setCart={setCart}
                />
                <DisplayProduct
                    productsInfo={!product ? 'Loading' : product}
                    setProducts={setProduct}
                    index={1}
                    cart={cartContent}
                    setCart={setCart}
                />
                <DisplayProduct
                    productsInfo={!product ? 'Loading' : product}
                    setProducts={setProduct}
                    index={2}
                    cart={cartContent}
                    setCart={setCart}
                />
                <DisplayProduct
                    productsInfo={!product ? 'Loading' : product}
                    setProducts={setProduct}
                    index={3}
                    cart={cartContent}
                    setCart={setCart}
                />
            </div>
            <div className="Cart">
                <DisplayCart cart={cartContent} setCart={setCart} product={product} setProduct={setProduct} />
            </div>
            <button onClick={handleClick}>Validate</button>
        </div>
    );
}

export default Home;
