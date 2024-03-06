import React from "react";
import { useNavigate } from "react-router-dom";

function MainPage() {
    const navigate = useNavigate();
  
    function handleButtonClick() {
      navigate('/');
    }
  
    return (
        <div><h1>Home</h1>
             <button onClick={handleButtonClick}>Click me</button>
        </div>
     
    );
  }

  

export default MainPage;