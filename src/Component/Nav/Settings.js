import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

function Settings({ setShowOverlay }) {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate('/');

    const logout = () => {
        localStorage.clear();
        navigate('/');
    }

    return (
        <div className="fixed -top-64 right-0 h-full w-full flex items-center justify-end z-50" onClick={() => setShowOverlay(false)}>
            <div className="overlay-content bg-white p-4  shadow-lg">
                <ul>
                    <li className="hover:bg-themeColor m-2 p-1 hover:text-white border rounded-lg border-themeColor" >{auth ? <Link to="profile">Profile</Link> : <Link></Link>}</li>
                    <li className="hover:bg-themeColor m-2 p-1 hover:text-white border rounded-lg border-themeColor" >{auth ? <Link to="sell">Sell your Product</Link> : <Link></Link>}</li>
                    <li className="hover:bg-themeColor m-2 p-1 hover:text-white border rounded-lg border-themeColor">{auth ? <Link onClick={logout} to="/">Logout</Link> : <Link to="/signup" className='craft'></Link>}</li>
                </ul>
            </div>
        </div>
    );
}

export default Settings;
