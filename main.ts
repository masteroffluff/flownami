// @ts-types="npm:@types/express"
import {  UUID } from "node:crypto";

import { getBoard, addTask, updateTask, removeTask } from "./service.ts";

import express from "npm:express";

const app = express();

app.set("view engine", "ejs");

app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (_req, res) {
  res.render("pages/index");
});

app.post("/tasks", async (req, res) => {
  const taskName = req.body.taskName;

  await addTask(taskName, "To do")

  res.redirect("/board");
});

app.put("/tasks", async (req, res) => {
  const { id, name: newName, location: newLocation } = req.body;

  await updateTask(id, newName, newLocation);

  res.status(200).json({ message: "success" });
});

app.delete("/tasks/:id", async (req, res) => {

  const id = req.params.id as UUID
  if(!id){
    res.status(404).json("Invalid type")
    return 
  }
  await removeTask(id);

  res.status(200).json({ message: "success" });
});

if (import.meta.main) {
  const port = Deno.env.get("PORT") || 8080;
  app.listen(port);
  console.log(`Server is listening on port ${port}`);
}



app.get("/board", async function (_req, res) {
  const columns = await getBoard();
  res.render("pages/board", { columns });
});

app.get("/tasks/new", (_req, res) => {
  res.render("pages/create");
});
export default app;
