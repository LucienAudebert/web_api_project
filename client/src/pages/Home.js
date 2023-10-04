import React from "react";
import DisplayProduct from "../components/DisplayProduct";
import DisplayCart from "../components/DisplayCart";
import { useNavigate } from 'react-router-dom';
import "../Home.css"


function Home() {

  //State
  const [data, setData] = React.useState(null);
  const [cartContent, setCart] = React.useState([]);
  

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);


  // Behavior
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/order');
  }


  // Display
  return (    
    <div className="App">
      <header className="Products">
        <DisplayProduct productsInfo={!data ? "Loading" : data} setProducts={setData} index={0} cart={cartContent} setCart={setCart}/> 
        <DisplayProduct productsInfo={!data ? "Loading" : data} setProducts={setData} index={1} cart={cartContent} setCart={setCart}/>
        <DisplayProduct productsInfo  ={!data ? "Loading" : data} setProducts={setData} index={2} cart={cartContent} setCart={setCart}/>
        <DisplayProduct productsInfo={!data ? "Loading" : data} setProducts={setData} index={3} cart={cartContent} setCart={setCart}/>
      </header>
      <header className="Cart">
        <DisplayCart cart={cartContent} setCart={setCart}/>
      </header>
      <button onClick={handleClick}>Validate</button>
     
    </div>
  );
};

export default Home;