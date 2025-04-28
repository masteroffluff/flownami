// @ts-types="npm:@types/express"
import { randomUUID, UUID } from "node:crypto";

import express from "npm:express";

const app = express();

app.set("view engine", "ejs");

app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (_req, res) {
  res.render("pages/index");
});

type Task = {
  name: string;
  id: UUID;
  column: string;
};
type Column = {
  name: string;
  tasks: Array<Task>;
};

type TaskMap = Record<UUID, Task>;

app.get("/board", async function (_req, res) {
  const taskMap = await readTasks();

  res.render("pages/board", { taskMap });
});

app.get("/tasks/new", (_req, res) => {
  res.render("pages/create");
});

async function writeTasks(tasks: TaskMap) {
  await Deno.writeTextFile("./data.json", JSON.stringify(tasks));
}

async function readTasks() {
  const data = await Deno.readTextFile("./data.json");
  return JSON.parse(data);
}

async function updateTask(id: UUID, name: string, column: string) {
  
  const taskMap = await readTasks();

  taskMap[id].name = name
  taskMap[id].column = column

  await writeTasks(taskMap);
}

async function removeTask(id: UUID) {
  const taskMap = await readTasks();

  taskMap.delete(id)

  await writeTasks(taskMap);
}

async function addTask( name: string, column: string){
  const newTask:Task = { name, id: randomUUID(), column };
  const taskMap = await readTasks();
  taskMap[newTask.id]=newTask
  await writeTasks(taskMap);
}

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

export default app;
