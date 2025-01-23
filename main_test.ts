import { assert } from "@std/assert";

Deno.test(async function addTest() {
  const response = await fetch("http://localhost:8000/");
  await response.text();
  assert(response.ok);
});
