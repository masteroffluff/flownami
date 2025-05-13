import { Task } from "./tasks/Task.ts";

export const fileOps = {
  writeTextFile: Deno.writeTextFile,
  readTextFile: Deno.readTextFile,
};

export interface TaskRepo {
  writeTasks(tasks: Task[]): Promise<void>;
  readTasks(): Promise<Task[]>;
}

export async function writeTasks(tasks: Task[]) {
  await fileOps.writeTextFile("./data.json", JSON.stringify(tasks));
}

export async function readTasks() {
  const data = await fileOps.readTextFile("./data.json");
  return JSON.parse(data);
}


export const JSONTaskRepo: TaskRepo = {
  writeTasks,
  readTasks,
};

