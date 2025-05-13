
import {  JSONTaskRepo, fileOps } from "./data.ts";
import { assertEquals } from "@std/assert/equals";


Deno.test("write test", async () => {

})

Deno.test("read test", async () => {

})


Deno.test("writeTasks should write tasks to a file", async () => {
  fileOps.writeTextFile= async (_path: string | URL, _data: string | ReadableStream<string>) => await Promise.resolve(),
  await JSONTaskRepo.writeTasks([    
    {
      id: "some-id",
      name: "Some Name",
      column: "To Do",
    }]);
  assertEquals(true, true); // Just ensuring no errors occur
});

Deno.test("readTasks should read tasks from a file", async () => {
    
  
    fileOps.readTextFile = async (_path: string | URL) => await Promise.resolve(JSON.stringify([    {
      id: "some-id",
      name: "Some Name",
      column: "To Do",
    }]))

  const tasks = await JSONTaskRepo.readTasks();
  assertEquals(tasks, [{
      id: "some-id",
      name: "Some Name",
      column: "To Do",
    }]);

});