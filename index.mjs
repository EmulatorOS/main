import { createRequire } from "module";
const require = createRequire(import.meta.url);
const express = require("express")
const app = express()
const config = require("./config.json")
const port = process.env.PORT || config.port
import fetch from 'node-fetch';

import Server from 'bare-server-node';
import http from 'http';
import nodeStatic from 'node-static';


const bare =  new Server('/bare/', '');
const serve = new nodeStatic.Server('static/');

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



app.listen(port, () => {
  console.log(`Tsunami is running at localhost:${port}`)
})