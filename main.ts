// @ts-types="npm:@types/express"
import express from "npm:express";

const app = express();

app.set("view engine", "ejs");

// use res.render to load up an ejs view file

// index page
app.get("/", function (_, res) {
  res.render("pages/index");
});

const port = Deno.env.get("PORT") || 8080;
app.listen(port);
console.log(`Server is listening on port ${port}`);
