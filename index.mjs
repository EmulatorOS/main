import { createRequire } from "module";
const require = createRequire(import.meta.url);
const express = require("express")
const app = express()
const config = require("./config.json")
const port = process.env.PORT || config.port
const Corrosion = require("./lib/server")
import RhodiumProxy from 'Rhodium';
import fetch from 'node-fetch';

import Server from 'bare-server-node';
import http from 'http';
import nodeStatic from 'node-static';


const bare =  new Server('/bare/', '');

const proxy = new Corrosion({
    prefix: "/corrosion/",
    codec: "xor",
    title: "Tsunami",
    forceHttps: true,
    requestMiddleware: [
        Corrosion.middleware.blacklist([
            "accounts.google.com",
        ], "Page is blocked"),
    ]
});

proxy.bundleScripts();

const Rhodium = new RhodiumProxy({
  encode: "xor",
  prefix: "/rhodium/",
  server: app,
  Corrosion: [true, proxy],
  title: "Tsunami"
})

Rhodium.init();

app.use(express.static("./static", {
    extensions: ["html"]
}));

app.get("/", function(req, res){
    res.sendFile("index.html", {root: "./static"});
});

app.get("/suggestions", function(req, res){
async function getsuggestions() {
var term = req.query.q || "";
var response = await fetch("https://duckduckgo.com/ac/?q=" + term + "&type=list");
var result = await response.json();
var suggestions = result[1]
res.send(suggestions)
}
getsuggestions()
});
app.use(function (req, res) {
    if (req.url.startsWith(proxy.prefix)) {
      proxy.request(req,res);
    } else if (req.url.startsWith(Rhodium.prefix)) {
      return Rhodium.request(req, res)
    } else if (req.url.startsWith("/bare/")) {
      return bare.route_request(req, res)
    } else {
      res.status(404).sendFile("404.html", {root: "./public"});
    }
})


app.listen(port, () => {
  console.log(`EmulatorOS is running at localhost:${port}`)
})