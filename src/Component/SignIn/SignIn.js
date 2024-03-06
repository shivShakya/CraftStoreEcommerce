import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn({ setShowOverlay }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [tab, setTab] = useState(2);
  const URL = process.env.REACT_APP_API_KEY;
  

  const collectData = async () => {
    if (!email || !password) {
      alert("Please fill in all the required fields.");
      return;
    }
  
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  
    if (!passwordRegex.test(password)) {
      alert("Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one digit.");
      return;
    }
  
    let result;
    if (tab === 2) {
      // Register
      result = await fetch(`${URL}/register`, {
        method: "post",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      // Login
      result = await fetch(`${URL}/login`, {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  
    result = await result.json();
  
    if (result) {
      alert("successful");
      localStorage.setItem("user", JSON.stringify(result));
      setShowOverlay(false);
      navigate("/product");
    }else{
       alert("Something went wrong");
    }
    console.warn(result);
  };
  

  const nav = () => {
    navigate("/login");
  };

  return (
    <div className="signin">
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-0 z-50 ">
        <div className="bg-white shadow-lg lg:w-1/4 w-2/3 h-1/2 p-2  bg-opacity-70 lg:h-1/4 ">
          <div className="flex justify-center items-center">
            <button
              onClick={() => {
                setTab(1);
              }}
              className={`p-2 bg-themeColor text-white m-2 rounded-lg ${
                tab === 1 ? "bg-opacity-100" : "bg-opacity-50"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setTab(2);
              }}
              className={`p-2 bg-themeColor text-white rounded-lg ${
                tab === 2 ? "bg-opacity-100" : "bg-opacity-50"
              }`}
            >
              Register
            </button>
          </div>
          {tab === 2 ? (
            <div className="form text-gray-600 font-extrabold ">
              <input
                type="text"
                className="p-4 m-4 sm:p-0 sm:m-1 border border-themeColor rounded-lg text-black"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                className="p-4 m-4 sm:p-0 sm:m-1 border border-themeColor rounded-lg text-black"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="p-4 m-4 sm:p-0 sm:m-1 border border-themeColor rounded-lg text-black"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          ) : (
            <div className="form text-gray-600 font-extrabold ">
              <input
                type="email"
                className="p-4 m-4 sm:p-0 sm:m-1 border border-themeColor rounded-lg text-black"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="p-4 m-4 sm:p-0 sm:m-1 border border-themeColor rounded-lg text-black"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}
          <div className="flex justify-start items-center ml-14">
            <button
              className="bg-themeColor border hover:bg-white hover:border-themeColor hover:text-themeColor border-white rounded-lg p-4 w-24 h-8 text-center flex justify-center items-center text-white"
              onClick={collectData}
            >
              Submit
            </button>
            <button
              className="bg-themeColor border hover:bg-white hover:border-themeColor hover:text-themeColor border-white rounded-lg p-4 w-24 h-8 lg:ml-10 text-center flex justify-center items-center text-white"
              onClick={() => setShowOverlay(false)}
            >
              Exit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
