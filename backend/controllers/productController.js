


//function for add product
const addProduct = async (req, res)=>{
    try{
        const {name, description, price, category, subCategory, sizes, bestSeller} = req.body

        const image1 = req.file.image1[0]
        const image2 = req.file.image2[0]
        const image3 = req.file.image3[0]
        const image4 = req.file.image4[0]

        console.log(name, description, price, category, subCategory, sizes, bestSeller)
        console.log(image1, image2, image3, image4)

        res.status(201).json({})
    }catch(error){
        console.log(error)
        res.status(500).json({success: false, message: error.message})
    }
}


//function for list of product
const listProduct = async (req, res)=>{

}

//function for removing of product
const removeProduct = async (req, res)=>{

}

//function for single product info
const singleProduct = async (req, res)=>{

}

export {listProduct, addProduct, removeProduct, singleProduct}