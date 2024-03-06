import React, { useState, useEffect } from 'react';
import Button from './Button';

function Modal({ product, toggleModal  , openCardOverlay }) {
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    if (product) {
      fetch('https://flaskrecommandapi-3.onrender.com/recommand', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: product.name })
      })
      .then(response => response.json())
      .then(data => setRecommendedProducts(data))
      .catch(error => console.error('Error fetching recommended products:', error));
    }
  }, [product]);

  return (
    <div className="fixed top-0 left-0 w-full h-full  bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-8 w-4/5">
        <div className='flex justify-center items-center  mt-96 border border-black rounded-lg'>
          <img src={`https://${product.image_link}`} alt={product.name} className="w-48 h-48 mx-auto mb-4 shadow-xl hover:scale-105" />
          <div className='text-gray-700 mb-4'>
            <div className="product-details text-left">
              <h3 className="text-xl font-semibold mb-2 ">{product.name}</h3>
              <p className="  mb-4  bg-green-500 text-white  p-1"> Price : {product.price}</p>
              <p className="  mb-4  bg-yellow-500 text-white  p-1">Category : {product.category}</p>
            </div>
            <p>
              The existence of glass crafting in India has been traced back to the Harappan civilization
              around 1700 BC .
            </p>
            <Button product={product}/>
          </div>
        </div>
        {recommendedProducts.length > 0 && (
          <div>
            <h4 className="font-semibold mt-4">Recommended Products:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {recommendedProducts.map((item, index) => (
                 <div key={index} className="card h-96  hover:scale-95 rounded-2xl" onClick={() => openCardOverlay(item)}>
                 <div className="card-content">
                   <div className="card-image">
                     <img
                       src={`https://${item.image_link}`}
                       alt="Product"
                       className="h-48 w-full object-cover"
                     />
                   </div>
                   <div className="card-body">
                     <div className="card-name text-left">{item.name}</div>
                     <hr className="my-2" />
                     <div className="flex justify-between items-center">
                     <div className="card-category mr-2 bg-green-500 text-white  p-1">{item.category}</div>
                     <div className="card-category bg-yellow-400  p-1">{item.price}</div>
                     </div>
                   </div>
                 </div>
               </div>
              ))}
            </div>
          </div>
        )}
  
        <button onClick={() => toggleModal(false)} className="bg-themeColor hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">Close</button>
      </div>
    </div>
  );
  
}

export default Modal;
