import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './ML.css';

const API_URL = 'http://localhost:5000';

function Model() {
  const [sqft,SetSqft] = useState(1000);
  const [bhk ,setBHK] = useState(0);
  const [bath, setBath] = useState(0);
  const [location, setLocation] = useState([]);
 
  const [prediction, setPrediction] = useState(null);


  console.log(location);
  console.log(sqft);
  console.log(bhk);
  console.log(bath);




  useEffect(() => {
    async function fetchLocations() {
      const response = await fetch(`${API_URL}/get_location_names`);
      const data = await response.json();
      setLocation(data.locations);
    }

    fetchLocations();
  }, []);



 
  const handleFormSubmit = async (event) => {
   

    // Send HTTP request to the API endpoint
    event.preventDefault();
        fetch(`${API_URL}/predict_home_price`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `location=${location}&total_sqft=${sqft}&bhk=${bhk}&bath=${bath}`
        })
        .then(response => response.json())
        .then(data => setPrediction(data['estimated price']));
    
    // Set the prediction state with the response data
 
  };


 

  return (
    <div className='ml'>
      <form  onSubmit={handleFormSubmit}>
        <h2>Area (Square Feet)</h2>
        <input type="text" value={sqft} onChange={e=> SetSqft(e.target.value)} />
        <h2>BHK</h2>
        <div className='bhk'>
            <input type = "radio"  value={bhk} name="bhk" onChange={e=>setBHK(1)} />
            <input type = "radio" value={bhk} name="bhk" onChange={e=>setBHK(2)} />
            <input type = "radio" value={bhk} name="bhk" onChange={e=>setBHK(3)} />
            <input type = "radio" value={bhk} name="bhk" onChange={e=>setBHK(4)} />
            <input type = "radio" value={bhk} name="bhk" onChange={e=>setBHK(5)} />
        </div>
        <h2>Bath</h2>
        <div className='bath'> 
            <input type = "radio" value={bath} name ="bath" onChange={e=>setBath(1)} />
            <input type = "radio" value={bath} name ="bath" onChange={e=>setBath(2)}  />
            <input type = "radio" value={bath} name ="bath" onChange={e=>setBath(3)} />
            <input type = "radio" value={bath} name ="bath" onChange={e=>setBath(4)} />
            <input type = "radio" value={bath} name ="bath" onChange={e=>setBath(5)} />
        </div>
        <h2>Location</h2>
        <div className='loc'>
        <select id="cars" >
        {location.map((location, index) => (
          <option value={location} >{location}</option>
        ))}   
        </select>
        </div>
        <button className='btn' type="submit">Predict</button>
      </form>

      {prediction !== null && (
        <div className='pred'>
          <h2 >Prediction:</h2>
          <p className='price'>{prediction} lakh</p>
        </div>
      )}
    </div>
  );
}

export default Model;