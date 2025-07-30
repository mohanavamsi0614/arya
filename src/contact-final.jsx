function Contact() {
  return (
    <div style={{
      width: '100%',
      height: '100vh',
      backgroundColor: 'rgb(253, 251, 246)',
      display: 'flex',
      overflow: 'hidden'
    }}>
      {/* Left Side - 50% width for the image */}
      <div style={{
        width: '50%',
        height: '100vh',
        position: 'relative',
        display: 'flex',
        overflow: 'hidden'
      }}>
        {/* Background Image */}
        <img 
          src="./about-left.webp"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center'
          }}
          alt=""
        />
        
        {/* Gradient Overlay */}
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          width: '100%',
          height: '40%',
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)',
          opacity: '0.8'
        }}></div>
        
        {/* Contact Title */}
        <div style={{
          position: 'absolute',
          bottom: '48px',
          left: '64px',
          right: '48px'
        }}>
          <h1 style={{
            fontFamily: '"Forum", sans-serif',
            fontSize: '128px',
            fontWeight: '400',
            lineHeight: '1',
            color: 'rgb(239, 231, 210)',
            margin: '0',
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>
            Contact
          </h1>
        </div>
      </div>

      {/* Right Side - 50% width with dark background */}
      <div style={{
        width: '50%',
        height: '100vh',
        backgroundColor: 'rgb(10, 11, 10)',
        borderTopLeftRadius: '24px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        padding: '32px 32px 32px 48px'
      }}>
        
        {/* Rounded corner element */}
        <div style={{
          position: 'absolute',
          left: '-24px',
          bottom: '0',
          width: '24px',
          height: '24px'
        }}>
          <svg style={{ width: '100%', height: '100%' }}>
            <path d="M 24 24 L 24 0 C 24 13.255 13.255 24 0 24 Z" fill="rgb(10, 11, 10)" />
          </svg>
        </div>

        {/* Opening Hours Card */}
        <div style={{
          backgroundColor: 'rgb(30, 30, 30)',
          borderRadius: '24px',
          padding: '40px',
          border: '1px solid rgb(51, 51, 48)',
          marginBottom: '32px'
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px',
            gap: '16px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                border: '1px solid rgb(51, 51, 48)',
                transform: 'rotate(-45deg)',
                backgroundColor: 'transparent'
              }}></div>
              <div style={{
                width: '40px',
                height: '1px',
                backgroundColor: 'rgb(51, 51, 48)'
              }}></div>
            </div>
            
            <h4 style={{
              fontFamily: '"Forum", sans-serif',
              fontSize: '32px',
              fontWeight: '400',
              lineHeight: '1.2',
              color: 'rgb(239, 231, 210)',
              margin: '0',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Opening<br/>Hours
            </h4>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '40px',
                height: '1px',
                backgroundColor: 'rgb(51, 51, 48)'
              }}></div>
              <div style={{
                width: '8px',
                height: '8px',
                border: '1px solid rgb(51, 51, 48)',
                transform: 'rotate(-45deg)',
                backgroundColor: 'transparent'
              }}></div>
            </div>
          </div>

          {/* Hours List */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            {[
              { day: 'Mon', time: '16:00 - 22:30' },
              { day: 'Tue', time: '16:00 - 22:30' },
              { day: 'Wed', time: '16:00 - 22:30' },
              { day: 'Thu', time: '16:00 - 22:30' },
              { day: 'Fri', time: '16:00 - 22:30' },
              { day: 'Sat & Sun', time: '16:00 - 22:30' }
            ].map((item, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <p style={{
                  fontFamily: '"Satoshi", sans-serif',
                  fontSize: '16px',
                  fontWeight: '400',
                  color: 'rgb(239, 231, 210)',
                  margin: '0'
                }}>{item.day}</p>
                
                <div style={{
                  flex: '1',
                  margin: '0 20px',
                  height: '1px',
                  border: '1px dotted rgb(51, 51, 48)',
                  borderLeft: 'none',
                  borderRight: 'none',
                  borderBottom: 'none'
                }}></div>
                
                <p style={{
                  fontFamily: '"Satoshi", sans-serif',
                  fontSize: '16px',
                  fontWeight: '400',
                  color: 'rgb(239, 231, 210)',
                  margin: '0'
                }}>{item.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Food Images Row */}
        <div style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '32px'
        }}>
          {[
            "./sushi-1.webp",
            "./sushi-2.webp", 
            "./chef-preparing.webp",
            "./sushi-3.webp"
          ].map((src, index) => (
            <div key={index} style={{
              width: '80px',
              height: '80px',
              borderRadius: '16px',
              overflow: 'hidden',
              position: 'relative',
              cursor: 'pointer'
            }}>
              <img 
                src={src}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                alt=""
              />
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                backgroundColor: 'rgba(20, 20, 19, 0.3)',
                opacity: '0',
                transition: 'opacity 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg style={{
                  width: '24px',
                  height: '24px',
                  fill: 'rgb(239, 231, 210)'
                }} viewBox="0 0 256 256">
                  <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"/>
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section - Map and Contact Info */}
        <div style={{
          display: 'flex',
          gap: '16px',
          flex: '1'
        }}>
          {/* Map */}
          <div style={{
            flex: '1',
            backgroundColor: 'rgb(30, 30, 30)',
            borderRadius: '24px',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2560.1558932!2d14.4378!3d50.0755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDA0JzMxLjgiTiAxNMKwMjYnMTYuMSJF!5e0!3m2!1sen!2s!4v1600000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 'none' }}
              loading="lazy"
            />
            
            {/* Show Route Button */}
            <div style={{
              position: 'absolute',
              bottom: '24px',
              right: '24px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: 'rgba(24, 24, 24, 0.5)',
                borderRadius: '500px',
                padding: '12px 20px',
                border: '1px solid rgb(51, 51, 48)',
                cursor: 'pointer'
              }}>
                <h6 style={{
                  fontFamily: '"Forum", sans-serif',
                  fontSize: '14px',
                  fontWeight: '400',
                  letterSpacing: '1px',
                  color: 'rgb(239, 231, 210)',
                  textTransform: 'uppercase',
                  margin: '0'
                }}>Show Route</h6>
                <svg style={{
                  width: '16px',
                  height: '16px',
                  fill: 'rgb(239, 231, 210)'
                }} viewBox="0 0 256 256">
                  <path d="M220.24,132.24l-72,72a6,6,0,0,1-8.48-8.48L201.51,134H40a6,6,0,0,1,0-12H201.51L139.76,60.24a6,6,0,0,1,8.48-8.48l72,72A6,6,0,0,1,220.24,132.24Z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Get in Touch Card */}
          <div style={{
            flex: '1',
            backgroundColor: 'rgb(30, 30, 30)',
            borderRadius: '24px',
            padding: '40px',
            border: '1px solid rgb(51, 51, 48)'
          }}>
            {/* Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '32px',
              gap: '16px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  border: '1px solid rgb(51, 51, 48)',
                  transform: 'rotate(-45deg)',
                  backgroundColor: 'transparent'
                }}></div>
                <div style={{
                  width: '40px',
                  height: '1px',
                  backgroundColor: 'rgb(51, 51, 48)'
                }}></div>
              </div>
              
              <h3 style={{
                fontFamily: '"Forum", sans-serif',
                fontSize: '32px',
                fontWeight: '400',
                lineHeight: '1.2',
                color: 'rgb(239, 231, 210)',
                margin: '0',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Get in<br/>touch
              </h3>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '40px',
                  height: '1px',
                  backgroundColor: 'rgb(51, 51, 48)'
                }}></div>
                <div style={{
                  width: '8px',
                  height: '8px',
                  border: '1px solid rgb(51, 51, 48)',
                  transform: 'rotate(-45deg)',
                  backgroundColor: 'transparent'
                }}></div>
              </div>
            </div>

            {/* Contact Info */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              {/* Address */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}>
                <p style={{
                  fontFamily: '"Satoshi", sans-serif',
                  fontSize: '12px',
                  fontWeight: '400',
                  letterSpacing: '1px',
                  color: 'rgb(239, 231, 210)',
                  textTransform: 'uppercase',
                  margin: '0'
                }}>Address</p>
                <p style={{
                  fontFamily: '"Satoshi", sans-serif',
                  fontSize: '16px',
                  fontWeight: '400',
                  color: 'rgb(239, 231, 210)',
                  margin: '0',
                  textAlign: 'right'
                }}>
                  23 Greenfield Avenue,<br/>
                  Prague 120 00
                </p>
              </div>

              {/* Phone */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <p style={{
                  fontFamily: '"Satoshi", sans-serif',
                  fontSize: '12px',
                  fontWeight: '400',
                  letterSpacing: '1px',
                  color: 'rgb(239, 231, 210)',
                  textTransform: 'uppercase',
                  margin: '0'
                }}>Phone</p>
                <p style={{
                  fontFamily: '"Satoshi", sans-serif',
                  fontSize: '16px',
                  fontWeight: '400',
                  color: 'rgb(239, 231, 210)',
                  margin: '0'
                }}>+42 1234 567890</p>
              </div>

              {/* Email */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <p style={{
                  fontFamily: '"Satoshi", sans-serif',
                  fontSize: '12px',
                  fontWeight: '400',
                  letterSpacing: '1px',
                  color: 'rgb(239, 231, 210)',
                  textTransform: 'uppercase',
                  margin: '0'
                }}>Email</p>
                <p style={{
                  fontFamily: '"Satoshi", sans-serif',
                  fontSize: '16px',
                  fontWeight: '400',
                  color: 'rgb(239, 231, 210)',
                  margin: '0'
                }}>info@qitchen.com</p>
              </div>

              {/* Follow */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <p style={{
                  fontFamily: '"Satoshi", sans-serif',
                  fontSize: '12px',
                  fontWeight: '400',
                  letterSpacing: '1px',
                  color: 'rgb(239, 231, 210)',
                  textTransform: 'uppercase',
                  margin: '0'
                }}>Follow</p>
                <div style={{
                  display: 'flex',
                  gap: '12px'
                }}>
                  {/* Social Icons */}
                  <a href="https://www.instagram.com/" style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: 'transparent',
                    border: '1px solid rgb(51, 51, 48)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none'
                  }}>
                    <svg style={{ width: '16px', height: '16px', fill: 'rgb(239, 231, 210)' }} viewBox="0 0 256 256">
                      <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"/>
                    </svg>
                  </a>
                  <a href="https://www.facebook.com/" style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: 'transparent',
                    border: '1px solid rgb(51, 51, 48)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none'
                  }}>
                    <svg style={{ width: '16px', height: '16px', fill: 'rgb(239, 231, 210)' }} viewBox="0 0 256 256">
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"/>
                    </svg>
                  </a>
                  <a href="https://twitter.com/" style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: 'transparent',
                    border: '1px solid rgb(51, 51, 48)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none'
                  }}>
                    <svg style={{ width: '16px', height: '16px', fill: 'rgb(239, 231, 210)' }} viewBox="0 0 256 256">
                      <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
