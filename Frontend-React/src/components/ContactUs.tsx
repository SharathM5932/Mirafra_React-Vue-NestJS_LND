import React, { useState } from 'react';
import './ContactUs.css'; // <-- note the plain CSS file

const ContactUs: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("We'll reach out to you soon");
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="contact-wrapper">
            <div className="contact-card">
                <h2 className="contact-title">Contact Us</h2>

                <div className="contact-info">
                    <p><strong>Address:</strong> 409 Fair St
                        Carmel, New York(NY), 10512</p>
                    <p><strong>Email:</strong> mystore@commerce.com</p>
                    <p><strong>Phone:</strong> +91 99999 99999</p>
                </div>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            placeholder="How can we help you?"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-btn">Send Message</button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
