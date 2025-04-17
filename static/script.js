document.addEventListener("DOMContentLoaded", () => {
  const selectDropDown = document.querySelectorAll(".update-select");
  selectDropDown.forEach((select) => {
    select.selectedIndex = 0
    select.addEventListener("change", async (event) => {
      event.preventDefault();
      const itemId = event.target.getAttribute("data-id");
      const name = decodeURIComponent(event.target.getAttribute("data-name"));
      const value = event.target.value;
      const url = "./tasks";
      try {
        const response = await fetch(url,{
            method: "PUT",
            headers: { 
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: itemId, location:value, name}),
        });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        globalThis.location.reload();
      } catch (error) {
        console.error(error.message);
      }
    });
  });
});
