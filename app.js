const express = require("express"); // For Express
const userRouter = require("./routes/user.routes"); // For User Routes
const dotenv = require("dotenv"); // For Env File
const dbConnect = require("./config/db");  //For DB Connection
const cookieParser=require("cookie-parser")
const routerhome=require('./routes/index.routes')

dotenv.config(); // Load environment variables
dbConnect(); // Connect to MongoDB

const app = express();

// Set view engine
app.set("view engine", "ejs");

// Middleware for parsing JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Use the user router and for the Index page we don't need to right an route because we have specified here that we default routes.
app.use('/',routerhome);
app.use("/user", userRouter);


// Start the server
app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
