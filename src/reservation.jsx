import { AiOutlineHome } from "react-icons/ai";

function Reservation() {
  return (
    <div style={{ height: "100vh", position: "relative" }}>
      
      {/* Home Icon - Top Left */}
      <div 
        style={{ 
          position: "absolute", 
          top: "20px", 
          left: "20px", 
          cursor: "pointer" 
        }}
        onClick={() => window.location.href = "/"}
        title="Go Home"
      >
        <AiOutlineHome size={32} />
      </div>

      {/* Centered Text */}
      <div 
        style={{ 
          height: "100%", 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center" 
        }}
      >
        <h1>We are Working on it.</h1>
      </div>
    </div>
  );
}

export default Reservation;
