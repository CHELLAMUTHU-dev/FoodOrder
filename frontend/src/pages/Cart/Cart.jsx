import React ,{ useContext } from "react";
import {useNavigate} from 'react-router-dom'
import { StoreContext } from "../../context/StoreContext";
import "./Cart.css";

const Cart = () => {
  const { cartData, food_list, removeFromCart,getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate()


  return (
    <div className="cart">
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
        {food_list.map((item) => {
          if (cartData[item._id] > 0) {
            return (
              <React.Fragment key={item._id}>
                <div  className="cart-items-title cart-items-items">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartData[item._id]}</p>
                  <p>${item.price * cartData[item._id]}</p>
                  <p className="close" onClick={() => removeFromCart(item._id)}>x</p>
                </div>
                <hr />
              </React.Fragment>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
                <div className="cart-total-details">
                    <p>Subtotal</p>
                    <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                    <p>Delivery Fee</p>
                    <p>${getTotalCartAmount() === 0? 0: getTotalCartAmount()+2}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                    <b>Total</b>
                    <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount()+2}</b>
                </div>
            </div>
            <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promo-code">
            <div>
                <p>If you have a promo code, Enter it here </p>
                <div className="cart-promo-code-input">
                    <input type="text" placeholder="Promo code" />
                    <button type="button">Submit</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
