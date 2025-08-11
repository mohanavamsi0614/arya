import axios from "axios";
import { useEffect } from "react";
import { BiCheckCircle } from "react-icons/bi";
import {  useParams } from "react-router";

function Success(){
    const {sessionId}=useParams()
    const data=JSON.parse(localStorage.getItem("data"))
    useEffect(()=>{
        axios.post(`https://arya-server.onrender.com/api/order/${sessionId}`, {data}).then((response)=>{
            console.log("Order confirmed:", response.data);
        }).catch((error)=>{
            console.error("Error confirming order:", error);
        });

    }, [])
 return (
    <div className="payment-success">
      <div className="payment-success-card">
        <BiCheckCircle className="success-icon" size={80} />
        <h1>Payment Successful!</h1>
        <p>Thank you for your purchase. Your transaction has been completed successfully.</p>  
        <button className="home" style={{backgroundColor: "#4CAF50", color: "white",padding:"10px",border:"none",borderRadius:"5px"}} onClick={() => window.location.href = "/"}>Go to Home</button>      
      </div>
    </div>
  );

}
export default Success;