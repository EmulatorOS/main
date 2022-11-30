import { createRequire } from "module";
const require = createRequire(import.meta.url);
import createServer from '@tomphttp/bare-server-node';
const cors = require('cors')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

const bare =  createServer('/bare/');

const express = require("express")
const app = express()

app.use(express.static("./static", {
    extensions: ["html"]
})); 
const options = {
    
    target: {
        https: true
    }
}
app.get("/", function(req, res){
    res.sendFile("index.html", {root: "./static"});
});


app.set('trust proxy', 1)

// Enable cors
const allowedOrigins = ['*'];
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.' + origin;
       
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }

}));
// Set static folder
app.use(express.static('public'))

// Routes
app.use('/api', require('./route.js'))
app.use("/flags", require("./flags.js"))

app.use(function (req, res) {
  try {
    if (bare.shouldRoute(req)) {
      bare.routeRequest(req, res)
    } else {
      res.status(404).sendFile("404.html", {root: "./public"});
    
    }
  } catch (e) {
    response.writeHead(500, "Internal Server Error", {
      "Content-Type": "text/plain",
    })
    response.end(e.stack)
  }

})

 const server = app.listen({
  port: process.env.PORT || 8080,
});
 server.on('upgrade', (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head)
  } else {
    socket.end()
  }
 });