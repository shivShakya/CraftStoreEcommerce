import React, { useState } from "react";
const URL = "https://back-teal.vercel.app";
const AddProduct = () =>{

    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [category,setCategory] = useState("");
    const [company,setCompany] = useState("");
    const [img,setImage] = useState("");
    const [err,setErr] = useState(false);
    const addProduct = async() =>{
      if (!name || !price || !category || !company || img){
             setErr(true);
             return false;
      }
      
      const userId = JSON.parse(localStorage.getItem('user'))._id;
      console.warn(userId);
      console.warn(img);
      
        let result = await fetch(`${URL}/add-product`,{
            method: 'post',
            body: JSON.stringify({name,price,category,company,img,userId}),
            headers: {
              'Content-Type':'application/json'
            },   
        });
        result = await result.json();
        console.warn(result);
    }
    return(
        <div >
                 <h1 >Add Product</h1>
                 <div style={{display:'block'}}>
                 <input className="ma3" type = 'text' value={name} onChange={(e)=>{setName(e.target.value)}}   placeholder="Enter Product Name" />
                   { err && !name &&<span >fill the details</span>}
                 </div>
                 <div>
                 <input className="ma3" type = 'text' value={price} onChange={(e)=>{setPrice(e.target.value)}}   placeholder="Enter Price" />
                   { err && !price &&<span >fill the details</span>}
                 </div>
                 <div>
                 <input className="ma3" type = 'text' value={category} onChange={(e)=>{setCategory(e.target.value)}}  placeholder="Enter Category" />
                   { err && !category &&<span >fill the details</span>}
                 </div>
                 <div>
                 <input className="ma3" type = 'text' value={company} onChange={(e)=>{setCompany(e.target.value)}}   placeholder="Enter Company" />
                  { err && !company &&<span >fill the details</span>}
                 </div>
                   <div>
                 <input className="ma3" type = 'text' value={img} onChange={(e)=>{setImage(e.target.value)}}   placeholder="Image Link" />
                  { err && !company &&<span >fill the details</span>}
                 </div>

               
                 <button  onClick={addProduct}>Submit</button>
        </div>
    )
}

export default AddProduct;