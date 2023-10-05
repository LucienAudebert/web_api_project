import React from "react";
import DisplayProduct from "../components/DisplayProduct";
import DisplayCart from "../components/DisplayCart";
import { useNavigate } from 'react-router-dom';
import "../index.css"


function Home() {

  //State
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
    
  }, []);

  
  React.useEffect(() => {
    localStorage.setItem('cartContent', JSON.stringify(cartContent));
  }, [cartContent]);
  
  


  // Behavior
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/order');
  }


  // Display
  return (    
    <div className="App">
      <div className="Home">
        <DisplayProduct productsInfo={!data ? "Loading" : data} setProducts={setData} index={0} cart={cartContent} setCart={setCart}/> 
        <DisplayProduct productsInfo={!data ? "Loading" : data} setProducts={setData} index={1} cart={cartContent} setCart={setCart}/>
        <DisplayProduct productsInfo  ={!data ? "Loading" : data} setProducts={setData} index={2} cart={cartContent} setCart={setCart}/>
        <DisplayProduct productsInfo={!data ? "Loading" : data} setProducts={setData} index={3} cart={cartContent} setCart={setCart}/>
      </div>
      <div className="Cart">
        <DisplayCart cart={cartContent} setCart={setCart} data={data} setData={setData}/>
      </div>
      <button onClick={handleClick}>Validate</button>
     
    </div>
  );
};

export default Home;