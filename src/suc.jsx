import axios from "axios";
import { useEffect, useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import {  useParams } from "react-router";
import {io} from "socket.io-client";

const socket=io("http://localhost:5000");
function Success(){
    const {sessionId}=useParams()
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    axios.post(`http://localhost:5000/api/order/${sessionId}`).then((response) => {
      console.log("Order confirmed:", response.data);
      socket.emit("order");
      setSuccess(true);
    }).catch((error) => {
      console.error("Error confirming order:", error);
      setSuccess(false);
    }).finally(() => {
      setLoading(false);
    });
  }, []);
  if (loading) {
    return (
      <div className="payment-success">
        <div className="payment-success-card">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }
  if (success) {
    return (
      <div className="payment-success">
        <div className="payment-success-card">
          <BiCheckCircle className="success-icon" size={80} />
          <h1>Payment Successful!</h1>
          <p>Thank you for your purchase. Your transaction has been completed successfully.</p>
          <button className="home" style={{backgroundColor: "#D4AF37",fontWeight:"bolder", color: "white",padding:"10px",border:"none",borderRadius:"5px"}} onClick={() => window.location.href = "/"}>Go to Home</button>
        </div>
      </div>
    );
  }
  return null;

}
export default Success;