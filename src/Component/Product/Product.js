import React, { useEffect, useState } from "react";
import './Product.css';
import Modal from './Model';
import Button from "./Button";
import Sidebar from "../Nav/Sidebar";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);
    const [cat, setCat] = useState('');
    const [showSidebar, setShowSidebar] = useState(false);
    const [showCardOverlay, setShowCardOverlay] = useState(false); 
    const [selectedProduct, setSelectedProduct] = useState(null); 
    const URL = process.env.REACT_APP_API_KEY;
    const [categories, setCategories] = useState([
        'Categories',
        'hand-block-printing',
        'spice-boxes',
        'all-ceramic',
        'all-brass',
        'made-in-iron',
        'made-in-stainless-steel',
        'coffee-mugs',
        'plates-platters',
        'aroma-diffusers',
        'wind-chimes',
        'decorative-vases',
        'wall-hangings',
        'table-planters',
        'dinner-sets',
        'the-brass-beams',
        'warli-art',
        'dhokra-art',
        'pyrography-art',
        'all-wood',
        'table-lamps'
      ]);
    
    const navigate = useNavigate();

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        let result = await fetch(`${URL}/products`);
        result = await result.json();
        setProducts(result);
    }

    const handleButtonClick = () => {
        setShowSidebar(!showSidebar);
    };

    const handleSearch = async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`${URL}/search/${key}`);
            result = await result.json();
            if (result) {
                setProducts(result);
            }
        } else {
            getProduct();
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(`${URL}/searchPrice?minPrice=${minPrice}&maxPrice=${maxPrice}`);
        const data = await response.json();
        setProducts(data);
    };

    function handleClick(x, y) {
        setMinPrice(x);
        setMaxPrice(y);
    }

 

   async function handleCatClick(x) {
        const response = await fetch(`${URL}/searchCategory?category=${x}`);
        const data = await response.json();
        console.log({data});
        setProducts(data);
    }

    const itemsPerPage = 20;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(products.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const openCardOverlay = (product) => {
      setSelectedProduct(product);
      setShowCardOverlay(true);
  }

    return (
        <div className="card-list-wrapper">
           
            <div className="flex justify-center items-center flex-col sm:flex-row">
            <div className="dropdown">
                <button className="dropbtn bg-themeColor">Price</button>
                <div className="dropdown-content">
                    <li onClick={() => handleClick(0, 100)} onDoubleClick={handleSubmit}>0 to 100</li>
                    <li onClick={() => handleClick(101, 500)} onDoubleClick={handleSubmit}>100 to 500</li>
                    <li onClick={() => handleClick(501, 1000)} onDoubleClick={handleSubmit}>500 to 1000</li>
                    <li onClick={() => handleClick(1001, 2000)} onDoubleClick={handleSubmit}>1000 to 2000</li>
                    <li onClick={() => handleClick(2001, 3000)} onDoubleClick={handleSubmit}>2000 to 3000</li>
                    <li onClick={() => handleClick(3001, 4000)} onDoubleClick={handleSubmit}>3000 to 4000</li>
                    <li onClick={() => handleClick(4001, 5000)} onDoubleClick={handleSubmit}>4000 to 5000</li>
                </div>
            </div>
            <SearchBar handleSearch={handleSearch} />
            <Sidebar categories={categories} handleCatClick={handleCatClick} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
  {currentProducts.map((item, index) => (
    <div key={index} className="card h-80  hover:scale-95 rounded-2xl" onClick={() => openCardOverlay(item)}>
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


            <div className="pagination bg-white mt-24">
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        key={index}
                        className={`pagination-item hover:bg-white hover:text-black hover:border hover:border-black bg-themeColor m-1 text-white w-5 ${currentPage === index + 1 ? 'active' : ''}`}
                        onClick={() => paginate(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {showCardOverlay && (
                 <Modal product={selectedProduct} toggleModal={setShowCardOverlay} openCardOverlay={openCardOverlay} />
            )}
        </div>
    );
}

export default Products;
