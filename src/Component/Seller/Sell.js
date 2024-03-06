import React, { useState } from "react";


const Sell = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [img, setImage] = useState("");
  const [err, setErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const URL = process.env.REACT_APP_API_KEY;

  const addProduct = async () => {
    if (!name || !price || !category || !company || !img) {
      setErr(true);
      return false;
    }

    setIsLoading(true);

    const userId = JSON.parse(localStorage.getItem("user"))._id;

    try {
      const response = await fetch(`${URL}/add-product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, price, category, company, img, userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const data = await response.json();
      console.log("Product added:", data);
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="max-w-md  p-8 m-12 bg-white shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Sell your Product</h1>

     <div className="flex justify-between items-center">
     <div className="mb-4 w-48 h-65 border border-themeColor m-4" onDrop={handleDrop} onDragOver={handleDragOver}>
          <input
            className="hidden"
            type="file"
            id="fileInput"
            onChange={handleImageChange}
            accept="image/*"
          />
          <label
            className="w-full h-full p-2 cursor-pointer"
            htmlFor="fileInput"
          >
            {img ? (
              <img src={img} alt="Product" className="w-full h-auto" />
            ) : (
              "Drag & Drop your image or click to select"
            )}
          </label>
          {err && !img && <span className="text-red-500">Please fill out this field</span>}
        </div>
        <div>
        <div className="mb-4">
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Product Name"
          />
          {err && !name && <span className="text-red-500">Please fill out this field</span>}
        </div>
        <div className="mb-4">
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter Price"
          />
          {err && !price && <span className="text-red-500">Please fill out this field</span>}
        </div>
        <div className="mb-4" style={{background : "url('https://banner2.cleanpng.com/20180320/vyw/kisspng-computer-icons-input-output-input-devices-desktop-drawing-icon-input-5ab09e99c4abd5.6076476315215243778056.jpg')"}}>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter Category"
          />
          {err && !category && <span className="text-red-500">Please fill out this field</span>}
        </div>
        <div className="mb-4">
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Enter Company"
          />
          {err && !company && <span className="text-red-500">Please fill out this field</span>}
        </div>
       </div>
       </div>
        <button
          className="w-full bg-themeColor text-white py-2 rounded hover:bg-blue-600"
          onClick={addProduct}
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Product"}
        </button>
      </div>

      <div className="h-screen p-8 m-2 bg-white shadow-lg"></div>
    </div>
  );
};

export default Sell;
