import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { food_list as static_food_list, assets } from '../../assets/assets'
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate=useNavigate();

  return (
    <div className="cart">
      <div className="container">
        <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
                {(() => {
                  const items = (food_list && food_list.length > 0) ? food_list : static_food_list;
                  const itemsInCart = items.filter(i => (cartItems[i._id] || 0) > 0);
                  if (itemsInCart.length === 0) {
                    return <p className="cart-empty">Your cart is empty.</p>;
                  }
                  return itemsInCart.map((item) => (
                    <div key={item._id}>
                      <div className="cart-items-title cart-items-item">
                        <img src={typeof item.image === 'object' ? item.image : url+"/images/"+item.image} alt="" onError={(e) => { e.target.src = assets.food_1; }} />
                        <p>{item.name}</p>
                        <p>₹{item.price}</p>
                        <p>{cartItems[item._id]}</p>
                        <p>₹{item.price * cartItems[item._id]}</p>
                        <p onClick={()=>removeFromCart(item._id)} className="cross">x</p>
                      </div>
                      <hr />
                    </div>
                  ));
                })()}
        </div>
        <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            {/* compute subtotal from available items (fallback to static list when backend not available) */}
            {(() => {
              const items = (food_list && food_list.length>0) ? food_list : static_food_list;
              const subtotal = items.reduce((sum, item) => {
                const qty = cartItems[item._id] || 0;
                return sum + item.price * qty;
              }, 0);
              const delivery = subtotal === 0 ? 0 : 2;
              const total = subtotal + delivery;
              return (
                <>
                  <div className="cart-total-details">
                    <p>Subtotal</p>
                    <p>₹{subtotal}</p>
                  </div>
                  <hr />
                  <div className="cart-total-details">
                    <p>Delivery Fee</p>
                    <p>₹{delivery}</p>
                  </div>
                  <hr />
                  <div className="cart-total-details">
                    <b>Total</b>
                    <b>₹{total}</b>
                  </div>
                </>
              )
            })()}
          </div>
           <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='promo code' />
              <button>Submit</button>

            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
