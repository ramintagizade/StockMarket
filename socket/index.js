var io = require("../server");

io.on("connection", socket => {
  console.log("user connected");
 
  socket.on("add_stock", (code) => {
    console.log("add stock code " + code);
    io.sockets.emit("add_stock",code);
  });

  socket.on("disconnect",() => {
    console.log("user disconnected");
  });
});