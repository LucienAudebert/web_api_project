import "../index.css"

import CartProduct from "./CartProduct";

export default function DisplayCart({cart, setCart, product, setProduct}) {
    //state

    //behaviour
    const handleClick = () => {
        const productCopy = product.slice();
        for (let i=0; i<productCopy.length; i++) {
          if (productCopy[i].name in cart) {
            productCopy[i].quantity += cart[productCopy[i].name].quantity;
          }
          
        }
        setProduct(productCopy);
      setCart({});
    }

    //render
    return (<div >
        <div className="DisplayCart">
          {
            Object.keys(cart).map((key, index) => ( 
              <CartProduct product={cart[key]}/>
            ))
          }
        </div>
        <div>
          <button onClick={handleClick}>Empty cart</button>
        </div>
        
    </div>);
}