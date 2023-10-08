import "../index.css"

export default function DisplayProduct({productsInfo, setProducts, index, cart, setCart}) {
    // State
    const product = productsInfo[index];

    // Behaviour
    const handleClick = () => {
        const productsInfoCopy = productsInfo.slice();
        const productCopy = productsInfoCopy[index];
        const cartCopy = {...cart};

        if (productCopy.quantity > 0) {
            //update product quantity
            productCopy.quantity -= 1;
            setProducts(productsInfoCopy);

            //update cart
            //if in cart, update quantity
            if (productCopy.name in cartCopy) {
                cartCopy[productCopy.name].quantity += 1;
            // if not in cart we add it
            } else {
                cartCopy[productCopy.name] = {
                    name: productCopy.name, 
                    quantity : 1
                }
            }
            setCart(cartCopy);

        } else {
            alert("Product out of stock !"); //TODO: change this to something better
        }
        
    }
  
    // Display
    return (
        <div className="Product">
            {product.name}<br/>
            Price : {product.price}€<br/>
            Available : {product.quantity}<br/>

            <button onClick={handleClick} disabled={product.quantity===0}>Add to cart</button>
        </div>
    );
  }