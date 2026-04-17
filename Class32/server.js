import app from "./src/app.js";
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer(app);
const io = new Server(httpServer , { options }); 

io.on("connection", (socket) => {
  
});


httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});