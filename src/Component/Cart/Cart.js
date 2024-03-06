import React, { useState, useEffect } from "react";
import './Cart.css';

const Cart = () => {
    const URL = process.env.REACT_APP_API_KEY;
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [UPI , setUPI] = useState('');

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        let result = await fetch(`${URL}/cart`);
        result = await result.json();
        const userId = JSON.parse(localStorage.getItem('user'))._id;

        const userCart = result.filter(item => item.userId === userId);
        setCart(userCart);
        
        const price = userCart.reduce((total, item) => total + item.price, 0);
        setTotalPrice(price);
    }

    const deleteCartProduct = async (id) => {
        let result = await fetch(`${URL}/cart/remove/${id}`, {
            method: "Delete"
        });
        result = await result.json();
        if (result) {
            alert("Your Product has been removed from cart");
            window.location.reload();
            getProduct(); 
        }
    };

    const handlePayment = () => {
        // Logic to handle payment
        if(UPI != ""){
            alert("Payment processed successfully!");
        }else{
            alert("Please provide UPI Id for payment");
        }
    };

    return (
                <div className="card-list-cart">
                    {cart.length > 0 ? (
                        cart.map((item, index) => (
                            <div className="card-cart" key={index}>
                                <div className="card-tags-cart flex items-center">
                                    <img
                                        src={`https://${item.image_link}`}
                                        alt='Product'
                                        className="h-40 w-40 object-contain mr-4 hover:scale-105"
                                    />
                                    <div className="typeChange text-left">
                                        <h3 className="bg-green-500">{item.name}</h3>
                                        <hr className="my-2" />
                                        <div className="bg-yellow-400 p-1">
                                        <h5> Price : {item.price}</h5><hr></hr>
                                        <h5>Category : {item.category}</h5>
                                        </div>
                                        <button className="type-delete mt-2 bg-themeColor hover:bg-gray-600 p-2 rounded-md flex justify-center items-center" onClick={() => deleteCartProduct(item._id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="min-h-screen">
                            <h1 className="text-center">Empty Cart</h1>
                            <hr className="my-2" />
                            <h6 className="text-center">Refresh</h6>
                        </div>
                    )}


<div class="payment bg-gray-700 p-4">
    <div class="payment-details">
        <h1 class="text-xl font-bold mb-4 text-white">Payment Details</h1>
        <div className="flex justify-between items-center text-white">
            <p className="bg-yellow-400 p-2 rounded-md">Total Items: {cart.length}</p>
            <p className="bg-green-700 p-2 rounded-md">Total Price: ${totalPrice.toFixed(2)}</p>
        </div>
        <div class="input my-4">
            <input type='text' onChange={(e)=>{setUPI(e.target.value)}} placeholder="Upi" class="border border-gray-300 p-2 w-1/2" />
            <button class="btn-pay mt-2 px-4 py-2 bg-themeColor text-white border border-white" onClick={handlePayment}>Payment</button>
        </div>
    </div>
</div>

                </div>

    );
}

export default Cart;
