import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ✅ Define type for signup form data
interface SignupFormData {
  username: string;
  email: string;
  password: string;
  role: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  // ✅ Typed handleChange
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // ✅ Typed handleSubmit
  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/auth/signup", formData);
      alert("Signup successful!");
      navigate("/login");
    } catch (error: any) {
      alert(error.response?.data?.detail || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section with Gradient */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-teal-500 via-sky-400 to-blue-500 items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Digital Checklist</h1>
      </div>

      {/* Right Signup Section */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-6 bg-gray-100">
        <div className="w-full max-w-sm p-6 
                        bg-white/20 backdrop-blur-md border border-white/30 
                        shadow-2xl rounded-lg">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img
              src="https://companieslogo.com/img/orig/JSWENERGY.NS-b8b0c8f8.png?t=1731039532"
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
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
                         focus:ring-2 focus:ring-teal-500 outline-none transition bg-white/70"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
                         focus:ring-2 focus:ring-teal-500 outline-none transition bg-white/70"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
                         focus:ring-2 focus:ring-teal-500 outline-none transition bg-white/70"
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
                         focus:ring-2 focus:ring-teal-500 outline-none transition bg-white/70"
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Maintainer">Maintainer</option>
            </select>

            <button
              type="submit"
              className="w-full py-2 rounded-md bg-gradient-to-r from-teal-500 to-sky-500 text-white font-semibold 
                         shadow-md hover:from-teal-600 hover:to-sky-600 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-gray-700 mt-4 text-sm">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-teal-600 hover:underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;





// import { useState } from "react";
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

