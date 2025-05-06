// findTaskById
// updateTask
// removeTask

import { addNewTask, findTaskById, removeTask, updateTask } from "./service.ts";
import { TaskRepo } from "../data.ts";
import { Task } from "./Task.ts";
import { assertSpyCalls, spy } from "@std/testing/mock";
import { assertObjectMatch } from "@std/assert/object-match";
import { assert } from "@std/assert/assert";
import { assertEquals } from "@std/assert/equals";

// addNewTask
Deno.test("create a task", async () => {
  // arrange
  const fakeTask = {
    name: "this is a new task",
    column: "To Do",
  };
  const newtaskstring = "this is a new task";

  const fakeTasks: Task[] = [];

  const readTasksSpy = spy(() => fakeTasks);
  const writeTasksSpy = spy((_: Task[]) => {});
  const taskRepo = {
    readTasks: readTasksSpy,
    writeTasks: writeTasksSpy,
  } as unknown as TaskRepo;
  // act
  await addNewTask(taskRepo, newtaskstring);
  // assert
  assertSpyCalls(writeTasksSpy, 1);
  const firstCallArgs = writeTasksSpy.calls[0].args[0][0];
  assertObjectMatch(firstCallArgs, fakeTask);
});

Deno.test("return a task by ID", async () => {
  // arrange
  const fakeTasks: Task[] = [
    {
      id: "some-id",
      name: "Some Name",
      column: "To Do",
    },
    {
      id: "another-id",
      name: "Another Name",
      column: "To Do",
    },
  ];
  const readTasksSpy = spy( () => fakeTasks);
  const taskRepo = {
    readTasks: readTasksSpy,
  } as unknown as TaskRepo;
  // act
  const result:Task | undefined = await findTaskById(taskRepo, "some-id")
  // assert
  if (result) {
    assertObjectMatch(result, fakeTasks[0]);
  } else {
    throw new Error("Task not found");
  }
});

Deno.test("update a task by ID", async () => {
  // arrange
  const fakeTasks: Task[] = [
    {
      id: "some-id",
      name: "Some Name",
      column: "To Do",
    },
    {
      id: "another-id",
      name: "Another Name",
      column: "To Do",
    },
  ];

  const updatedTask: Task = 
    {
      id: "some-id",
      name: "New Name",
      column: "Doing",
    }


  const readTasksSpy = spy(() => fakeTasks);
  const writeTasksSpy = spy((_: Task[]) => {});
  const taskRepo = {
    readTasks: readTasksSpy,
    writeTasks: writeTasksSpy,
  } as unknown as TaskRepo;
  // act
  await updateTask(taskRepo, updatedTask)
  // assert
  assertObjectMatch(fakeTasks[0], updatedTask);
});

Deno.test("remove a task by ID", async () => {
  // arrange
  let fakeTasks: Task[] = [
    {
      id: "some-id",
      name: "Some Name",
      column: "To Do",
    },
    {
      id: "another-id",
      name: "Another Name",
      column: "To Do",
    },
  ];



  const readTasksSpy = spy(() => fakeTasks);
  const writeTasksSpy = spy((tasks: Task[]) => fakeTasks = tasks);
  const taskRepo = {
    readTasks: readTasksSpy,
    writeTasks: writeTasksSpy,
  } as unknown as TaskRepo;
  // act
  await removeTask(taskRepo, "some-id")
  // assert
  assertEquals(fakeTasks.length,1)
});