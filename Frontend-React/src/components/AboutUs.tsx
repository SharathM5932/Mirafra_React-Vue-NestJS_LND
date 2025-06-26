import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AboutUs: React.FC = () => {
  return (
    <section className="py-5 bg-light">
      {/* Hero Section */}
      <div className="container text-center mb-5">
        <h2 className="display-5 fw-bold text-dark mb-4">Crafted for You. Powered by Purpose.</h2>
        <p className="lead text-muted">
          At MyStore, we bring together cutting-edge electronics, fashion-forward apparel,
          and everyday accessories—designed for modern lifestyles and built to last.
          We believe quality and sustainability go hand in hand.
        </p>
        <img
          src="../assets/6.jpg"
          alt="About Us"
          className="img-fluid rounded mb-2"
        />
        <a href="#learn-more" className="btn btn-dark mt-3">Learn More →</a>
      </div>

      {/* About Content Section */}
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-md-6">
            <h3 className="fw-semibold">Our Mission</h3>
            <p className="text-muted">
              We’re not just another store. We’re a movement toward smarter, more responsible consumption.
              From responsibly sourced materials to transparent practices, we put our customers and the planet first.
            </p>
            <h3 className="fw-semibold mt-4">What We Offer</h3>
            <ul className="text-muted">
              <li>Eco-conscious electronics and apparel</li>
              <li>Fast and reliable shipping worldwide</li>
              <li>Responsive 24/7 customer support</li>
              <li>Secure checkout and seamless returns</li>
            </ul>
          </div>
          <div className="col-md-6">
            <img
              src="../assets/5.jpg" // Optional supporting image
              alt="Our Products"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>
      </div>

      {/* Final Call to Action */}
      <div className="container text-center mt-5">
        <h4 className="fw-bold mb-3">Join thousands of happy customers today.</h4>
        <a href="/" className="btn btn-outline-dark btn-lg">Start Shopping</a>
      </div>
    </section>
  );
};

export default AboutUs;
