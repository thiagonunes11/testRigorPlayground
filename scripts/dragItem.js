document.addEventListener('DOMContentLoaded', function() {
  const taskList = document.getElementById('task-list');
  let draggingItem = null;

  taskList.addEventListener('dragstart', (e) => {
      draggingItem = e.target;
      e.target.classList.add('dragging');
  });

  taskList.addEventListener('dragend', (e) => {
      draggingItem = null;
      e.target.classList.remove('dragging');
      checkOrder();
  });

  taskList.addEventListener('dragover', (e) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(taskList, e.clientY);
      const draggable = document.querySelector('.dragging');

      if (afterElement !== draggingItem && taskList.contains(draggable)) {
          if (afterElement == null) {
              taskList.appendChild(draggable);
          } else {
              taskList.insertBefore(draggable, afterElement);
          }
      }
  });

  taskList.addEventListener('touchstart', (e) => {
      draggingItem = e.target.closest('.draggable');
      if (draggingItem) {
          draggingItem.classList.add('dragging');
      }
  });

  taskList.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const afterElement = getDragAfterElement(taskList, touch.clientY);
      const draggable = document.querySelector('.dragging');

      if (afterElement !== draggingItem && taskList.contains(draggable)) {
          if (afterElement == null) {
              taskList.appendChild(draggable);
          } else {
              taskList.insertBefore(draggable, afterElement);
          }
      }
  });

  taskList.addEventListener('touchend', (e) => {
      if (draggingItem) {
          draggingItem.classList.remove('dragging');
          draggingItem = null;
          checkOrder();
      }
  });

  function getDragAfterElement(container, y) {
      const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

      if (draggableElements.length === 0) {
          return null;
      }

      return draggableElements.reduce((closest, child) => {
          const box = child.getBoundingClientRect();
          const offset = y - box.top - box.height / 2;
          if (offset < 0 && offset > closest.offset) {
              return { offset: offset, element: child };
          } else {
              return closest;
          }
      }, { offset: Number.NEGATIVE_INFINITY }).element;
  }

  function checkOrder() {
      const items = taskList.querySelectorAll('.draggable');
      let isCorrectOrder = true;

      for (let i = 0; i < items.length - 1; i++) {
          if (items[i].id !== `task${i + 1}`) {
              isCorrectOrder = false;
              break;
          }
      }

      const messageElement = document.getElementById('order-message');

      messageElement.textContent = isCorrectOrder ? 'Correct' : 'Incorrect';
      messageElement.className = isCorrectOrder ? 'mt-3 alert alert-success' : 'mt-3 alert alert-danger';
  }
  
  const desiredOrder = [5, 1, 3];

  const items = Array.from(taskList.querySelectorAll('.draggable'));
  items.sort((a, b) => desiredOrder.indexOf(parseInt(a.id.slice(4))) - desiredOrder.indexOf(parseInt(b.id.slice(4))));
  items.forEach(item => taskList.appendChild(item));
});
