import { useContext } from 'react';
import { FaPlus, FaMinus } from "react-icons/fa6";
import './FoodItem.css';
import rating_starts from '../../assets/rating_starts.png';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ foodItem }) => {
    const { cartData, addToCart, removeFromCart } = useContext(StoreContext);
    const { _id, name, price, description, image } = foodItem;
    
    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                <img className='food-item-image' src={image} alt={name} />
                
                {!cartData[_id] ? (
                    <button 
                        className='add' 
                        type='button' 
                        onClick={() => addToCart(_id)}
                    >
                        <FaPlus size={10} color='#212121'/>
                    </button>
                ) : (
                    <div className="food-item-counter">
                        <button 
                            type='button' 
                            className='counter-btn minus'
                            onClick={() => removeFromCart(_id)}
                        >
                            <FaMinus color='red' size={6}/>
                        </button>
                        <p>{cartData[_id]}</p>
                        <button 
                            type='button' 
                            className='counter-btn plus'
                            onClick={() => addToCart(_id)}
                        >
                            <FaPlus size={6} color='green'/>
                        </button>
                    </div>
                )}
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={rating_starts} alt={`Rating for ${name}`} />
                </div>
                <p className="food-item-desc">{description}</p>
                <p className="food-item-price">${price.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default FoodItem;