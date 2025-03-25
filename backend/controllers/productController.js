import {v2 as  cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js'


//function for add product
const addProduct = async (req, res)=>{
    try{
        const {name, description, price, category, subCategory, sizes, bestseller} = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item)=>item !== undefined)
        
        let imagesUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'})
                return result.secure_url
            })
        )

        const newProduct = await productModel.create({
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes), //converting from string to array
            bestseller: bestseller === 'true' ? true : false,
            image: imagesUrl,
            date: Date.now()
        })

        console.log(newProduct)
        await newProduct.save()

        res.status(201).json({success: true, message: "Product added", product: newProduct})
    }catch(error){
        console.log(error)
        res.status(500).json({success: false, message: error.message})
    }
}


//function for list of product
const listProduct = async (req, res)=>{

    try{
        const products = await productModel.find({})
        res.status(200).json({success: true, products})
    }catch(error){
        console.log(error)
        res.status(500).json({success: false, message: error.message})
    }  

}

//function for removing of product
const removeProduct = async (req, res)=>{
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.status(200).json({success: true, message: 'Product Removed'})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: error.message})
    }
}   

//function for single product info
const singleProduct = async (req, res)=>{

    try {
        
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.status(200).json({success: true, product})

    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: error.message})
    }

}

export {listProduct, addProduct, removeProduct, singleProduct}