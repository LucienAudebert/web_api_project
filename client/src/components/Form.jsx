import { useState } from "react";

export default function MyForm({cart}) {

  // State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");


  // Behaviour
  const handleOnSubmit = async (event) => {

      event.preventDefault();
      alert(JSON.stringify(cart));
      let result = await fetch(
      '/api/register', {
          method: "post",
          headers: {
            'Content-Type': 'application/json'
        },
          body: JSON.stringify( {
            user: {
                name: name,
                email: email,
                address: address
            },
            cart: cart
        }),
      })
      if (result) {
          setEmail("");
          setName("");
          setAddress("");
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