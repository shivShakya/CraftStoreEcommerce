import React, { useState } from 'react';
import './Product/Model.css';
function Update({ product, setName,setPrice,setCategory,setCompany,name,price,category,company ,updateProduct }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  return (
    <div>
      <button onClick={toggleModal}>Update</button>
      {showModal && (
         <><div className="overlay" />
         <div className="dim"/>
         <div className="modal-container">
          <div className="modal-content">
            <div className="product-details">
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <div style={{display:'block'}} className='form-group'>
                 <input className="ma3" type = 'text' value={name} onChange={(e)=>{setName(e.target.value)}}   placeholder="Enter Product Name" />  
              </div>
              
              <div className="form-group">
                 <input className="ma3" type = 'text' value={price} onChange={(e)=>{setPrice(e.target.value)}}   placeholder="Enter Price" />
              </div>
             
              <div className="form-group">
                 <input className="ma3" type = 'text' value={category} onChange={(e)=>{setCategory(e.target.value)}}  placeholder="Enter Category" />
                 </div>
                 <div className="form-group">
                 <input className="ma3" type = 'text' value={company} onChange={(e)=>{setCompany(e.target.value)}}   placeholder="Enter Company" />
                 </div>
              <button  onClick={updateProduct}>Update</button>
              <button onClick={toggleModal}>Close</button>
            </div>
          </div>
        </div></>
      )}
    </div>
  );
}

export default Update;