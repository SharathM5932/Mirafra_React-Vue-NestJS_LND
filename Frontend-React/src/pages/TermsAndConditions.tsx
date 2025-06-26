import React, { useEffect } from 'react';
import './terms.css';

const TermsAndConditions: React.FC = () => {
  useEffect(() => {
    // Animation effect for when component mounts
    const elements = document.querySelectorAll('.terms-section, .terms-title');
    elements.forEach((el, index) => {
      (el as HTMLElement).style.animationDelay = `${index * 0.1}s`;
    });
  }, []);

  return (
    <div className="terms-container">
      <div className="terms-header">
        <h1 className="terms-title animate-fade-in-up">Terms & Conditions</h1>
        <div className="terms-divider"></div>
      </div>

      <div className="terms-content">
        <section className="terms-section animate-fade-in-up">
          <h2 className="terms-subtitle">1. Introduction</h2>
          <p className="terms-text">
            Welcome to our ecommerce platform. By accessing or using our website, you agree to be bound by these Terms and Conditions. 
            If you disagree with any part of these terms, please do not use our website.
          </p>
        </section>

        <section className="terms-section animate-fade-in-up">
          <h2 className="terms-subtitle">2. Intellectual Property</h2>
          <p className="terms-text">
            The content, organization, graphics, design, and other matters related to this site are protected under applicable copyrights, 
            trademarks, and other proprietary rights. The copying, redistribution, or publication by you of any part of this site is strictly prohibited.
          </p>
        </section>

        <section className="terms-section animate-fade-in-up">
          <h2 className="terms-subtitle">3. User Account</h2>
          <p className="terms-text">
            If you create an account on our website, you are responsible for maintaining the security of your account and for all activities 
            that occur under the account. You must immediately notify us of any unauthorized uses of your account or any other breaches of security.
          </p>
        </section>

        <section className="terms-section animate-fade-in-up">
          <h2 className="terms-subtitle">4. Products and Pricing</h2>
          <p className="terms-text">
            All products and services are subject to availability. We reserve the right to discontinue any product at any time. Prices for our 
            products are subject to change without notice. We shall not be liable to you or to any third-party for any modification, price change, 
            suspension, or discontinuance of the service.
          </p>
        </section>

        <section className="terms-section animate-fade-in-up">
          <h2 className="terms-subtitle">5. Payment and Billing</h2>
          <p className="terms-text">
            You agree to provide current, complete, and accurate purchase and account information for all purchases made on our website. You agree 
            to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so 
            that we can complete your transactions and contact you as needed.
          </p>
        </section>

        <section className="terms-section animate-fade-in-up">
          <h2 className="terms-subtitle">6. Returns and Refunds</h2>
          <p className="terms-text">
            Our Return & Refund Policy forms part of these Terms and Conditions. Please review this policy carefully before making any purchases.
          </p>
        </section>

        <section className="terms-section animate-fade-in-up">
          <h2 className="terms-subtitle">7. Limitation of Liability</h2>
          <p className="terms-text">
            In no event shall we be liable for any direct, indirect, incidental, special, consequential, or punitive damages resulting from your 
            access to or use of, or inability to access or use, this website or any content on the website.
          </p>
        </section>

        <section className="terms-section animate-fade-in-up">
          <h2 className="terms-subtitle">8. Changes to Terms</h2>
          <p className="terms-text">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by 
            posting the new Terms on this page. Your continued use of the website after any such changes constitutes your acceptance of the new Terms.
          </p>
        </section>

        <section className="terms-section animate-fade-in-up">
          <h2 className="terms-subtitle">9. Contact Information</h2>
          <p className="terms-text">
            If you have any questions about these Terms, please contact us at support@yourstore.com.
          </p>
        </section>
      </div>

      <div className="terms-footer animate-fade-in">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default TermsAndConditions;