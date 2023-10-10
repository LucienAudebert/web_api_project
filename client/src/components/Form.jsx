import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function MyForm() {

  // State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();


  // Behaviour
  const handleOnSubmit = async (event) => {
      event.preventDefault();
      try{
        const res = await fetch(
          '/api', {
              method: "post",
              headers: {
                'Content-Type': 'application/json'
            },
              body: JSON.stringify( {
                user: {
                    name: name,
                    email: email,
                    address: address
                }
            }),
          });

          const data = await res.json();

          if(data.message !== "OK"){
            setErrorMessage("Sorry, this email already exists. Please enter a new one.");
            setEmail("");
            setName("");
            setAddress("");
          }
          else{ // Go to next page if user information is valid
            localStorage.setItem('email', JSON.stringify(email)); // store email user in localStorage
            navigate("/products");
          }
      }
      catch(err){
        setErrorMessage(err);
      }
  }

  // Display
  return (
    <div>
      <form action="">
        <input type="text" placeholder="name"
        value={name} onChange={(e) => setName(e.target.value)}/><br/>
        <input type="email" placeholder="email"
        value={email} onChange={(e) => setEmail(e.target.value)}/><br/>
        <input type="text" placeholder="address"
        value={address} onChange={(e) => setAddress(e.target.value)}/><br/>
        <button type="submit"
        onClick={handleOnSubmit}>submit</button>
    </form>
      {errorMessage && <div className="Error">{errorMessage}</div>}
    </div>
  )
}