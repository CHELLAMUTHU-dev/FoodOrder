import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './FoodDisplay.css';
import FoodItem from '../FoodItem/FoodItem';


const FoodDisplay = () => {

    const {food_list,category,error,fetchData} = useContext(StoreContext);
    // If category is provided, filter the food_list based on the category
    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {food_list.map((item) => {
                    if(category === "All" || category === item.category) {  //filter by category
                        return <FoodItem key={item._id} foodItem={item}/>
                    }
                })}
                {error && <div className='failure-view'><img src="https://res.cloudinary.com/dwo2f3fyw/image/upload/v1749633427/Group_7484_kf3h6a.png" alt="" />
                        <p>Server connection error</p>
                    <button type="button" onClick={fetchData}>Try again</button>
                </div>}
            </div>
        </div>
    )
}

export default FoodDisplay
