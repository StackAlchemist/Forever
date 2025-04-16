import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {


    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('')
    const [products, setProducts] = useState([])
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [token, setToken] = useState('')
    const navigate = useNavigate();

    const addToCart = async (itemId, size) =>{

        if (!size) {
            toast.error('Select Product Size!')
            return
        }

        let cartData = structuredClone(cartItems) //structuredClone create one deep copy of the cart items and we will be able to access it using cart data 

        if (cartData[itemId]) {//Checking If the Size Exists
            if (cartData[itemId][size]) {//If the same size of the item is already in the cart, simply increase its quantity by 1.
                cartData[itemId][size] +=1
            }
            else{//If the size does not exist in the cart, set the quantity to 1.
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        setCartItems(cartData)

        if(token){
            try {
                await axios.post(backendUrl + '/api/cart/add', {itemId, size}, {headers:{token}})
            } catch (error) {
                console.error(error)
                toast.error(error.message)
            }
        }
    }

    const getCartCount = () =>{
        let totalCount = 0
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0){
                        totalCount += cartItems[items][item]
                    }
                } catch (error) {
                  console.log(error)  
                }
            }
        }
        return totalCount
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems)

        cartData[itemId][size] = quantity

        setCartItems(cartData)

        if(token){

            try{
                await axios.post(backendUrl + '/api/cart/update', {itemId, size, quantity}, {headers:{token}})

            } catch (err){
                console.error(err)
                toast.error(err.message)
            }

        }
    }
    
    const getCartAmount = () =>{
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product)=>product._id === items)
            for(const item in cartItems[items]){
                try{
                    if (cartItems[items][item]) {
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }
                }catch(error){
                    console.log(error)
                }
            }
        }
        return totalAmount
    }

    const getProductsData = async()=>{
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            if(response.data.success){
                setProducts(response.data.products)
            }else{
                toast.error(response.data.message)
            }
            console.log(response.data)
        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }

    
    const getUserCart = async (token)=>{
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, {headers:{token}})

            if(response.data.success){
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getProductsData()
    },[])

    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    },[])

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, getCartCount,
        updateQuantity, getCartAmount, navigate,
        backendUrl, setToken, token, 
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;