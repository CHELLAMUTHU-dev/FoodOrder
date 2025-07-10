import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Popup from 'reactjs-popup';
import './List.css';

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [price, setPrice] = useState('');

  const fetchList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/restaurant/food?category=All`);
      setList(response.data);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch food items');
    } finally {
      setLoading(false);
    }
  };

  const removeFood = async (foodId) => {
    if (process.env.NODE_ENV !== 'development') {
      toast.warning('Delete functionality is only available in development mode');
      return;
    }

    try {
      const response = await axios.post(`${url}/restaurant/delete/food`, { id: foodId });
      await fetchList();
      toast.success(response.data.message || 'Item deleted successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete item');
    }
  };

  const handleUpdate = (item) => {
    setSelectedItem(item);
    setPrice(item.price); // Initialize the price with the current item's price
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.post(`${url}/restaurant/update/food`, { 
        id: selectedItem._id, 
        price: parseFloat(price) // Ensure price is a number
      });
      await fetchList();
      toast.success(response.data || 'Item updated successfully');
      setSelectedItem(null); // Close the popup after successful update
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update item');
    }
  };

  useEffect(() => {
    fetchList();
  }, [url]); // Added url as dependency

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className='list add flex-col'>
      <p className='list-title'>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
          <b>Update</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
            <button 
              className='food-update-button' 
              onClick={() => handleUpdate(item)}
            >
              Update
            </button>
          </div>
        ))}
      </div>

      {/* Update Popup */}
      <Popup
        open={!!selectedItem}
        onClose={() => {
          setSelectedItem(null);
          setPrice('');
        }}
        modal
        nested
      >
        {close => (
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="content">
              <h3 className="header"> Update <span>"{selectedItem?.name}"</span> </h3>
              <form onSubmit={handleUpdateSubmit}>
                <input
                  type="number"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder='Enter New Price'
                  step="1" 
                  min="0" // Prevents negative numbers
                />
                  <button
                    type="submit"
                    className="action"
                  >
                    Update
                  </button>
              </form>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default List;