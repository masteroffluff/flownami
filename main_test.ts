import { assertStringIncludes } from "@std/assert";

Deno.test("Homepage renders successfully", async () => {
  const response = await fetch("http://localhost:8080/");
  const html = await response.text();
  assertStringIncludes(html, "Flownami");
});
