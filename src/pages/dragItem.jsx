import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/dragItem.css"
import Prompt from '../components/Prompt.jsx'
import Demo from '../components/Demo.jsx';


const DragItem = () => {
    const [draggingItem, setDraggingItem] = useState(null);
    const [taskListElement, setTaskListElement] = useState(null);

    useEffect(() => {
        if (!taskListElement) {
            setTaskListElement(document.getElementById('task-list'));
        }
    }, []);

    const checkOrder = () => {
        if (!taskListElement) {
            return;
        }

        const items = taskListElement.querySelectorAll('.draggable');
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

    const getDragAfterElement = (container, y) => {
        if (!taskListElement) return null;
        
        const draggableElements = [...taskListElement.querySelectorAll('.draggable:not(.dragging)')];

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

    const onDragStart = (e) => {
        setDraggingItem(e.target);
        e.target.classList.add('dragging');
    }

    const onDragEnd = (e) => {
        setDraggingItem(null);
        e.target.classList.remove('dragging');
        checkOrder();
    }
  
    const onDragOver = (e) => {
        e.preventDefault();
        if (!taskListElement) return;
        
        const afterElement = getDragAfterElement(taskListElement, e.clientY);
        const draggable = taskListElement.querySelector('.dragging');
        
        if (!draggable) return;

        if (afterElement !== draggingItem) {
            if (afterElement === null) {
                taskListElement.appendChild(draggable);
            } else {
                taskListElement.insertBefore(draggable, afterElement);
            }
        }
    }

    useEffect(() => {
        if (!taskListElement) return;

        const desiredOrder = [5, 1, 3];
        const items = Array.from(taskListElement.querySelectorAll('.draggable'));
        items.sort((a, b) => desiredOrder.indexOf(parseInt(a.id.slice(4))) - desiredOrder.indexOf(parseInt(b.id.slice(4))));
        items.forEach(item => taskListElement.appendChild(item));
    }, [taskListElement]);

  
    return (
        <Demo>
            <Prompt title="Drag Item" instructions="Drag items in the list to put them in order." />

            <div class="row mt-5 justify-content-center text-center">
                <div class="row justify-content-center">
                    <div class="col-4 border">
                        <ul id="task-list" class="px-0 py-3" onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
                            <li draggable="true" class="draggable" id="task1">Task 1</li>
                            <li draggable="true" class="draggable" id="task2">Task 2</li>
                            <li draggable="true" class="draggable" id="task3">Task 3</li>
                            <li draggable="true" class="draggable" id="task4">Task 4</li>
                            <li draggable="true" class="draggable" id="task5">Task 5</li>
                            <li draggable="true" class="draggable" id="task6">Task 6</li>
                            <li draggable="true" class="draggable" id="task7">Task 7</li>
                        </ul>
                        <div id="order-message" class="mt-3 alert alert-info">Waiting for the items to be sorted...</div>
                    </div>
                </div>
            </div>
        </Demo>
    );
};

export default DragItem;
