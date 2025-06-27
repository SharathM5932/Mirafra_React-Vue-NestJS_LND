import React from 'react'
import '../../styles/AboutUs.css'
import { Link } from 'react-router-dom'
function About() {
  return (
    <div className='about'>  
      <h1 className='h1'>About Us</h1>.
     
        <div className='first-section'>
        <h2 className='h2'>Welcome to Farm2Fam,</h2> your trusted online marketplace for fresh,
        high-quality fruits and vegetables, delivered right to your doorstep! Our mission is to bring the farm directly to your family,
        offering you the best produce straight from local farms. We believe in the power of fresh,
        wholesome food to nourish bodies and bring communities together.
        <div><br></br>

        <strong>Our Story Farm2Fam </strong><br/><br/> was born out of a simple idea: to bridge the gap between local farmers and households looking for fresh, healthy produce. We understand that time is precious, so we’ve made it easier than ever to access farm-fresh fruits and vegetables with just a few clicks. 
        By partnering directly with local farmers, we ensure that the produce you receive is not only fresh and delicious but also sustainably grown.
        </div><br></br>

      <div>
       <strong> What We Offer</strong><br/><br/>
        We offer a wide variety of fresh, seasonal fruits and vegetables, carefully curated to meet the highest quality standards. 
        From crisp greens and juicy tomatoes to succulent fruits like apples, berries, and citrus,
        our selection is perfect for anyone who values nutritious and flavorful food.
        Whether you’re a health-conscious foodie, a busy parent, or someone who just loves 
        cooking with the freshest ingredients, we’ve got something for everyone. We also cater to special dietary needs with organic,
        gluten-free, and other specialty options.
    </div><br/>

    <div>
    <strong> Why Choose Us?</strong><br/><br/>
    Freshness Guaranteed: Our produce is sourced directly from local farms, ensuring the freshest fruits and vegetables delivered to you.
    Support Local Farmers: By shopping with us, you’re supporting small, local farmers who care about sustainable farming practices.
    Convenience: No need to visit the store — get farm-fresh produce delivered right to your home.
    Quality You Can Trust: We carefully select only the highest quality products, handpicked and delivered with care.
    </div><br/><br/>
    <div>
    <strong> Our Promise to You </strong><br/><br/>
    At Farm2Fam, we are committed to providing our customers with the best experience possible. 
    From the moment you place an order to the time your produce arrives at your door,
    we ensure that every step of the process is handled with care, speed, 
    and attention to detail. We believe that good food can change the way we live, 
    and we’re proud to be a part of that journey with you.
    Thank you for choosing Farm2Fam — where fresh food meets convenience!
    </div>

  </div>
  <Link to="/"><button className="about-btn">Back</button></Link>
        
</div>
  
  )
}

export default About