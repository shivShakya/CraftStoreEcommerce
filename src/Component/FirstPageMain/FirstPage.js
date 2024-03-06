import React, {useState , useEffect } from "react";
import SignIn from "../SignIn/SignIn";
import { useNavigate } from "react-router-dom";
const FirstPage = () => {
    
    const nav = useNavigate();
    const auth = localStorage.getItem('user');

    useEffect(()=>{
           auth? nav("/product"): nav("/");
    })

    

    const [showOverlay, setShowOverlay] = useState(false);
    

    return(
       <><div className="text-white h-1/2">
        <div className="flex items-center justify-center">
          <img src="./ii.jpeg" alt="f-im" className="w-1/3 ml-24" />
          <div className="w-1/5 ml-24 text-sm text-textColor text-left">Unveil the beauty of centuries-old craftsmanship, each piece a masterpiece, empowering Indian artisans and enriching your home.</div>
        </div>
        <hr className=" w-2/3 m-24"></hr>
      </div>
      <div className="text-white h-1/2">
          <div className="flex items-center justify-center">
          <div className="w-1/5 ml-24 text-sm text-textColor text-left">Let's honor the entrepreneurial spirit of our sellers ... <br></br>
                   Ordinary people crafting extraordinary pieces. Join us in celebrating their dedication and supporting their dreams as we cherish their unique creations together.</div>
            <img src="./pot.jpeg" alt="f-im" className="w-1/3 ml-24" />
          
          </div>
          <hr className=" w-2/3 m-24 "></hr>
        </div>
        <div className="text-white h-1/2">
          <div className="flex items-center justify-center">
          <img src="./cloth.jpeg" alt="f-im" className="w-1/5 ml-24" />
          <div className="w-1/5 ml-24 text-sm text-textColor text-left">Let's honor the entrepreneurial spirit of our sellers ... <br></br>
                  Join us in celebrating their dedication and supporting their dreams as we cherish their unique creations together.</div>
            <img src="./box.jpeg" alt="f-im" className="w-1/5 ml-24" />  
          </div>
        </div>

      <div className="flex justify-center items-start mt-12">
         <div onClick={() => setShowOverlay(true)}  className=" w-48 h-12 border flex text-center justify-center items-center border-white rounded-2xl hover:bg-white hover:text-black text-white font-extrabold bg-themeColor">Register Now</div>
      </div>
     <div className="flex justify-center items-center">
     <img src="./flower.jpeg" alt="f-im" className="w-1/5 m-24 rounded-full" />
     </div>
        

     {showOverlay && (
          <SignIn  setShowOverlay={setShowOverlay}/>
      )}

        
        </>
    )
}
export default FirstPage; 