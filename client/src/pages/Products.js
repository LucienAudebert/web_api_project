import React from 'react';
import DisplayProduct from '../components/DisplayProduct';
import DisplayCart from '../components/DisplayCart';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import '../index.css';

function Products() {
    // State
    const [product, setProduct] = React.useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    // initializing cartContent at {} if localStorage is empty, else set value with what is in local storage
    const [cartContent, setCart] = React.useState(
        localStorage.getItem('cartContent') === 'null' ? {} : JSON.parse(localStorage.getItem('cartContent'))
    );
    const navigate = useNavigate();

    // Behavior
    const handleClickOK = () => {
        navigate('/order');
    };

    const handleClickLogOut = () => {
        localStorage.clear();
        navigate('/');
    };

    // Function called after clicking on button 'Empty Cart'
    const handleClickEmpty = () => {
        const productCopy = product.slice();

        if (cartContent !== null) {
          for (let i=0; i<productCopy.length; i++) {
            if (productCopy[i].name in cartContent) {
              productCopy[i].quantity += cartContent[productCopy[i].name].quantity;
            }
          }
        }
        
        setProduct(productCopy);
      setCart({});
    }

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
                    setErrorMessage(error)
                    
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
                {
                    product !== null && product !== undefined ?
                    (
                        product.map((key, ind) => (
                            <DisplayProduct
                            productsInfo={!product ? 'Loading' : product}
                            setProducts={setProduct}
                            index={ind}
                            cart={cartContent}
                            setCart={setCart}
                        />
                        ))
                    )
                    : ( <p>Your cart is empty</p>)

                }
            </div>
            <div className="Cart">
                <DisplayCart cart={cartContent}/>
                <button onClick={handleClickEmpty}>Empty cart</button>
                {errorMessage && <div className="Error">{errorMessage}</div>}
            </div>
            <div>
         
        </div>
            <button onClick={handleClickOK}>OK</button>
            <button onClick={handleClickLogOut}>Log out</button>
        </div>
    );
}

export default Products;
