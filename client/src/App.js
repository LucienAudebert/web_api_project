// client/src/App.js


import React from "react";
import logo from "./logo.svg";
import "./App.css";
import DisplayProduct from "./components/DisplayProduct";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);


  return (    
    <div className="App">
      <header className="App-header">
      <DisplayProduct productInfo={!data ? "Loading" : data[0]}/>
      <DisplayProduct productInfo={!data ? "Loading" : data[1]}/>
      <DisplayProduct productInfo={!data ? "Loading" : data[2]}/>
      <DisplayProduct productInfo={!data ? "Loading" : data[3]}/>
      </header>
    </div>
  );
}

export default App;

