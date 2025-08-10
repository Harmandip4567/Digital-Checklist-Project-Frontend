import { useState } from "react";
import axios from "axios";
const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "", // since admin+supervisor are clubbed
    role: "", 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); //we use [] as This tells JavaScript: Take the value of e.target.name and use it as the key
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/auth/signup", formData); // Data goes to backend in object format
      alert("Signup successful!");
    } catch (error) {
      alert(error.response?.data?.detail || "Signup failed. Please try again.");
    }
   };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="text" name="role" placeholder="UserRole" onChange={handleChange} />
        
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
