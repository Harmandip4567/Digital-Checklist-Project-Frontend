import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/auth/signup", formData);
      alert("Signup successful!");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.detail || "Signup failed. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, #004C97, #0072CE)",
      }}
    >
      <div className="bg-white shadow-2xl rounded-lg w-full max-w-sm p-6">
        
        {/* JSW Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="/JswLogo.jpg" // Place your logo in public folder
            alt="JSW Logo"
            className="h-14"
          />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Create Your Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#004C97] outline-none transition"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#004C97] outline-none transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#004C97] outline-none transition"
          />

          <select
            name="role"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#004C97] outline-none transition"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="maintainer">Maintainer</option>
          </select>

          <button
            type="submit"
            className="w-full py-2 rounded-md bg-[#004C97] text-white font-semibold shadow-md hover:bg-[#003B78] transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#004C97] hover:underline cursor-pointer"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// const Signup = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//     email: "", // since admin+supervisor are clubbed
//     role: "", 
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value }); //we use [] as This tells JavaScript: Take the value of e.target.name and use it as the key
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:8000/auth/signup", formData); // Data goes to backend in object format
//       alert("Signup successful!");
//       navigate("/login"); // Redirect to login page after successful signup
//     } catch (error) {
//       alert(error.response?.data?.detail || "Signup failed. Please try again.");
//     }
//    };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up for an account</h2>
//         <form className="mt-8 space-y-6" onSubmit={handleSignup}>
//           <div className="rounded-md shadow-sm -space-y-px">
//             <input
//               type="text"
//               name="username"
//               placeholder="Username"
//               onChange={handleChange}
//               required
//               className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               onChange={handleChange}
//               required
//               className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               onChange={handleChange}
//               required
//               className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//             />
//             <select
//               name="role"
//               onChange={handleChange}
//               required
//               className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//             >
//               <option value="">Select Role</option>
//               <option value="admin">Admin</option>
//               <option value="maintainer">Maintainer</option>
//             </select>
//           </div>
//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Sign up
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;

