function About(){
    return(
        <div style={{
            display: "flex", 
            height: "100vh",
            width: "100%",
            padding: "20px",
            backgroundColor: "rgb(10, 11, 10)",
            color: "rgb(239, 231, 210)",
            fontFamily: "'Forum', serif",
            overflow: "hidden",
            boxSizing: "border-box"
        }}>
            {/* Left Image Section */}
            <div style={{
                width: "50%", 
                height: "100%",
                marginRight: "20px"
            }}>             
                <img 
                    src="./about-left.webp" 
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "20px",
                        objectFit: "cover"
                    }}
                    alt="Sushi Restaurant"
                />
            </div>
            
            {/* Right Content Section */}
            <div style={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                padding: "20px",
                gap: "30px",
                overflow: "hidden"
            }}>
                {/* Top Section - Main Title */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    flex: "0 0 auto"
                }}>
                    <div style={{flex: 1}}>
                        <h1 style={{
                            fontSize: "48px",
                            fontWeight: "lighter",
                            lineHeight: "1.2",
                            margin: "0 0 15px 0",
                            color: "rgb(239, 231, 210)"
                        }}>
                            Sushi Artistry<br />Redefined
                        </h1>
                        <p style={{
                            fontSize: "16px",
                            lineHeight: "1.6",
                            color: "#ccc",
                            margin: "0"
                        }}>
                            Where culinary craftsmanship meets modern elegance. Indulge in the finest sushi, expertly curated to elevate your dining experience.
                        </p>
                    </div>
                    <div style={{
                        width: "280px",
                        height: "180px",
                        border: "1px solid #444",
                        borderRadius: "15px",
                        backgroundColor: "rgba(24, 24, 24, 0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        overflow: "hidden",
                        position: "relative"
                    }}>
                        <img 
                            src="./dining-scene.webp" 
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: "12px"
                            }}
                            alt="Elegant Dining"
                        />
                        <div style={{
                            position: "absolute",
                            top: "15px",
                            right: "15px",
                            width: "40px",
                            height: "40px",
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer"
                        }}>
                            <span style={{color: "#333", fontSize: "16px"}}>→</span>
                        </div>
                    </div>
                </div>

                {/* Middle Section - Awards */}
                <div style={{
                    display: "flex",
                    gap: "15px",
                    flex: "0 0 auto"
                }}>
                    <div style={{
                        flex: 1,
                        textAlign: "center",
                        padding: "25px 15px",
                        border: "1px solid #333",
                        borderRadius: "15px",
                        backgroundColor: "rgba(15, 15, 15, 0.8)",
                        position: "relative"
                    }}>
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "10px"
                        }}>
                            {[...Array(5)].map((_, i) => (
                                <span key={i} style={{color: "#FFD700", fontSize: "14px"}}>★</span>
                            ))}
                        </div>
                        <h3 style={{
                            fontSize: "16px",
                            fontWeight: "400",
                            margin: "0 0 5px 0",
                            color: "rgb(239, 231, 210)",
                            textTransform: "uppercase",
                            letterSpacing: "1px"
                        }}>Trip Advisor</h3>
                        <p style={{
                            fontSize: "12px",
                            color: "#999",
                            margin: "0",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px"
                        }}>Best Sushi</p>
                    </div>
                    <div style={{
                        flex: 1,
                        textAlign: "center",
                        padding: "25px 15px",
                        border: "1px solid #333",
                        borderRadius: "15px",
                        backgroundColor: "rgba(15, 15, 15, 0.8)"
                    }}>
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "10px"
                        }}>
                            {[...Array(5)].map((_, i) => (
                                <span key={i} style={{color: "#FFD700", fontSize: "14px"}}>★</span>
                            ))}
                        </div>
                        <h3 style={{
                            fontSize: "16px",
                            fontWeight: "400",
                            margin: "0 0 5px 0",
                            color: "rgb(239, 231, 210)",
                            textTransform: "uppercase",
                            letterSpacing: "1px"
                        }}>Michelin Guide</h3>
                        <p style={{
                            fontSize: "12px",
                            color: "#999",
                            margin: "0",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px"
                        }}>Quality Food</p>
                    </div>
                    <div style={{
                        flex: 1,
                        textAlign: "center",
                        padding: "25px 15px",
                        border: "1px solid #333",
                        borderRadius: "15px",
                        backgroundColor: "rgba(15, 15, 15, 0.8)"
                    }}>
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "10px"
                        }}>
                            {[...Array(5)].map((_, i) => (
                                <span key={i} style={{color: "#FFD700", fontSize: "14px"}}>★</span>
                            ))}
                        </div>
                        <h3 style={{
                            fontSize: "16px",
                            fontWeight: "400",
                            margin: "0 0 5px 0",
                            color: "rgb(239, 231, 210)",
                            textTransform: "uppercase",
                            letterSpacing: "1px"
                        }}>Start Dining</h3>
                        <p style={{
                            fontSize: "12px",
                            color: "#999",
                            margin: "0",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px"
                        }}>Cool Vibe</p>
                    </div>
                </div>

                {/* Bottom Section - Our Story */}
                <div style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "20px",
                    flex: "1 1 auto"
                }}>
                    <div style={{
                        width: "200px",
                        height: "120px",
                        border: "1px solid #444",
                        borderRadius: "10px",
                        backgroundColor: "rgba(24, 24, 24, 0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        flexShrink: 0,
                        transition: "all 0.3s ease",
                        overflow: "hidden"
                    }}>
                        <img 
                            src="./chef-preparing.webp" 
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: "8px"
                            }}
                            alt="Chef Preparing Sushi"
                        />
                    </div>
                    <div style={{flex: 1}}>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "15px",
                            gap: "15px"
                        }}>
                            <div style={{
                                width: "30px",
                                height: "1px",
                                backgroundColor: "#444"
                            }}></div>
                            <div style={{
                                width: "6px",
                                height: "6px",
                                border: "1px solid #444",
                                transform: "rotate(45deg)"
                            }}></div>
                            <h2 style={{
                                fontSize: "24px",
                                fontWeight: "lighter",
                                margin: "0",
                                color: "rgb(239, 231, 210)",
                                textTransform: "uppercase",
                                letterSpacing: "2px"
                            }}>Our Story</h2>
                            <div style={{
                                width: "6px",
                                height: "6px",
                                border: "1px solid #444",
                                transform: "rotate(45deg)"
                            }}></div>
                            <div style={{
                                width: "30px",
                                height: "1px",
                                backgroundColor: "#444"
                            }}></div>
                        </div>
                        <p style={{
                            fontSize: "16px",
                            lineHeight: "1.6",
                            color: "#ccc",
                            margin: "0"
                        }}>
                            Founded with a passion for culinary excellence, Qitchen's journey began in the heart of Prague. Over years, it evolved into a haven for sushi enthusiasts, celebrated for its artful mastery and devotion to redefining gastronomy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;
