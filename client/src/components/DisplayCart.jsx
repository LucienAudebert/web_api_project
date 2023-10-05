import "../index.css"

import CartProduct from "./CartProduct";

export default function DisplayCart({cart, setCart, data, setData}) {
    //state

    //behaviour
    const handleClick = () => {
        const dataCopy = data.slice();
        for (let i=0; i<dataCopy.length; i++) {
          if (dataCopy[i].name in cart) {
            dataCopy[i].quantity += cart[dataCopy[i].name].quantity;
          }
          
        }
        setData(dataCopy);
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