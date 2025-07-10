import React, { useContext, useEffect, useState } from 'react'
import {StoreContext} from '../../context/StoreContext'
import Cookies from 'js-cookie'
import parcel_icon from '../../assets/parcel_icon.png'
import axios from 'axios'
import './MyOrder.css'


const MyOrder = () => {

   const {url} = useContext(StoreContext)
   const token = Cookies.get('jwt_token')
  const [data,setData] = useState([])

  const orderData = async () => {
    try {
        const userOrder = await axios.get(url+'/restaurant/order/user/orders', {
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        setData(userOrder.data.data)
    } catch (error) {
        setData([])
    }
  }

  useEffect(() => {
    if(token){
      orderData()
    }
  },[token])

  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">
          {data.map((order,index) => {
            return(
              <div key={index} className='my-order-order'>
                  <img src={parcel_icon} alt="" />
                  <p>{order.items.map((item,index)=> {
                    if(index === order.items.length-1){
                      return item.name+ "X "+ item.quantity
                    }else{
                       return item.name+ "X "+ item.quantity+ ", "
                    }
                  })}</p>
                  <p>${order.amount}.00</p>
                  <p>items: {order.items.length}</p>
                  <p><span>&#x25cf;</span><b>{order.status}</b></p>
                  <button type='button' onClick={orderData}>Track Order</button>
              </div>
            )
          })}
        </div>
    </div>
  )
}

export default MyOrder
