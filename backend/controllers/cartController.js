import userModel from "../models/userModel.js"

//add products to user's cart
const addToCart = async (req, res)=>{
    try {
        const {userId, itemId, size} = req.body
        const userData = await userModel.findById(userId)
        const cartData = await userData.cartData

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1
            }
            else{
                cartData[itemId][size] = 1
            }
        }else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({success: true, message: 'Added to Cart'})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}
//update user's cart
const  updateCart = async (req, res)=>{

}
//get user's cart data
const getUserCart = async (req, res)=>{

}

export { addToCart, updateCart, getUserCart }