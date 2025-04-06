import jwt from 'jsonwebtoken'

const adminAuth = (req, res, next)=>{
    try {
        const { token } = req.headers
        if(!token)return res.status(401).json({success: false, mesage: 'Not Authorized Login Again'})

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
            if(decodedToken !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
                res.status(401).json({success: false, mesage: 'Not Authorized Login Again'})
            }
    } catch (error) {
        console.log(error)
        res.status(400).json({success: false, message: error.message})
    }
}

export default adminAuth