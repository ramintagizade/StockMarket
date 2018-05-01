var io = require("../server");

io.on("connection", socket => {
  console.log("user connected");
 
  socket.on("add_stock", (data) => {
  	socket.broadcast.emit('add_stock', data);
  });

  socket.on("remove_stock", (data) => {
  	socket.broadcast.emit('remove_stock', data);
  });
  
  socket.on("disconnect",() => {
    console.log("user disconnected");
  });
});