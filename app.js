var http    = require("http");
var fs      = require("fs");
var server = http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type":"text/html"});
    var output = fs.readFileSync("./index.html", "utf-8");
    res.end(output);
}).listen(process.env.VMC_APP_PORT || 3000);

var io      = require("socket.io").listen(server);

io.sockets.on("connection", function (socket) {

    socket.on("send_message", function (data) {
        io.sockets.emit("receive", {value:data.value});
    });

    socket.on("send_broadcast", function (data) {
        socket.broadcast.emit("receive", {value:data.value});
    });

});
