export default function DisplayProduct({productsInfo, setProducts, index, cart, setCart}) {
    //state
    const product = productsInfo[index];

    //behaviour
    const handleClick = () => {
        const productsInfoCopy = productsInfo.slice();
        const cartCopy = cart.slice();

        if (productsInfoCopy[index].quantity > 0) {
            //update product quantity
            productsInfoCopy[index].quantity -= 1;
            setProducts(productsInfoCopy);

            //update cart
            //if in cart, update quantity
            if (productsInfoCopy[index] in cartCopy) {

            }


            //if not in cart, add it

            setCart(cartCopy);


        } else {
            alert("Product out of stock !"); //TODO: change this to something better
        }
        
    }
  
    //render
    return (
        <div>
            {product.name}<br/>
            Price : {product.price}<br/>
            Available : {product.quantity}<br/>

            <button onClick={handleClick}>Add to cart</button>
        </div>
    );
  }