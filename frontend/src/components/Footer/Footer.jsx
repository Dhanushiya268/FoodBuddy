import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <h2 style={{color:"#FF6B35", margin:"0", fontSize:"28px", fontWeight:"bold"}}>FoodBuddy</h2>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
             <img src={assets.twitter_icon} alt="" />
              <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>FoodBuddy</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>

        </div>

        <div className="footer-content-right">
          <h2>GET IN TOUCH </h2>
          <ul>
            <li>+91-7456743423</li>
            <li>foodbuddy@gmail.com</li>
          </ul>

        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 $ FoodBuddy.com - All Rights Reserved.</p>
    </div>
  );
};

export default Footer;
