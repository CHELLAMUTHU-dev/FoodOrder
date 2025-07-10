import {createContext,useState,useEffect
} from 'react';
import Cookies from 'js-cookie'
import axios from 'axios'

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [food_list, setFoodList] = useState([]);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState('All');
    const [cartItems,setCartItems] = useState({})
    const [cartData,setCartData] = useState({})
    const url = 'http://localhost:5000'
    
    const token = Cookies.get('jwt_token')

    const changeCategory = (newCategory) => {
        setCategory(newCategory);
    }


    const addToCart = async (id) => {
       setCartData(prev => ({
            ...prev, 
            [id]: (prev[id] || 0) + 1
        }));
        if(token){
            await axios.post(url+"/restaurant/cart/add" , {itemId:id} , {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
        }
        
    }


    const removeFromCart = async (id) => {
        setCartData(prev => ({
            ...prev, [id]: prev[id] - 1
        }))
        if(token){
              await axios.post(url+"/restaurant/cart/remove" , {itemId:id} , {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
        }
    }
    
    const getTotalCartAmount = () => {
        let totalAmount = 0
        for(const item in cartData){
            if(cartData[item] > 0){
                let itemInfo = food_list.find((eachItem) => eachItem._id === item)
                totalAmount += itemInfo.price*cartData[item]
            }
        }
        return totalAmount;
    }
    

    const fetchData = async () => {
            try {
                const response = await fetch(`${url}/restaurant/food?category=${category}`); // Replace with your API endpoint
                const data = await response.json();
                setFoodList(data);
            } catch (err) {
                setError(err);
            }
        };

    const loadData = async () => {
        const response = await axios.get(url + '/restaurant/cart/get', {
            headers : {
                Authorization :`Bearer ${token}`
            }
        })
        setCartData(response.data.cartData)
    }

    useEffect(() => {
        fetchData()
        if(token){
            loadData()
        }
    }, [token]);

    const contextValue = {
        food_list,
        cartItems,
        error,
        url,
        category,
        changeCategory,
        removeFromCart,
        addToCart,
        setCartItems,
        getTotalCartAmount,
        fetchData,
        setCartData,cartData
    }
    return (
        <StoreContext.Provider value={contextValue}>
                {props.children}
        </StoreContext.Provider>
    );
}

export default StoreContextProvider;