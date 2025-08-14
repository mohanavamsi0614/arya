import "./App.css";
import Navbar from './components/Navbar';
import photo1 from "/media/ARYA-33-2.jpg";
import photo2 from "/media/ARYA-59-2.jpg";
import photo3 from "/media/ARYA-15-3.jpg";
import photo4 from "/media/ARYA-34-2.jpg";
import mainDish from "/media/ARYA-122.jpg";

function Contact() {
  return (
    <div className="contact-container">
      {/* Left Side Image and Headig */}
      <div className="contact-image">
        <Navbar />
        <img src={mainDish} alt="Main Dish" />
        <h1 className="contact-heading">Contact</h1>
      </div>
      <div className="contact-details">
        <div className="contact-details-content1">
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

            {/* Image Gi */}
            <div className="contact-image-grid">
                <div className="contact-image-row1">
                    <div className="contact-image-item-1">
                        <img src={photo1} alt="Dish 1" />
                    </div>
                    <div className="contact-image-item-2">
                        <img src={photo2} alt="Dish 2" />
                    </div>
                </div>
                <div className="contact-image-row2">
                    <div className="contact-image-item-3">
                        <img src={photo3} alt="Chef preparing" />
                    </div>
                    <div className="contact-image-item-4">
                        <img src={photo4} alt="Sprinkling salt" />
                    </div>
                </div>
            </div>
        </div>

        <div className="contact-details-content2">
            {/* Map */}
            <div className="contact-map-container">
                    <iframe
                        title="Restaurant Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2295.3234451748713!2d-2.9111019!3d54.8796901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487d1bb242d0602b%3A0x849546d66e6daa08!2sARYA%20Asian%20restaurant%20%26%20Bar!5e0!3m2!1sen!2sin!4v1753896189691!5m2!1sen!2sin"
                        width="100%"
                        height="200"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    />
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
                <div className="contact-info-container">
                        <div className="contact-info-details">
                <p className="contact-info-title">
                    ADDRESS
                </p>
                <p className="contact-info-title-details">
                        23 Greenfield Avenue,<br />
                    Prague 120 00
                    </p>
                </div>

                <div className="contact-info-details">
                <p className="contact-info-title">
                    PHONE
                </p>
                <p className="contact-info-title-details">
                    +42 1234 567890
                </p>
                </div>
                <div className="contact-info-details">
                <p className="contact-info-title">
                    EMAIL
                </p>
                <p className="contact-info-title-details">
                    info@qitchen.com
                </p>
                </div>
                <div className="contact-info-details">
                <p className="contact-info-title">
                    FOLLOW
                </p>
                <p className="contact-info-title-details">
                    [Social Media Icons Placeholder]
                </p>
                </div>
                </div>
            </div>
        </div>
        <div className="contact-footer">
          <p className="contact-footer-text">&copy; 2023 Arya Restaurant. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
