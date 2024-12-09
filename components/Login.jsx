import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); 
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password || !role) {
      alert("All fields are required!");
      return;
    }

    
    navigate("/dashboard", { state: { role } });
  };

localStorage.setItem("role", role); 



  return (
    <div>
      
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white h-screen flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl font-extrabold mb-6">Login</h1>
        <p className="text-lg mb-6">Please log in to continue.</p>
      </section>

      
      <section className="bg-gray-100 py-16 flex justify-center items-center">
        <div className="border rounded-md  w-full sm:w-1/2 lg:w-1/3 p-8 shadow-lg bg-white">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <div className="flex flex-col gap-6">
            <input
              className="border border-black rounded-md p-3 w-full"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="border border-black rounded-md p-3 w-full"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <select
              className="border border-black rounded-md p-3 w-full"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
              <option value="parent">Parent</option>
            </select>
            <button
              onClick={handleLogin}
              className="bg-blue-500 text-white rounded-md p-3 w-full hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
