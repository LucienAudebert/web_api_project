import "../index.css"

import CartProduct from "./CartProduct";

export default function DisplayCart({cart}) {
    //state

    //behaviour

    //render
    return (<div className="DisplayCart">
        {
        Object.keys(cart).map((key, index) => ( 
          <CartProduct product={cart[key]}/>
        ))
      }
        
    </div>);
}