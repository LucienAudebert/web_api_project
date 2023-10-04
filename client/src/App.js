// client/src/App.js


import React from "react";
import "./App.css";
import DisplayProduct from "./components/DisplayProduct";
import DisplayCart from "./components/DisplayCart";

function App() {
  //state
  const [data, setData] = React.useState(null);
  const [cartContent, setCart] = React.useState([]);

  //behaviour
  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  //render  TODO : use of displayproduct in map
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
    </div>
  );
}

export default App;

