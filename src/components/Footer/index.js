import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="contact-us-container">
    <div>
      <FaGoogle className="contact-us-icons" />
      <FaTwitter className="contact-us-icons" />
      <FaInstagram className="contact-us-icons" />
      <FaYoutube className="contact-us-icons" />
    </div>
    <p className="contact-us-heading">Contact Us</p>
  </div>
)
export default Footer
