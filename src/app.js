const express = require("express");

const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http);

// // Configuring templates and static assets
// app.set("view engine", "ejs");
// app.set("views", __dirname + "/public/views");
// app.use("/static", express.static(__dirname + "/public/static"));
// app.engine("html", require("ejs").renderFile);
//
// // Setting JSON parsing methods for POST request data
// app.use(express.urlencoded()); // HTML forms
// app.use(express.json()); // API clients


app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/views/index.html');
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on('chat message', (message) => {
    io.emit('chat message', message);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected")
  });
});


http.listen(3000, () => {
  console.log("[+] Server running on port 3000...");
});''
