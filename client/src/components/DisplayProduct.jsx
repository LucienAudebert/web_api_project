export default function DisplayProduct({productInfo}) {
    //state

    //behaviour
    const handleClick = () => {
        alert(productInfo._id);
    }
  
    //render
    return (
        <div>
            {productInfo.name}<br/>
            Price : {productInfo.price}<br/>
            Available : {productInfo.quantity}<br/>

            <button onClick={handleClick}>Add to cart</button>
        </div>
    );
  }