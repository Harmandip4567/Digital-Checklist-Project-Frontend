import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/login",
        formData
      );

      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("user_id", response.data.user_id);

      if (response.data.role === "Admin") {
        navigate("/admin-dashboard");
      } else if (response.data.role === "Maintainer") {
        navigate("/maintainer-dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section with Gradient (same as signup) */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-teal-500 via-sky-400 to-blue-500 items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Welcome Back!</h1>
      </div>

      {/* Right Section with Transparent Card */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-6 bg-gray-100">
        <div
          className="w-full max-w-sm p-6 
                     bg-white/20 backdrop-blur-md border border-white/30 
                     shadow-2xl rounded-lg"
        >
          {/* JSW Logo */}
          <div className="flex justify-center mb-4">
            <img
              src="https://companieslogo.com/img/orig/JSWENERGY.NS-b8b0c8f8.png?t=1731039532"
              alt="JSW Logo"
              className="h-14"
            />
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Login to Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
                         focus:ring-2 focus:ring-[#2563EB] outline-none transition bg-white/70"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
                         focus:ring-2 focus:ring-[#2563EB] outline-none transition bg-white/70"
            />

            <button
              type="submit"
              className="w-full py-2 rounded-md bg-gradient-to-r from-teal-500 via-sky-400 to-blue-500 text-white font-semibold 
                         shadow-md hover:from-teal-600 hover:to-sky-600 transition"
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-700 mt-4 text-sm">
            Don&apos;t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-teal-600 hover:underline cursor-pointer"
            >
              Sign up here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;




// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:8000/auth/login", formData);
//       console.log("Login successful", response.data);
//       localStorage.setItem("token", response.data.access_token);
//       localStorage.setItem("role", response.data.role);
//       localStorage.setItem("user_id", response.data.user_id);

//       if (response.data.role === "Admin") {
//         navigate("/admin-dashboard");
//       } else if (response.data.role === "Maintainer") {
//         navigate("/maintainer-dashboard");
//       } else {
//         navigate("/");
//       }
//     } catch (error) {
//       console.error("Login failed", error);
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Username:</label>
//           <input
//             type="text"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;
