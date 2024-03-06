import React, { useState } from 'react';
import axios from 'axios';

function ImageClassifier() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', selectedFile);
    try {
      const res = await axios.post('http://localhost:5000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setPrediction(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(prediction);

  return (
    <div className='imageClassify'>
      <h1 className='color'>Image Classifier</h1>
      <form onSubmit={handleSubmit} >
        <input type="file" onChange={handleFileInput}/>
        <button type="submit" style={{width:'200px' , background:'yellow' , color:'black'}}>Submit</button>
      </form>
      {prediction && (
        <div>
          <ul>
            <div className='color'>Its a {prediction}</div>
           
          </ul>
        </div>
      )}
    </div>
  );
}

export default ImageClassifier;