import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function MyForm() {

  // State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();


  // Behaviour
  const handleOnSubmit = async (event) => {

      event.preventDefault();
      navigate("/products");

      //alert(JSON.stringify(cart));

      try{
        let result = await fetch(
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
          })

          if (result) {
            setEmail("");
            setName("");
            setAddress("");
        }
        
      }
      catch(err){
        alert(err); // TODO: improve error handling
      }
  }

  // Display
  return (
    <form action="">
        <input type="text" placeholder="name"
        value={name} onChange={(e) => setName(e.target.value)} /><br/>
        <input type="email" placeholder="email"
        value={email} onChange={(e) => setEmail(e.target.value)} /><br/>
        <input type="text" placeholder="address"
        value={address} onChange={(e) => setAddress(e.target.value)} /><br/>
        <button type="submit"
        onClick={handleOnSubmit}>submit</button>
    </form>
  )
}