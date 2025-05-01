// @ts-types="npm:@types/express"
import express from "npm:express";
import { Task } from "./Task.ts";
import { addNewTask, findTaskById, removeTask, updateTask } from "./service.ts";
import { JSONTaskRepo } from "../data.ts";
const tasksRouter = express();

tasksRouter.get("/new", (_req, res) => {
  res.render("tasks/new");
});

tasksRouter.post("/", async (req, res) => {
  const taskName = req.body.taskName;

  await addNewTask(JSONTaskRepo, taskName);

  res.redirect("/board");
});

tasksRouter.get("/:id/edit", async (req, res) => {
  const id = req.params.id;

  const task = await findTaskById(JSONTaskRepo, id);

  res.render("tasks/edit", { task });
});

tasksRouter.put("/:id", async (req, res) => {
  const updatedTask: Task = req.body;

  await updateTask(JSONTaskRepo, updatedTask);

  res.sendStatus(204);

  return;
});

tasksRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

  await removeTask(JSONTaskRepo, id);

  res.sendStatus(204);

  return;
});

export default tasksRouter;
