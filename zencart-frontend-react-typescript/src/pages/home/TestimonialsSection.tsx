import React from "react";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Tang San",
      role: "Verified Buyer",
      rating: 5,
      review:
        "Amazing quality and fast shipping! The iPhone 14 Pro exceeded my expectations. Great customer service too.",
      avatar: "TS",
    },
    {
      name: "Sharath M",
      role: "Tech Professional",
      rating: 5,
      review:
        "The ThinkPad X1 is perfect for my work needs. Excellent build quality and performance. Highly recommended!",
      avatar: "SM",
    },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={index < rating ? "star-filled" : "star-empty"}
        fill={index < rating ? "#ffd700" : "none"}
        stroke={index < rating ? "#ffd700" : "#ddd"}
      />
    ));
  };

  return (
    <section className="testimonials-section">
      <div className="container">
        <h2 className="testimonials-title">What Our Customers Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-header">
                <div className="avatar">{testimonial.avatar}</div>
                <div className="customer-info">
                  <h4 className="customer-name">{testimonial.name}</h4>
                  <p className="customer-role">{testimonial.role}</p>
                </div>
              </div>
              <div className="rating">{renderStars(testimonial.rating)}</div>
              <p className="review-text">"{testimonial.review}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
