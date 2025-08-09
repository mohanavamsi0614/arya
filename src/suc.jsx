import axios from "axios";
import { useEffect } from "react";
import {  useParams } from "react-router";

function Success(){
    const {sessionId}=useParams()
    const data=JSON.parse(localStorage.getItem("data"))
    useEffect(()=>{
        axios.post(`http://localhost:5000/api/order/${sessionId}`, {data}).then((response)=>{
            console.log("Order confirmed:", response.data);
        }).catch((error)=>{
            console.error("Error confirming order:", error);
        });

    }, [])
    return (
        <div>
            Payment Successful
        </div>
    )
}
export default Success;