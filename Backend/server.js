
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from 'bcrypt'; // for hashing passwords
import jwt from "jsonwebtoken";
import { isTemplateLiteralTypeNode } from "typescript";
import dotenv from 'dotenv';
import path from 'path'
dotenv.config(); //
import { fileURLToPath } from 'url';


const app = express();
const port = process.env.PORT || 7600;

const JWT_SECRET = process.env.PORT || 7600

app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from your frontend
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../client/public')));

// The "catchall" handler: for any request that doesn't match one above, send back index.html.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public', 'index.html'));
});


app.use(express.json());
// Enable CORS

// Database connection function
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://ankushdhull9908:123456789ankush@cluster0.gf0hx.mongodb.net/FormSubmission");
        console.log("Database connected successfully!");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
};

// Call the connectDB function
connectDB();

const ProductSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
    Bigimage: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    specifications: {
      brand: { type: String, required: true },
      model: { type: String, required: true },
      type: { type: String, required: true },
      batteryLife: { type: String, required: true },
      weight: { type: String, required: true },
      noiseCancellation: { type: String, required: true },
      features: { type: [String], required: false }
    }
  });

  const cartschema = new mongoose.Schema({
      itemId:{
          type:Number,
          required:true
      },itemUrl :{
        type:String,
        required: true
    },
    itemDescription :{
        type:String,
        required: true
    },
      itemName :{
          type:String,
          required: true
      },itemQuantity:{
        type:Number,
        required: true
      },
      itemPrice :{
        type:Number,
        required: true
      },
      itemOwnerEmail:{
        type:String,
        required: true
      }
  })

  const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const ContactForm = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },email:{
        type:String,
        required:true,

    },
    subject:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    }
})

  const cart = mongoose.model("Cart",cartschema);

  app.get('/api/items', async (req, res) => {
    try {
        const items = await Product.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/addToCart', async (req, res) => {
    const { itemId, itemUrl,itemDescription,itemName, itemQuantity, itemPrice, itemOwnerEmail } = req.body;

    try {
        // Find an existing item in the cart
        const existingItem = await cart.findOne({ itemId: itemId, itemOwnerEmail: itemOwnerEmail });

        if (existingItem) {
            // Increment the existing quantity
            existingItem.itemQuantity = existingItem.itemQuantity+1 ; // Add the incoming quantity to the existing quantity
            await existingItem.save(); // Save the updated item

            console.log("Item already in cart, quantity updated.");
            return res.status(200).json({ message: 'Item quantity updated in cart successfully', quantity: existingItem.itemQuantity });
        } else {
            // Create a new cart item
            const cartItem = new cart({
                itemId,
                itemUrl,
                itemDescription,
                itemName,
                itemQuantity: itemQuantity || 1, // Default to 1 if itemQuantity is not provided
                itemPrice,
                itemOwnerEmail
            });
            
            // Save the cart item to the database
            await cartItem.save();

            console.log("Add to Cart done");
            return res.status(201).json({ message: 'Item added to cart successfully', quantity: cartItem.itemQuantity });
        }
    } catch (error) {
        // Send error response if saving fails
        res.status(500).json({ error: 'Failed to add item to cart', details: error.message });
        console.log("Error adding to cart:", error);
    }
});

app.post('/minsCartQuantity', async (req,res)=>{
    const {itemId,itemOwnerEmail} = req.body;

    try{
        const existingItem = await cart.findOne({ itemId: itemId, itemOwnerEmail: itemOwnerEmail });

        if(existingItem.itemQuantity >1){
            existingItem.itemQuantity = existingItem.itemQuantity-1 ;
            await existingItem.save();
            console.log("quantity decreased")
        }else if(existingItem.itemQuantity ===0){
         console.log("cannot mins")
        }
        
    }catch(error){
        console.log(error)
    }
})



app.post('/plusCartQuantity', async (req,res)=>{
    const {itemId,itemOwnerEmail} = req.body;

    try{
        const existingItem = await cart.findOne({ itemId: itemId, itemOwnerEmail: itemOwnerEmail });

        if(existingItem.itemQuantity){
            existingItem.itemQuantity = existingItem.itemQuantity+1 ;
            await existingItem.save();
            console.log("quantity increased")
        }else{
            console.log("no such item")
        }
        
    }catch(error){
        console.log(error)
    }
})

app.post('/deletcartitem', async (req, res) => {
    const { itemId, itemOwnerEmail } = req.body;

    try {
        const foundItem = await cart.findOne({ itemId: itemId, itemOwnerEmail: itemOwnerEmail });

        if (foundItem) {
            await cart.deleteOne({ _id: foundItem._id }); // Delete using the _id of the found item
            res.status(200).json({ message: 'Item deleted successfully' });
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete item from cart', details: error.message });
        console.log("Error deleting item from cart:", error);
    }
});




app.get('/api/items/:id', async (req, res) => {
    const itemId = parseInt(req.params.id); // Get the ID from the request params
    try {
      // Fetch the item from the database by its ID (adjust this depending on your DB setup)
      const item = await Product.findOne({ id:itemId }); // Assuming you're using MongoDB
  
      if (item) {
        res.json(item); // Send the item as the response
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    } catch (error) {
      console.error('Error fetching item:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });



const Product = mongoose.model('Product', ProductSchema);





const queryform = mongoose.model("QueryForm",ContactForm);


const User = mongoose.model("User", userSchema);

app.post('/query',(req,res)=>{
    const {name,email,subject,message} = req.body;

    try{
        const newformdata = new queryform({name,email,subject,message});
        newformdata.save()
        res.status(201).json({ message: 'User created successfully' });
        console.log("query uploaded")
    }catch(error){

    }
})

app.get('/displaycart', async (req,res) =>{
    try{

        const result = await cart.find()
         res.json(result)
    }catch(error){

    }
})

app.post('/deletecomment', async (req, res) => {
    const { comment, username } = req.body;

    try {
        const findComment = await commentForm.findOne({ comment: comment, name: username });

        if (findComment) { // Corrected to check findComment
            await commentForm.deleteOne({ _id: findComment._id }); // Use await here
            console.log("Comment deleted");
            return res.status(200).json({ message: "Comment deleted successfully" });
        } else {
            return res.status(404).json({ message: "Comment not found" }); // Handle case where comment isn't found
        }
    } catch (error) {
        console.log("Error deleting comment:", error);
        return res.status(500).json({ error: "Failed to delete comment" });
    }
});

const comment = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    itemId: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    numberoflikes: {
        type: Number,
        required: true
    },
    likeby: {
        type: [String],
        required: false  // Changed to not required
    }
});

app.post('/givelike', async (req, res) => {
    const { itemId, comment, likeby } = req.body;
    

    try {
        const updatedComment = await commentForm.findOneAndUpdate(
            { itemId: itemId, comment: comment },
            { 
                $inc: { numberoflikes: 1 }, // Increment number of likes
                $addToSet: { likeby: likeby } // Add to the likeby array without duplicates
            },
            { new: true } // Return the updated document
        );

        if (updatedComment) {
           
            return res.status(200).json({ 
                message: "Like increased successfully", 
                numberoflikes: updatedComment.numberoflikes 
            });
        } else {
            return res.status(404).json({ message: "Comment not found" });
        }
    } catch (error) {
        console.error("Error giving like:", error);
        return res.status(500).json({ error: "Failed to give like" });
    }
});




const commentForm = mongoose.model("Comments",comment)

// Signup route
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


app.get("/allcomments", async (req, res) => {
    try {
        const result = await commentForm.find(); // Fetch comments from the database
        res.json(result); // Send the result as JSON
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error"); // Proper error handling
    }
});



app.post('/comment',(req,res)=>{
      const {name,itemId,comment,numberoflikes} = req.body;


      try{

        const data= new commentForm({name,itemId,comment,numberoflikes})
        data.save()
        res.status(201).json({ message: 'Comment added' });
      }catch(error){
            console.log(error)
      }


  
    

})



// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id, email: user.email,name: user.name }, JWT_SECRET, { expiresIn: '1h' });



        
        res.status(200).json({ message: 'Login successful', token,user: { name: user.name, email: user.email } });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
