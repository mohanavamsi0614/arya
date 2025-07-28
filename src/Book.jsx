import Navbar from "./components/Navbar";

function Book() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        fontFamily: "'Forum', serif",
        color: "#EFE7D2",
        padding: "20px",
      }}
    >
    <Navbar />
      {/* Left Image */}
      <div style={{ width: "50%", position: "relative" }}>
        <img
          src="./apLVZGAMneXESKaZkziIssg86a8.webp"
          alt="Main Dish"
          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }}
        />
        <h1
          style={{
            position: "absolute",
            bottom: "20px",
            left: "20px",
            fontWeight:"lighter",
            color: "rgb(239, 231, 210)",
            fontSize: "106px",
            lineBreak:"strict",
            width: "500px"
          }}
        >
BOOK
A TABLE        </h1>
      </div>

      {/* Right Form */}
      <div
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent:"space-around",
          border: "1px solid #444",
          padding: "40px",
          borderRadius: "10px",
          marginLeft: "20px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div className="menu-category-decor" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="diamond-line left">
              <span className="diamond-shape" />
              <span className="line-shape" />
            </span>
            <h1 style={{ margin: "0 10px", fontSize: "32px", fontWeight: "lighter", color: "rgb(239, 231, 210)" }}>RESERVATION</h1>
            <span className="diamond-line right">
              <span className="line-shape" />
              <span className="diamond-shape" />
            </span>
          </div>
          <p style={{ fontSize: "16px", color: "#ccc" }}>
            Secure your spot at Qitchen, where exceptional sushi and a <br />
            remarkable dining experience await.
          </p>
        </div>

        {/* Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
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
          <div style={{ display: "flex", gap: "10px" }}>
            <input type="number" placeholder="1-10" min={1} max={10} style={inputStyle} />
            <input type="date" placeholder="dd-mm-yyyy" style={inputStyle} />
            <input type="time" placeholder="--:--" style={inputStyle} />
          </div>
          <button
            style={{
              backgroundColor: "rgb(239, 231, 210)",
              color: "black",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              fontWeight: "bold",
              fontSize: "14px",
              marginTop: "10px",
              cursor: "pointer",
            }}
          >
            SUBMIT
          </button>
        </div>
        <div style={{ width: "100%",borderRadius:"10px",padding:"20px", border:"1px solid #444 ",textAlign: "center", marginTop: "20px" ,display: "flex" }}>
        <h1>© Gola Templates</h1>
        <h1>Licensing</h1>
      </div>
      </div>
      
    </div>
  );
}

const inputStyle = {
  flex: 1,
  padding: "12px",
  width: "100%",
  borderRadius: "8px",
  border: "1px solid #444",
  backgroundColor: "#1c1c1c",
  color: "rgb(239, 231, 210)",
  fontSize: "14px",
};

export default Book;
