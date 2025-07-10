import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import MyOrder from './pages/MyOrder/MyOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import { ToastContainer } from "react-toastify";


const App = () => {
  const [showLogin ,setShowLogin] = useState(false)
  return (
    <>
    <ToastContainer/>
    {showLogin ? <LoginPopup setShowLogin={setShowLogin}/>: <></>}
    <div className='app'>
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
            <Route exact path='/' element={<Home/>} />
            <Route exact path='/cart' element={<Cart/>} />
            <Route exact path='/order' element={<PlaceOrder/>} />
            <Route exact path='/my-order' element={<MyOrder/>} />
        </Routes>
    </div>
        <Footer/>
    </>
  )
}

export default App
