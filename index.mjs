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

app.set('trust proxy', 1)

// Enable cors
const allowedOrigins = ['*'];
app.use(cors({
  origin: '*'

}));
// Routes

app.use(function (req, res) {
  try {
    if (bare.shouldRoute(req)) {
      bare.routeRequest(req, res)
    } else {
      res.status(404).sendFile("404.html", {root: "./static"});
    
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
