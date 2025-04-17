document.addEventListener("DOMContentLoaded", () => {
  const selectDropDown = document.querySelectorAll(".update-select");
  selectDropDown.forEach((button) => {
    button.addEventListener("change", async (event) => {
      event.preventDefault();
      const itemId = event.target.getAttribute("data-id");
      const name = event.target.getAttribute("data-name");
      const value = event.target.value;
      console.log(`Item to change: ${itemId} ${value}`);
      const url = "./tasks";
      try {
        const response = await fetch(url,{
            method: "PUT",
            headers: { // Corrected from 'header' to 'headers'
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: itemId, location:value, name}),
        });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

      } catch (error) {
        console.error(error.message);
      }
    });
  });
});
