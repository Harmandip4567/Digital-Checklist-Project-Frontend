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
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-tr from-[#004C97] to-[#0072CE]">
      <div className="bg-white shadow-2xl rounded-lg w-full max-w-sm p-6">
        {/* JSW Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="/JswLogo.jpg"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#004C97] outline-none transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#004C97] outline-none transition"
          />

          <button
            type="submit"
            className="w-full py-2 rounded-md bg-[#004C97] text-white font-semibold shadow-md hover:bg-[#003B78] transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4 text-sm">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-[#004C97] hover:underline cursor-pointer"
          >
            Sign up here
          </span>
        </p>
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
