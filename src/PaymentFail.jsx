import React from "react";
import { XCircle } from "lucide-react"; // red failure icon
import { useNavigate } from "react-router-dom";
import "./Payment.css";

function PaymentFail() {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate("/payment"); // change this to your payment page route
  };

  return (
    <div className="payment-failure">
      <div className="payment-failure-card">
        <XCircle className="failure-icon" size={80} />
        <h1>Payment Failed</h1>
        <p>
          Unfortunately, your transaction could not be completed.
          Please check your payment details and try again.
        </p>

        <button className="failure-btn" onClick={handleRetry}>
          Retry Payment
        </button>
      </div>
    </div>
  );
}

export default PaymentFail;
