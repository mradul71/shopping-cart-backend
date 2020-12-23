import express from "express";
import bodyParser from "body-parser";
import data from "./data";
import mongoose from "mongoose";
import dotenv from "dotenv"; 
import cors from "cors"
import Product from "../model/productModel";

const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', ()=>{
    console.log("connected to mongoose");
})

mongoose.connection.on('error', ()=>{
    console.log("An error occured");
})

mongoose.set('useCreateIndex', true);

app.get("/", async (req, res) => {
    res.send("Backend is running here");
});

app.get("/products", async (req, res) => {
    // res.send(data.products);
    var arr = [];
    Product.find({}, (err, item) => {
        res.send(item);
    })
});

app.post("/data", async (req, res) => {
    const product = new Product({
        _id: req.body._id,
        name: req.body.name,
        category: req.body.category,
        image: req.body.image,
        price: req.body.price,
        brand: req.body.brand,
        rating: req.body.rating
    });
    const newUser = await product.save();
    if (newUser) {
        res.send({
            _id: newUser._id,
            name: newUser.name,
            category: newUser.category,
            image: newUser.image,
            price: newUser.price,
            brand: newUser.brand,
            rating: newUser.rating
        });
        console.log("added");
      } else {
        res.status(401).send({ message: 'Invalid User Data.' });
      }
})

app.get("/products/:id", (req, res) => {
    const productId = req.params.id;
    const product = data.products.find(x=>x._id === productId);
    if(product)
        res.send(product);
    else
        res.status(404).send({msg: "Product not found"});
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("Server started at 5000"));