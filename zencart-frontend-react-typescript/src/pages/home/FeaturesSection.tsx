import {
  Truck,
  Shield,
  CreditCard,
  HeadphonesIcon,
  RefreshCw,
  Award,
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Truck size={40} />,
      title: "Free Shipping",
      description: "Free shipping on orders over $50",
    },
    {
      icon: <Shield size={40} />,
      title: "Secure Payment",
      description: "100% secure payment processing",
    },
    {
      icon: <CreditCard size={40} />,
      title: "Easy Returns",
      description: "30-day hassle-free returns",
    },
    {
      icon: <HeadphonesIcon size={40} />,
      title: "24/7 Support",
      description: "Round-the-clock customer support",
    },
    {
      icon: <RefreshCw size={40} />,
      title: "Money Back",
      description: "100% money-back guarantee",
    },
    {
      icon: <Award size={40} />,
      title: "Quality Promise",
      description: "Premium quality products only",
    },
  ];

  return (
    <section className="features-section">
      <div className="container">
        <h1 className="features-title">Why Choose ZenCart?</h1>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
