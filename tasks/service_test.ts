// findTaskById
// updateTask
// removeTask

import { addNewTask, findTaskById, removeTask, updateTask } from "./service.ts";
import { TaskRepo } from "../data.ts";
import { Task } from "./Task.ts";
import { assertSpyCall, assertSpyCalls, spy } from "@std/testing/mock";
// import { TaskRepo } from "../data.ts";

// addNewTask
Deno.test("create a task", async () => {
  // arrange
  // const fakeTask: Task = {
  //   id: "some-id",
  //   name: "Some Name",
  //   column: "To Do",
  // };
  const newtaskstring = "this is a new task";

  const fakeTasks: Task[] = [];

  const readTasksSpy = spy(() => fakeTasks);
  const writeTasksSpy = spy(() => {});
  const taskRepo = {
    readTasks: readTasksSpy,
    writeTasks: writeTasksSpy,
  } as unknown as TaskRepo;
  // act
  await addNewTask(taskRepo, newtaskstring);
  // assert
  assertSpyCalls(writeTasksSpy, 1);
  // assertSpyCall(writeTasksSpy, 0, {
  //   args: {name:[newtaskstring],}
  // });
});
