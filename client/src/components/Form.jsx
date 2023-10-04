import { useState } from "react";

export default function MyForm() {

  // State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");


  // Behaviour
  const handleOnSubmit = async (event) => {
      event.preventDefault();
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
            }
        }),
      })
      result = await result.json();
      console.warn(result);
      if (result) {
          alert("Data saved succesfully");
          setEmail("");
          setName("");
          setAddress("");
      }
  }

  // Display
  return (
    <form action="">
        <input type="text" placeholder="name"
        value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="email"
        value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="address"
        value={address} onChange={(e) => setAddress(e.target.value)} />
        <button type="submit"
        onClick={handleOnSubmit}>submit</button>
    </form>
  )
}