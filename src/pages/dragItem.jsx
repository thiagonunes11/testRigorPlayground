import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Prompt from '../components/Prompt.jsx';
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

        for (let i = 0; i < items.length; i++) {
            if (items[i].id !== `task${i + 1}`) {
                isCorrectOrder = false;
                break;
            }
        }

        const messageElement = document.getElementById('order-message');

        messageElement.textContent = isCorrectOrder ? 'Correct' : 'Incorrect';
        messageElement.className = isCorrectOrder ? 'mt-3 alert alert-success' : 'mt-3 alert alert-danger';
    };

    const getAfterElement = (container, y) => {
        if (!taskListElement) return null;

        const draggableElements = [...taskListElement.querySelectorAll('.draggable:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    };

    const onDragStart = (e) => {
        setDraggingItem(e.target);
        e.target.classList.add('dragging');
    };

    const onDragEnd = (e) => {
        setDraggingItem(null);
        e.target.classList.remove('dragging');
        checkOrder();
    };

    const onDragOver = (e) => {
        e.preventDefault();
        if (!taskListElement) return;

        const afterElement = getAfterElement(taskListElement, e.clientY);
        const draggable = taskListElement.querySelector('.dragging');

        if (!draggable) return;

        if (afterElement === null) {
            taskListElement.appendChild(draggable);
        } else {
            taskListElement.insertBefore(draggable, afterElement);
        }
    };

    const onTouchStart = (e) => {
        const target = e.target.closest('.draggable');
        if (!target) return;

        setDraggingItem(target);
        target.classList.add('dragging');
    };

    const onTouchMove = (e) => {
        e.preventDefault();
        if (!taskListElement || !draggingItem) return;

        const touch = e.touches[0];
        const afterElement = getAfterElement(taskListElement, touch.clientY);

        if (afterElement === null) {
            taskListElement.appendChild(draggingItem);
        } else {
            taskListElement.insertBefore(draggingItem, afterElement);
        }
    };

    const onTouchEnd = () => {
        if (draggingItem) {
            draggingItem.classList.remove('dragging');
            setDraggingItem(null);
            checkOrder();
        }
    };

    useEffect(() => {
        if (!taskListElement) return;

        const desiredOrder = [5, 1, 3];
        const items = Array.from(taskListElement.querySelectorAll('.draggable'));
        items.sort((a, b) => desiredOrder.indexOf(parseInt(a.id.slice(4))) - desiredOrder.indexOf(parseInt(b.id.slice(4))));
        items.forEach(item => taskListElement.appendChild(item));
    }, [taskListElement]);

    return (
        <Layout
            title="Drag Item"
            description="Drag items in the list to put them in order."
        >

            <style>
                {`
                #task-list {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }

                .draggable {
                    padding: 10px;
                    margin: 5px 0;
                    background-color: #f8f9fa;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    text-align: center;
                    cursor: grab;
                    user-select: none;
                }

                .draggable.dragging {
                    opacity: 0.5;
                }

                @media (max-width: 768px) {
                    .col-4 {
                        width: 100%;
                        padding: 0 15px;
                    }

                    .draggable {
                        font-size: 14px;
                        padding: 8px;
                    }
                }
                `}
            </style>

            <div className="row mt-5 justify-content-center text-center">
                <div className="row justify-content-center">
                    <div className="col-4 border">
                        <ul
                            id="task-list"
                            className="px-0 py-3"
                            onDragStart={onDragStart}
                            onDragEnd={onDragEnd}
                            onDragOver={onDragOver}
                            onTouchStart={onTouchStart}
                            onTouchMove={onTouchMove}
                            onTouchEnd={onTouchEnd}
                        >
                            <li draggable="true" className="draggable" id="task1">Task 1</li>
                            <li draggable="true" className="draggable" id="task2">Task 2</li>
                            <li draggable="true" className="draggable" id="task3">Task 3</li>
                            <li draggable="true" className="draggable" id="task4">Task 4</li>
                            <li draggable="true" className="draggable" id="task5">Task 5</li>
                            <li draggable="true" className="draggable" id="task6">Task 6</li>
                            <li draggable="true" className="draggable" id="task7">Task 7</li>
                        </ul>
                        <div id="order-message" className="mt-3 alert alert-info">Waiting for the items to be sorted...</div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default DragItem;
