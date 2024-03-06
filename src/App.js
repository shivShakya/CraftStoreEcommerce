import './App.css';
import Nav from './Component/Nav/Nav';
import Footer from './Component/Footer/Footer';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import FirstPage from './Component/FirstPageMain/FirstPage';
import PrivateComponent from './Component/PrivateComponent';
import AddProduct from './Component/AddProduct';
import Products from './Component/Product/Product';
import UpdateProduct from './Component/UpdateProduct';
import MainPage from './Component/MainPage';
import Profile from './Component/Profile/Profile';
import Cart from './Component/Cart/Cart';
import Sell from './Component/Seller/Sell';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>
        <Route element = {<PrivateComponent/>}>
        <Route path='/main' element = {<MainPage/>}/>
        <Route path = '/cart' element = {<Cart/>}/>
        <Route path='/product' element={<Products/>}/>
        <Route path='/sell' element={<Sell/>}/>
        <Route path='/update/:id' element={<UpdateProduct/>}/>
        <Route path='/logout' element={<h1>logout Listing component</h1>}/>
        <Route path='/profile' element={<Profile/>}/>
        </Route>
        <Route path='/' element={<FirstPage/>}/>
      </Routes>
      </BrowserRouter>
      <Footer/>
      </div>
      
  );
}

export default App;
