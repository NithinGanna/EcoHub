
const express = require("express");
const router = express.Router();
const cloudinary = require("../utils/cloudinary");

const availableWasteReq = require("../models/availableWasteReqModel");

const User = require("../models/userModel");
const userMiddleware = require("../middlewares/user");


router.post("/uploadAvailableReqFromCommonMan",userMiddleware,async(req,res)=>{
    const { image, title, description, price, quantity } = req.body;
  
    try {
      if (image) {
        const uploadRes = await cloudinary.uploader.upload(image);
        const uploaderEmail = req.user.email;
        if (uploadRes) {
          const available_waste_req = new availableWasteReq({
            image: uploadRes.url,
            title,
            description,
            price,
            quantity,
            initialQuantity: quantity,
            uploaderEmail
          });
  
          await available_waste_req.save();
  
           // storing in the innovativeProds array
          const email = req.user.email; 
          const userDoc = await User.findOne({email: email});
          if(!userDoc.availableWasteReq){
            userDoc.availableWasteReq = [{}]
          }
          const productId = await availableWasteReq.findOne({description});
          userDoc.availableWasteReq.push(productId);
  
           await userDoc.save();
  
           res.status(200).json({ msg: "Waste available uploaded successfully" });
        } else {
          res.json({ error: "Error uploading image" });
        }
      } else {
        res.json({ msg: "Image data is required" });
      }
    } catch (error) {
      res.json({ msg: "Internal Server Error" });
    }
  });

  router.get("/getWasteAvailable", userMiddleware, async (req, res) => {
    try {
        const allWasteReq = await availableWasteReq.find({quantity: { $ne: 0 }});
        res.json(allWasteReq);
    } catch (error) {
        console.error("Error in /getWasteReq route:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.get("/getWasteAvailable/:id", async (req, res) => {
    try {
        const id = req.params.id;
        // console.log(id);
        const waste_prd = await availableWasteReq.findById(id);
  
        if (waste_prd) {
          // console.log(innovative_prd.title);
            res.json(waste_prd);
        } else {
            res.status(404).json({ msg: "Waste product request not found" });
        }
    } catch (error) {
        console.error("Error fetching waste request:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
  });
  
module.exports = router;