import React, { useState,useContext } from 'react';
import {BeatLoader} from 'react-spinners';
import './ExploreMenu.css';
import { StoreContext } from '../../context/StoreContext';

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS'
}

const ExploreMenu = () => {
    const {changeCategory , category} = useContext(StoreContext);

    const [apiStatus, setApiStatus] = useState({
        status: apiStatusConstants.initial,
        data: [],
    });

    const fetchMenuItems = async () => {
        setApiStatus(prevState => ({
            ...prevState,
            status: apiStatusConstants.inProgress,
        }));
        try {
            const response = await fetch('http://localhost:5000/restaurant/menu'); // Replace with your API endpoint
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setApiStatus({status: apiStatusConstants.success, data});
        } catch (error) {
            console.error('Error fetching menu items:', error);
            setApiStatus({status: apiStatusConstants.failure, data: []});
        }
    };

    React.useEffect(() => {
        fetchMenuItems();
    }, []);

    const renderMenuItems = () => {
        const {status, data} = apiStatus;
        switch (status) {
            case apiStatusConstants.inProgress:
                return <div className='loader-container'>
                            <BeatLoader color="tomato" size={10} className="loader" />
                        </div>
            case apiStatusConstants.success:
                return data.map(item => (
                    <div
                        onClick={() => {
                            const newCategory = category === item.menu_name ? "All" : item.menu_name;
                            changeCategory(newCategory);
                        }}
                        key={item._id}
                        className="explore-menu-list-item"
                    >
                        <img src={item.menu_image} alt="" className={category === item.menu_name ? "active" : ""} />
                        <p>{item.menu_name}</p>
                    </div>
                ));
            case apiStatusConstants.failure:
                return <p>Error fetching menu items. Please try again later.</p>;
            default:
                return null;
        }
}

        return (
        <div className='explore-menu'   id='explore-menu'>
            <h1>Explore our menu</h1>
            <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings amd elevate your dining experience, one delicious meal at a time.</p>
            <div className="explore-menu-list">
                {renderMenuItems()}
            </div>
            <hr />
        </div>
        )
}

export default ExploreMenu
