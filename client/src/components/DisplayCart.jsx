import "../index.css"

import CartProduct from "./CartProduct";

export default function DisplayCart({cart}) {
    // State

    // Behaviour

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
        
    </div>);
}