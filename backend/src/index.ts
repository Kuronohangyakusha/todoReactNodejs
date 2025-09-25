import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import TacheRoute from "./routes/TacheRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import { AuthMiddleWare } from "./middleware/AuthMiddleWare.js";
import permissionRoutes from "./routes/permissionRoutes.js";
const app = express();
const port = 3000;

app.use(express.json());
 
app.use(cors({
  origin: "http://localhost:5173", // ton frontend
  credentials: true
}));

app.use("/users", UserRoute); 
  
app.use("/tache", AuthMiddleWare.verifyToken, TacheRoute); 
app.use("/permissions", AuthMiddleWare.verifyToken, permissionRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/auth", AuthRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
