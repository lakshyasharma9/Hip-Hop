const port = 4001;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Database connection
mongoose.connect("mongodb+srv://admin:admin123@cluster0.2v66n.mongodb.net/e-commerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("Successfully connected to MongoDB.");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

// Test API
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

// Image storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload/images');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Create upload directory if it doesn't exist
const fs = require('fs');
const { type } = require("os");
const { error, log } = require("console");
if (!fs.existsSync('./upload/images')) {
    fs.mkdirSync('./upload/images', { recursive: true });
}

// Serve uploaded images
app.use('/images', express.static('upload/images'));

// Upload endpoint
app.post("/upload", upload.single('product'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }
        res.json({
            success: true,
            image_url: `http://localhost:${port}/images/${req.file.filename}`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Product Schema
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
});

// Add product endpoint
app.post('/addproduct', async (req, res) => {
    try {
        // Get all products to determine the next ID
        let products = await Product.find({});
        let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

        const product = new Product({
            id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });

        await product.save();
        console.log("Product saved successfully:", product);

        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

// Remove product endpoint
app.post('/removeproduct', async (req, res) => {
    try {
        await Product.findOneAndDelete({ id: req.body.id });
        console.log("Product removed successfully");
        res.json({
            success: true,
            name: req.body.name
        });
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

// Get all products endpoint
app.get('/allproducts', async (req, res) => {
    try {
        const products = await Product.find({});
        console.log("All Products Fetched");
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});
// Schema creating for user model
const Users = mongoose.model('Users',{
  name:{
    type:String,
     },
     email:{
      type:String,
      unique:true,

     },
     password:{
      type:String,
     },
     cartData:{
      type:Object,
     },
     date:{
      type:Date,
      default:Date.now,
     }

})

// Creating Endpoint for registering the user 
app.post('/signup', async(req,res)=>{
  let check = await  Users.findOne({email:req.body.email});
  if(check){
    return res.status(400).json({success:false,errors:"existing user found with same email address"})
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i]=0;
     }
     const user = new Users({
      name:req.body.username,
      email:req.body.email,
      password:req.body.password,
      cartData:cart,
     })
     await user.save();
     const data = {
      user:{
        id:user.id
      }
     }
     const token = jwt.sign(data,'secret_ecom');
     res.json({
      success:true,token
     })

})

// creating endpoint for user login
app.post('/login',async(req,res)=>{
let user = await Users.findOne({email:req.body.email});
if(user){
  const passCompare = req.body.password === user.password;
  if(passCompare){
    const data = {
      user:{
        id:user.id
      }
    }
    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token});
  }
  else {
    res.json({success:false,errors:"Wrong Password"});

  }
}
else{
  res.json({success:false,errors:"Wrong Email Id"});
}
})

// creating endpoint for newcollection data
app.get('/newcollection', async(req,res)=>{
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("NewCollection Fetched");
  res.send(newcollection);
})
// creating endpoint for popular in women section
app.get('/popularinwomen', async(req, res) => {
  try {
    let products = await Product.find({category:"women"});
    let popular_in_women = products.slice(0, 4);
    console.log("Popular in women fetched");
    res.json(popular_in_women);
  } catch (error) {
    console.error("Error fetching popular women products:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

//creating middleware to fetch user
const fetchUser = async (req,res,next)=>{
const token = req.header('auth-token');
if (!token) {
    res.status(401).send({errors:"Please authenticate using valid token"})
}
else{
    try{
        const data = jwt.verify(token,'secret_ecom');
        req.user = data.user;
        next();
    } catch(error){
res.status(401).send({errors:"Please authenticate using a valid token"})
    }
}
}


// creating endpoint for adding prducts in cartdata
app.post('/addtocart',fetchUser,async (req,res)=>{
    console.log("Added",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] +=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added")
})

// creating endpoint to remove product from cartData
app.post('/removefromcart',fetchUser,async (req,res)=>{
    console.log("removed",req.body.itemId);
    
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed")
})

// creating endpoint to get cartdata
app.post('/getcart',fetchUser,async (req)=>{
    console.log("GetCart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})


// Start server
app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on Port " + port);
    } else {
        console.log("Error:", error);
    }
});