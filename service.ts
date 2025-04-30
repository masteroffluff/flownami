import { randomUUID, UUID } from "node:crypto";

import { ColumnMap, TaskMap, Task } from "./types.ts";


async function writeTasks(tasks: TaskMap) {
  await Deno.writeTextFile("./data.json", JSON.stringify(tasks));
}

async function readTasks() {
  const data = await Deno.readTextFile("./data.json");

  return JSON.parse(data);
}

export async function getBoard() {
  const output: ColumnMap = {};
  const taskMap: TaskMap = await readTasks();

  Object.values(taskMap).forEach((task) => {
    const { column } = task;
    if (!output[column]) {
      output[column] = { name: column, tasks: [] };
    }
    output[column].tasks.push(task);
  });

  return Object.values(output);
}

export async function updateTask(id: UUID, name: string, column: string) {
  const taskMap = await readTasks();

  taskMap[id].name = name;
  taskMap[id].column = column;

  await writeTasks(taskMap);
}

export async function removeTask(id: UUID) {
  const taskMap = await readTasks();

  delete taskMap[id];

  await writeTasks(taskMap);
}

export async function addTask(name: string, column: string) {
  const newTask: Task = { name, id: randomUUID(), column };
  const taskMap = await readTasks();
  taskMap[newTask.id] = newTask;
  await writeTasks(taskMap);
}
