import React from "react"; 
import DisplayCart from "../components/DisplayCart";
import "../index.css"
import { useNavigate } from 'react-router-dom';
import Form from "../components/Form";
 

function Order(){

    const [data, setData] = React.useState(null);
    const [cartContent, setCart] = React.useState({});

    React.useEffect(() => {
        try {
          const cartContent = JSON.parse(localStorage.getItem('cartContent'));
          if (cartContent) {
            setCart(cartContent);
           }
        } catch (error) {
          alert(error)
        }
    
        fetch("/api")
          .then((res) => res.json())
          .then((data) => {
            try {
            const cartContent = JSON.parse(localStorage.getItem('cartContent'));
            const dataCopy = data.slice();
            for (let i=0; i<dataCopy.length; i++) {
              if (dataCopy[i].name in cartContent) {
                dataCopy[i].quantity -= cartContent[dataCopy[i].name].quantity;
              }
              
            }
    
            setData(dataCopy);
            return data;
          } catch (error) {
            alert(error);
            return data;
          }
          })
          .then((data) => setData(data));
      }, []);
    
      
      React.useEffect(() => {
        localStorage.setItem('cartContent', JSON.stringify(cartContent));
      }, [cartContent]);

    // Behavior
    const navigate = useNavigate();
    const handleClick = () => {
      navigate('/');
    }

    // Display
    return (
        <div>
            <div className='Order'>
                <h3>
                    This is the Order page.
                </h3>
                <Form/>
            </div>
            <div className="Cart">
                <DisplayCart cart={cartContent} setCart={setCart} data={data} setData={setData}/>
            </div>
            <button onClick={handleClick}>Cancel</button>
        </div>
    );
};


export default Order;