  import express from "express";
  import {
    listProduct,
    addProduct,
    removeProduct,
    singleProduct,
  } from "../controllers/productController.js";
  import upload from "../middleware/multer.js";
  import adminAuth from "../middleware/adminAuth.js";

  const productRouter = express.Router();

  productRouter.post(
    "/add",
    adminAuth,  // Make sure adminAuth is working
    upload.fields([  // Multer middleware to handle files
      { name: "image1", maxCount: 1 },
      { name: "image2", maxCount: 1 },
      { name: "image3", maxCount: 1 },
      { name: "image4", maxCount: 1 },
    ]),
    addProduct  // Controller function to handle the request
  );

  // productRouter.post("/add", (req, res) => {
  //   console.log("Add Product route hit!");
  //   res.status(200).json({ success: true, message: "Test hit!" });
  // });
  productRouter.post("/remove", adminAuth, removeProduct);
  productRouter.post("/single", singleProduct);
  productRouter.get("/list", listProduct);
  productRouter.delete("/remove", removeProduct);
  productRouter.get("/single", singleProduct);
  
  productRouter.post(
    "/test",
    upload.fields([
      { name: "image1", maxCount: 1 },
      { name: "image2", maxCount: 1 },
    ]),
    (req, res) => {
      console.log("==== MULTER TEST ====");
      console.log("BODY:", req.body); // Check if other form data is sent correctly
      console.log("FILES:", req.files); // Check if files are coming through
      res.json({ success: true });
    }
  );
  export default productRouter;
