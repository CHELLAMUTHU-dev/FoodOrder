import { useState,useEffect } from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'
import parcel_icon from '../../assets/parcel_icon.png'
import './Order.css'


const Order = ({url}) => {

  const [orders,setOrder] = useState([])

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url+"/restaurant/order/admin/order");
      setOrder(response.data.data)
    } catch (error) {
        toast.error("Error")
    }

  }
  const statusHandler = async(event,orderId) => {
    try {
      const response = await axios.post(url+"/restaurant/order/status",{
        orderId,
        status:event.target.value
      })
      if(response.status===200){
        fetchAllOrders()
      }
      toast.success(response.data)
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    fetchAllOrders()
    
  },[])


  return (
    <div className='order add'>
        <h3>Order Page</h3>
        <div className="order-list">
          {orders.map((order,index) => (
              <div key={index} className='order-item'>
                  <img src={parcel_icon} alt="" />
                  <div>
                    <p className='order-item-food'>
                        {order.items.map((item,index) => {
                           if(index === order.items.length-1){
                            return item.name + " x " + item.quantity
                          }else{
                            return item.name + " x " + item.quantity + ', '
                           }
                        })}
                    </p>
                    <p className="order-item-name">
                      {order.address.firstName+ " " + order.address.lastName}
                    </p>
                    <div className="order-item-address">
                      <p>{order.address.street+", "}</p>
                      <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipCode}</p>
                    </div>
                    <p className='order-item-phone'>{order.address.phone}</p>
                  </div>
                  <p>items: {order.items.length}</p>
                  <p>${order.amount}</p>
                  <select onChange={(event) => statusHandler(event,order._id)} value={order.status} >
                    <option value="Food Processing">Food Processing</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
              </div>
          )
          )}
        </div>
    </div>
  )
}

export default Order
