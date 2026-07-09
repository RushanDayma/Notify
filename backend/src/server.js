import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import cors from "cors";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import dotenv from "dotenv";
dotenv.config();



const app = express();
const PORT = process.env.PORT || 5000;



//middleware
app.use(express.json());//this middleware is used to parse the body of the request: req.body

// enable CORS for frontend requests
app.use(cors());

app.use(rateLimiter); //this middleware is used to limit the number of requests

//simple middleware example
// app.use((req,res,next) => {
//   console.log("We just got a new request");
//   next();
// });

app.use("/api/notes", notesRoutes);


//first connect the db then run the app, production grade!
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("server is running on port 5000")
  });
});



//mongodb+srv://rushandayma_db_user:F1E0vSrVsXqRV48d@cluster0.accgkgd.mongodb.net/?appName=Cluster0