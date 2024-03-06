import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import SignIn from '../SignIn/SignIn';
import Settings from './Settings';

const Nav = () => {
    const auth = localStorage.getItem('user');
    const [showOverlay, setShowOverlay] = useState(false);
    const [cartCount, setCartCount] = useState(0); 
    const URL = process.env.REACT_APP_API_KEY;


    const getCartCount = async () => {
        try {
            const response = await fetch(`${URL}/cart`);
            const cartData = await response.json();
            const userId = JSON.parse(localStorage.getItem('user'))._id;
            const userCart = cartData.filter(item => item.userId === userId);
            setCartCount(userCart.length);
        } catch (error) {
            console.error('Error fetching cart count:', error);
        }
    };

    useEffect(() => {
        if (auth) {
            getCartCount();
        }
    }, [auth]);

    return (
        <>
            <div>
                <ul className='w-full h-14 text-white bg-themeColor flex justify-between'>
                    <li className='flex'>
                        <img src='./logo.jpeg' alt='logo' className='bg-cover w-10 h-10 m-7 hover:scale-105 border border-white' />
                        <div className='font-extrabold text-start m-5'>CraftStore <hr className='w-5'></hr></div>
                    </li>
                    <li className='flex'>
                        {auth ?
                            <div className='flex justify-center items-center'>
                                <div className='mr-3'>
                                    {auth ? <Link to="/product">Product</Link> : <Link></Link>}
                                </div>
                                <div className='mr-3'>
                                    {auth ? <Link to="cart">Cart ({cartCount})</Link> : <Link></Link>}
                                </div>
                            </div>
                            :
                            <div className='font-extrabold text-end m-5'>Sign In</div>}
                        <div className='w-10 h-10 bg-black text-center m-2 border border-white hover:scale-105 hover:bg-white hover:text-black' style={{ backgroundImage: "url('https://www.shutterstock.com/image-vector/hamburger-menu-web-icon-on-260nw-1180081597.jpg')", backgroundSize: 'cover', cursor: 'pointer' }} onClick={() => setShowOverlay(true)}></div>
                    </li>
                </ul>
            </div>
            {auth ? showOverlay && <Settings setShowOverlay={setShowOverlay} /> : showOverlay && <SignIn setShowOverlay={setShowOverlay} />}
            <div className='flex justify-end items-end'><img src='./jhumar.png' className='w-48' /></div>
        </>
    );
}

export default Nav;
