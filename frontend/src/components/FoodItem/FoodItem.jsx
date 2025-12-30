import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const FoodItem = ({id, name, price, description,image}) => {
  
  const {cartItems, addToCart, removeFromCart,url}=useContext(StoreContext);
  const navigate = useNavigate();
  
  // Use local image if available (from static assets), otherwise use backend URL
  const getImageSource = () => {
    // If image is already a require/import (from static assets), use it directly
    if (typeof image === 'string' && !image.includes('/')) {
      return image;
    }
    // Otherwise try backend URL
    return url+"/images/"+image;
  };
  
  return (
    <div className='food-item' id={`food-${id}`}>
      <div className="food-item-img-container">
        <img className='food-item-image' src={getImageSource()} alt="" onError={(e) => { e.target.src = assets.food_1; }} />
        {!cartItems[id]
        ? <img className='add' onClick={async (e) => { e && e.preventDefault && e.preventDefault(); e && e.stopPropagation && e.stopPropagation(); await addToCart(id); navigate('/cart'); }} src={assets.add_icon_white} alt=""/>
        : <div className='food-item-counter'>
          <img onClick={(e)=>{ e && e.preventDefault && e.preventDefault(); e && e.stopPropagation && e.stopPropagation(); removeFromCart(id); }} src={assets.remove_icon_red} alt="" />
          <p>{cartItems[id]}</p>
          <img onClick={async (e)=>{ e && e.preventDefault && e.preventDefault(); e && e.stopPropagation && e.stopPropagation(); await addToCart(id); navigate('/cart'); }} src={assets.add_icon_green} alt="" />
          </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className='food-item-desc'>{description}</p>
        <p className='food-item-price'>₹{price}</p>
      </div>
      
    </div>
  )
}

export default FoodItem
