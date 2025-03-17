import React, { useState } from "react";
import Demo from "../components/Demo.jsx";

const DeleteElements = () => {
    const [items, setItems] = useState(["Element 1", "Element 2", "Element 3"]);
    const [inputValue, setInputValue] = useState("");

    const handleAddItem = (event) => {
        if (event.key === "Enter" && inputValue.trim() !== "") {
            setItems([...items, inputValue.trim()]);
            setInputValue(""); // Clear input field
        }
    };

    const handleDeleteItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    return (
        <Demo className="container text-center my-5">
            <div className="row justify-content-center mb-5">
                <div className="col-6 border p-2 pt-4">
                    <h2><b>Delete Elements</b></h2>
                    <p className="mt-4"><small>Delete elements by clicking on the "x" buttons besides them and add new elements by inputting text in the field.</small></p>
                </div>
            </div>
            
            <div className="row justify-content-center">
                <div className="col-6 border p-2 pt-4">
                    <div className="row justify-content-center">
                        <div className="elementInput col-8">
                            <div className="mb-3 text-start">
                                <label htmlFor="element" className="form-label">
                                    Type the new element's desired text below:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="element"
                                    placeholder="Element name"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyUp={handleAddItem}
                                />
                                <div className="form-text">
                                    Press the "enter" key to add the new element.
                                </div>
                            </div>
                        </div>
                    </div>

                    <ol className="text-start">
                        {items.map((item, index) => (
                            <li key={index} className="d-flex justify-content-between align-items-center">
                                <span>{item}</span>
                                <button type="button" className="btn-close" onClick={() => handleDeleteItem(index)}></button>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </Demo>
    );
};

export default DeleteElements;
