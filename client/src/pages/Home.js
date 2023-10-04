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
      alert(error);
    }
  }, []);
  

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        const dataCopy = data.slice();
        dataCopy.map(dataPiece => dataPiece.quantity - 1)

        setData(dataCopy);
        return data;
      })
      .then((data) => setData(data));
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
        <DisplayCart cart={cartContent}/>
      </div>
      <button onClick={handleClick}>Validate</button>
     
    </div>
  );
};

export default Home;