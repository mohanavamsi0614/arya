import "./App.css";
import Navbar from './components/Navbar';
import blogData from './blog.json'; 

function Blog() {
  return (
    <div className="blog-container">
      {/* Left Side Image and Heading */}
      <div className="blog-image">
        <Navbar />
        <img src="media/6a8qNYg1gpgcfV9CqkcCVJatnA.webp" alt="Main Dish" />
        <h1 className="blog-heading">Blog</h1>
      </div>

      {/* Right Side Content */}
      <div className="blog-right">
      <div className="blog-content">
        {/* <div className="blog-content-inner"> */}
          {/* <div className="blog-content-text"> */}
            {/* <div className="blog-content-heading-inner"> */}
              <div className="blog-content-heading">
                <span className="diamond-line left">
                  <span className="diamond-shape" />
                  <span className="line-shape" />
                </span>
                <h2>Latest News</h2>
                <span className="diamond-line right">
                  <span className="line-shape" />
                  <span className="diamond-shape" />
                </span>
              </div>
            {/* </div> */}

            <div className="blogs-content">
              {blogData.map((blog, index) => (
                  <div className="blog-content-item" key={index}>
                    <img src={blog.image} alt={blog.title} className="blog-thumbnail" />
                    <div className="blog-content-item-text">
                      <div className="blog-content-item-header">
                        <span className="diamond-line left">
                          <span className="diamond-shape" />
                       </span>
                        <p className="blog-date">{blog.date}</p>
                      </div>
                      <h3 className="blog-title">{blog.title}</h3>
                      <p className="blog-description">{blog.content}</p>
                    </div>
                  </div>
                ))}
            </div>
          {/* </div> */}
        {/* </div> */}
      </div>
      {/* <div className="reservation-footer">
            <p className="reservation-footer-text">
              By submitting, you agree to our Terms of Service and  Privacy Policy
            </p>
      </div> */}
      </div>
    </div>
  );
}

export default Blog;
