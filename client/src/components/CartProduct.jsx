import "../index.css"

export default function CartProduct({product}) {
    //State

    //Behaviour

    //Display
    return (<div className="CartProduct">
        {product.name}<br/>
        Quantity : {product.quantity}
    </div>);
}