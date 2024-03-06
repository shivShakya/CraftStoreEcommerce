import React, {useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [products,setProducts] = useState([]);
  const [id,setId] = useState("");
  const URL = process.env.REACT_APP_API_KEY;



  const navigate = useNavigate();
  const nav = () =>{
      
      navigate('/profile'+id);
  }
  
  useEffect(()=>{
      getProduct();
 },[])

  const getProduct = async( ) =>{
    let result = await fetch(`${URL}/products`);
    result = await result.json();
    const userId = JSON.parse(localStorage.getItem('user')).user._id;
    console.warn(userId);
    const array = [];
    result.forEach(element => {
        if (userId === element.userId){
              array.push(element) ;   
        }
     })
    setProducts(array);
}

const deleteProduct = async(id) =>{
    let result = await fetch(`${URL}/products/${id}`,{
        method:"Delete"

    });
    result = await result.json();
    if(result){
        alert("Your Product has been deleted");
    }
};


const [name,setName] = useState("");
const [price,setPrice] = useState("");
const [category,setCategory] = useState("");
const [image_link,setImage] = useState("")
const [err,setErr] = useState(false);
const addProduct = async() =>{
  if (!name || !price || !category|| !image_link){
         setErr(true);
         return false;
  }
  console.warn(name,image_link,price);
  const userId = JSON.parse(localStorage.getItem('user')).user._id;
  console.warn(userId);
  let result = await fetch(`${URL}/add-product`,{
        method: 'post',
        body: JSON.stringify({name,price,category,image_link,userId}),
        headers: {
          'Content-Type':'application/json'
        },   
    });
    result = await result.json();
    console.warn(result);
}


    return(
        <div className="profile">
          <div className="ad-sell">
           <div className="btn-add-sell" onClick={nav}>Update Product</div>
           <div className="product-box">

                <div style={{display:'block'}} className="form-group">
                 <input className="ma3" type = 'text' value={name} onChange={(e)=>{setName(e.target.value)}}   placeholder="Enter Product Name" />
                   { err && !name &&<span >fill the details</span>}
                 </div>
                 <div className="form-group">
                 <input className="ma3" type = 'text' value={price} onChange={(e)=>{setPrice(e.target.value)}}   placeholder="Enter Price" />
                   { err && !price &&<span >fill the details</span>}
                 </div>
                 <div className="form-group">
                 <input className="ma3" type = 'text' value={category} onChange={(e)=>{setCategory(e.target.value)}}  placeholder="Enter Category" />
                   { err && !category &&<span >fill the details</span>}
                 </div>
                 <div className="form-group">
                 <input className="ma3" type = 'text' value={image_link} onChange={(e)=>{setImage(e.target.value)}}   placeholder="Enter Image link" />
                  { err && !image_link &&<span >fill the details</span>}
                 </div>
               
                 <button  onClick={addProduct}>Submit</button>
        </div>
        </div>


      
        <div className="card-list">
            {
               products.map((item,index)=>
                 <div className="card">
                       <div className="card-tags">
                      <img 
                             src =  {`https://${item.image_link}`}
                             alt = 'unsplash'
                             style = {{height:'200px',width:'200px'}}
                      />
                      <h1>{item.name}</h1>
                      <hr></hr>
                      <h5>{item.category}</h5>
                        <h5> {item.company}</h5>
                      
                      <button onClick={()=> deleteProduct(item._id)}>Delete</button>
                      
                      <a href= {"/update/"+item._id}>Update</a>
                    </div>
                 </div>
               )       
         }
          </div>

         
        </div>


    )
}


export default Profile;