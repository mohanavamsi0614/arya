import Navbar from "./components/Navbar";

function Book() {
  // Get screen width for responsive design
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        width: "100%",
        minHeight: "100vh",
        fontFamily: "'Forum', serif",
        color: "#EFE7D2",
        padding: isMobile ? "10px" : "20px",
      }}
    >
    <Navbar />
      {/* Left Image */}
      <div style={{ 
        width: isMobile ? "100%" : "50%", 
        position: "relative",
        height: isMobile ? "50vh" : "auto",
        minHeight: isMobile ? "300px" : "auto"
      }}>
        <img
          src="./apLVZGAMneXESKaZkziIssg86a8.webp"
          alt="Main Dish"
          style={{ 
            width: "100%", 
            height: "100%", 
            objectFit: "cover", 
            borderRadius: isMobile ? "8px" : "10px" 
          }}
        />
        <h1
          style={{
            position: "absolute",
            bottom: isMobile ? "15px" : "20px",
            left: isMobile ? "15px" : "20px",
            fontWeight:"lighter",
            color: "rgb(239, 231, 210)",
            fontSize: isMobile ? "48px" : isTablet ? "80px" : "106px",
            lineHeight: isMobile ? "1.1" : "1",
            width: isMobile ? "90%" : "500px"
          }}
        >
BOOK
A TABLE        </h1>
      </div>

      {/* Right Form */}
      <div
        style={{
          width: isMobile ? "100%" : "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: isMobile ? "flex-start" : "space-around",
          border: "1px solid #444",
          padding: isMobile ? "20px" : "40px",
          borderRadius: "10px",
          marginLeft: isMobile ? "0" : "20px",
          marginTop: isMobile ? "20px" : "0",
          minHeight: isMobile ? "auto" : "auto"
        }}
      >
        <div style={{ textAlign: "center", marginBottom: isMobile ? "15px" : "20px" }}>
          <div className="menu-category-decor" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="diamond-line left">
              <span className="diamond-shape" />
              <span className="line-shape" />
            </span>
            <h1 style={{ 
              margin: "0 10px", 
              fontSize: isMobile ? "24px" : "32px", 
              fontWeight: "lighter", 
              color: "rgb(239, 231, 210)" 
            }}>RESERVATION</h1>
            <span className="diamond-line right">
              <span className="line-shape" />
              <span className="diamond-shape" />
            </span>
          </div>
          <p style={{ 
            fontSize: isMobile ? "14px" : "16px", 
            color: "#ccc",
            lineHeight: "1.5",
            padding: isMobile ? "0 10px" : "0"
          }}>
            Secure your spot at Qitchen, where exceptional sushi and a <br />
            remarkable dining experience await.
          </p>
        </div>

        {/* Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "12px" : "15px" }}>
          <input
            placeholder="Your Name"
            style={inputStyle}
          />
          <input
            placeholder="Phone Number"
            style={inputStyle}
          />
          <input
            placeholder="Email"
            style={inputStyle}
          />
          <div style={{ 
            display: "flex", 
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "12px" : "10px" 
          }}>
            <input 
              type="number" 
              placeholder="1-10" 
              min={1} 
              max={10} 
              style={{
                ...inputStyle,
                flex: isMobile ? "none" : 1
              }} 
            />
            <input 
              type="date" 
              placeholder="dd-mm-yyyy" 
              style={{
                ...inputStyle,
                flex: isMobile ? "none" : 1
              }} 
            />
            <input 
              type="time" 
              placeholder="--:--" 
              style={{
                ...inputStyle,
                flex: isMobile ? "none" : 1
              }} 
            />
          </div>
          <button
            style={{
              backgroundColor: "rgb(239, 231, 210)",
              color: "black",
              padding: isMobile ? "14px" : "12px",
              borderRadius: "8px",
              border: "none",
              fontWeight: "bold",
              fontSize: isMobile ? "16px" : "14px",
              marginTop: "10px",
              cursor: "pointer",
              width: "100%",
              minHeight: isMobile ? "48px" : "auto"
            }}
          >
            SUBMIT
          </button>
        </div>
      </div>
      
    </div>
  );
}

const inputStyle = {
  flex: 1,
  padding: window.innerWidth <= 768 ? "14px" : "12px",
  width: "100%",
  borderRadius: "8px",
  border: "1px solid #444",
  backgroundColor: "#1c1c1c",
  color: "rgb(239, 231, 210)",
  fontSize: window.innerWidth <= 768 ? "16px" : "14px",
  minHeight: window.innerWidth <= 768 ? "48px" : "auto",
  boxSizing: "border-box"
};

export default Book;
