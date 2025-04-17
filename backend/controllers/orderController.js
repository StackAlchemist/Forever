import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"


//cash on delivery
const placeOrder = async (req, res) => {
    try {
      const { userId, items, amount, address } = req.body;
      const orderData = {
        userId,
        items,
        amount,
        paymentMethod: "COD",
        payment: false,
        date: Date.now(),
        address,
      };
      const newOrder = new orderModel(orderData);
      await newOrder.save();
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true, message: "Order placed successfully" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };

const placeOrderStripe= async(req, res)=>{
    
}

const placeOrderRazorPay= async(req, res)=>{

    
}

//ALL ORDERS DATA FOR ADMIN PANEL
const allOrders= async(req, res)=>{
    try {
        const orders = await orderModel.find({})
        res.json({success: true, orders})
    } catch (error) {
        console.error(error)
        res.json({success: false, message: error.message})
    }
}

//user orders from fe
const userOrders= async(req, res)=>{

    try {
        const { userId } = req.body
        const orders = await orderModel.find({userId})
        res.json({success: true, orders})
    } catch (error) {
        console.error(error)
        res.json({success: false, message: error.message})
    }

}

//update order status from admin panel
const updateStatus= async(req, res)=>{

}

export {placeOrder, placeOrderStripe, placeOrderRazorPay, allOrders, userOrders, updateStatus}