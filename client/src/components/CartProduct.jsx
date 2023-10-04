import "../index.css"

export default function CartProduct({product}) {
    //state

    //behaviour

    //render
    return (<div className="CartProduct">
        {product.name}<br/>
        Quantity : {product.quantity}
    </div>);
}