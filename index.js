const express = require("express")
const app = express();
require("dotenv").config()

app.use(express.json());
const userRoutes = require("./routes/User");

const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payment");
const courseRoutes = require("./routes/Course");
const contactUs = require("./routes/ContactUs");
const cookieParser = require("cookie-parser")
const database = require("./config/database")

const cors = require("cors");
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload"); 
const { TokenExpiredError } = require("jsonwebtoken");

const PORT = process.env.PORT||4005;
database.connect();
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:["http://localhost:3000","https://deploy-mern-1whq.vercel.app"],
        methods:["POST","GET","PUT","DELETE"],
        credentials:true,
    })
)
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)
cloudinaryConnect();
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/reach", contactUs);

app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your server is up and running",
    });
});

app.listen(4000,()=>{
    console.log(`App is running at ${PORT}`)
});
