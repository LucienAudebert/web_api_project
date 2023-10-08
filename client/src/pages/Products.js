import React from 'react';
import DisplayProduct from '../components/DisplayProduct';
import DisplayCart from '../components/DisplayCart';
import { useNavigate } from 'react-router-dom';
import '../index.css';

function Products() {
    // State
    const [product, setProduct] = React.useState(null);

    // initializing cartContent at {} if localStorage is empty, else set value with what is in local storage
    const [cartContent, setCart] = React.useState(
        localStorage.getItem('cartContent') === 'null' ? {} : JSON.parse(localStorage.getItem('cartContent'))
    );
    const navigate = useNavigate();

    // Behavior
    const handleClickOK = () => {
        navigate('/order');
    };

    // This useEffect is executed when cartContent is modified (ex: when clicking on button 'add to cart' or 'empty cart')
    // because cartContent is set as a dependency
    React.useEffect(() => {
        fetch('/api/products')
            .then((res) => res.json())
            .then((products) => {
                try {
                    // Update available quantity display after adding products in cart
                    const productsCopy = products.slice();
                    for (let i = 0; i < productsCopy.length; i++) {
                        if (cartContent !== null && productsCopy[i].name in cartContent) {
                            productsCopy[i].quantity -= cartContent[productsCopy[i].name].quantity;
                        }
                    }
                    // update product
                    setProduct(productsCopy);
                    return products;
                } catch (error) {
                    alert(error); // TODO: improve error handling
                }
            })
            .then((products) => setProduct(products));
    }, [cartContent]);

    // This useEffect is executed when cartContent changed to update local storage
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
            <button onClick={handleClickOK}>OK</button>
        </div>
    );
}

export default Products;
