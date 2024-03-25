const taskList = document.getElementById('task-list');
let draggingItem = null;

taskList.addEventListener('dragstart', (e) => {
  draggingItem = e.target;
  e.target.classList.add('dragging');
});

taskList.addEventListener('dragend', (e) => {
  draggingItem = null;
  e.target.classList.remove('dragging');
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

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

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
