import React from 'react'
import './Header.css'
import { assets } from '../../assets/assets'

const Header = () => {
  const handleViewMenu = () => {
    const menuSection = document.getElementById('explore-menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className='header'>
      <img className='header-bg' src={assets.header_img} alt='header background' />
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>Enjoy a wide variety of flavorful dishes made with fresh ingredients and expert care. We're here to make every meal satisfying, convenient, and unforgettable.</p>
        <button onClick={handleViewMenu}>View Menu</button>
      </div>
    </div>
  )
}

export default Header
