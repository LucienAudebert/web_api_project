import "../index.css"

import CartProduct from "./CartProduct";

export default function DisplayCart({cart, setCart, product, setProduct}) {
    // State

    // Behaviour

    // Function called after clicking on button 'Empty Cart'
    const handleClickEmpty = () => {
        const productCopy = product.slice();

        if (cart !== null) {
          for (let i=0; i<productCopy.length; i++) {
            if (productCopy[i].name in cart) {
              productCopy[i].quantity += cart[productCopy[i].name].quantity;
            }
          }
        }
        
        setProduct(productCopy);
      setCart({});
    }

    // Display
    return (<div >
        <div className="DisplayCart">
        {
          cart !== null && cart !== undefined ?
          (
            Object.keys(cart).map((key, index) => (
              <CartProduct product={cart[key]} key={index} />
            ))
          )
          : ( <p>Your cart is empty</p>)
          
      }
        </div>
       
        <div>
          <button onClick={handleClickEmpty}>Empty cart</button>
        </div>
        
    </div>);
}