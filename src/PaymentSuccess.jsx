import React from "react";
import { CheckCircle } from "lucide-react"; // nice success icon
import { useNavigate } from "react-router-dom";
import "./Payment.css";

function PaymentSuccess() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/dashboard"); // change path if needed
  };

  return (
    <div className="payment-success">
      <div className="payment-success-card">
        <CheckCircle className="success-icon" size={80} />
        <h1>Payment Successful!</h1>
        <p>Thank you for your purchase. Your transaction has been completed successfully.</p>
        
        <button className="success-btn" onClick={handleGoBack}>
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccess;
