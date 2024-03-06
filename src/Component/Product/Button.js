import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Button = ({ product }) => {
    const URL = process.env.REACT_APP_API_KEY;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const AddCart = async (name, price, category, company, image_link) => {
        try {
            setLoading(true);
            console.log('Add Cart called')
            alert('Product has been saved to cart');
            const userId = JSON.parse(localStorage.getItem('user'))._id;

            let result = await fetch(`${URL}/cart/add`, {
                method: 'post',
                body: JSON.stringify({ name, price, category, company, image_link, userId }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            window.location.reload();
            result = await result.json();
        } catch (error) {
            console.error('Error adding product to cart:', error);
        } finally {
            setLoading(false);
            window.location.reload();
        }
    }

    return (
        <div>
            <button
                className="btn bg-themeColor text-white rounded-lg mt-2 hover:scale-105"
                onClick={() => { AddCart(product.name, product.price, product.category, product.company, product.image_link) }}
                disabled={loading} 
            >
                {loading ? 'Adding to Cart...' : 'Add to Cart'}
            </button>
        </div>
    );
}

export default Button;
