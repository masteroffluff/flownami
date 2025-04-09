document.addEventListener('DOMContentLoaded', () => {
    const selectDropDown = document.querySelectorAll('.update-select');
    selectDropDown.forEach(button => {
      button.addEventListener('change', (event) => {
        const itemId = event.target.getAttribute('data-id');
        const value = event.target.value;
        console.log(`Item to change: ${itemId} ${value}`);

      });
    });
  });