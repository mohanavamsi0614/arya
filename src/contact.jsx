import "./App.css";

function Contact() {
  return (
    <div className="contact-container">
      {/* Left Side Image and Heading */}
      <div className="contact-image">
        <img src="media/GFiteaJ9X1ZXtx4cQeiT1DzpA.webp" alt="Main Dish" />
        <h1 className="contact-heading">Contact</h1>
      </div>
      
      {/* Right Side Content */}
      <div className="contact-details">
        {/* Opening Hours Card */}
        <div className="contact-opening-hours">
            <div className="contact-category-decor">
              <span className="diamond-line left">
                <span className="diamond-shape" />
                <span className="line-shape" />
              </span>
              <h2 className="contact-opening-hours-heading">Opening <br /> Hours</h2>
              <span className="diamond-line right">
                <span className="line-shape" />
                <span className="diamond-shape" />
              </span>
            </div>
            <ul className="contact-opening-hours-list">
              <li>
                <span>Mon</span>
                <div className='ckcjc7'>
                  <div className="c1az4bwh"></div>
                </div>
                <span>16:00 - 22:30</span>
              </li>
              <li>
                <span>Tue</span>
                <div className='ckcjc7'>
                  <div className="c1az4bwh"></div>
                </div>
                <span>16:00 - 22:30</span>
              </li>
              <li>
                <span>Wed</span>
                <div className='ckcjc7'>
                  <div className="c1az4bwh"></div>
                </div>
                <span>16:00 - 22:30</span>
              </li>
              <li>
                <span>Thu</span>
                <div className='ckcjc7'>
                  <div className="c1az4bwh"></div>
                </div>
                <span>16:00 - 22:30</span>
              </li>
              <li>
                <span>Fri</span>
                <div className='ckcjc7'>
                  <div className="c1az4bwh"></div>
                </div>
                <span>16:00 - 22:30</span>
              </li>
              <li>
                <span>Sat & Sun</span> 
                <div className='ckcjc7'>
                  <div className="c1az4bwh"></div>
                </div>
                <span>16:00 - 22:30</span>
              </li>
            </ul>
          </div>

          {/* Image Grid */}
          <div className="contact-image-grid">
              <div className="contact-image-item-1">
                <img src="media/GFiteaJ9X1ZXtx4cQeiT1DzpA.webp" alt="Dish 1" />
              </div>
              <div className="contact-image-item-2">
                <img src="media/5MZ021glbQW94mvUOxalCyrZkY.webp" alt="Dish 2" />
              </div>
              <div className="contact-image-item-3">
                <img src="media/ZM8uTOLkdF1KBhpdRUj3MFzkCIM.webp" alt="Chef preparing" />
              </div>
              <div className="contact-image-item-4">
                <img src="media/Rh7B5c6lHXPxmiGfzpWOdSYW5M.avif" alt="Sprinkling salt" />
              </div>
          </div>

        {/* Bottom Section - Map and Contact Info */}
        <div className="contact-details-content2">
          {/* Map */}
          <div className="contact-map-container">
            <div>
              <iframe
                title="Restaurant Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2761.5490940136636!2d7.445844476353872!3d46.94827173240617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478e39241e9f7d3f%3A0xefdccfb62c37e882!2sBern!5e0!3m2!1sen!2sch!4v1626266742895!5m2!1sen!2sch"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="contact-info">
            <div className="contact-category-decor">
              <span className="diamond-line left">
                <span className="diamond-shape" />
                <span className="line-shape" />
              </span>
              <h3 className="contact-info-heading">GET IN<br />TOUCH</h3>
              <span className="diamond-line right">
                <span className="line-shape" />
                <span className="diamond-shape" />
              </span>
            </div>
            <p>
              ADDRESS<br />
              23 Greenfield Avenue,<br />
              Prague 120 00
            </p>
            <p>
              PHONE<br />
              +42 1234 567890
            </p>
            <p>
              EMAIL<br />
              info@qitchen.com
            </p>
            <p>
              FOLLOW<br />
              [Social Media Icons Placeholder]
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
