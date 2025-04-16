import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"


//cash on delivery
const placeOrder= async(req, res)=>{
   
    try {
        
        const { userId, items, amount, address } = req.body
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, {cartData: {}})

        res.status(201).json({success: true, message: 'Order Placed'})

    } catch (error) {
        console.error(error)
        res.json({success: false, message: error.message})
    }
    
}

const placeOrderStripe= async(req, res)=>{
    
}

const placeOrderRazorPay= async(req, res)=>{

    
}

//ALL ORDERS DATA FOR ADMIN PANEL
const allOrders= async(req, res)=>{
    
}

//user orders from fe
const userOrders= async(req, res)=>{

}

//update order status from admin panel
const updateStatus= async(req, res)=>{

}

export {placeOrder, placeOrderStripe, placeOrderRazorPay, allOrders, userOrders, updateStatus}