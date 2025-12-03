import React, { useState, useRef, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";


const AngularNg = ({
    label = "Angular Ng Select",
    options = [],
    value = null,
    onChange = () => { },
    placeholder = "",
    helperText = "Value selected:",
    clearable = true,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const wrapperRef = useRef(null);

    const normalized = options.map(o =>
        typeof o === "string" ? { label: o, value: o } : o
    );

    const selected = normalized.find(o => o.value === value) || null;

    // Close on outside click
    useEffect(() => {
        const handler = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const filtered = normalized.filter(opt =>
        opt.label.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="mb-3 position-relative" ref={wrapperRef}>
            {label && <label className="form-label">{label}</label>}

            {/* Main box (Bootstrap style) */}
            <div
                className={`form-control d-flex align-items-center`}
                style={{ cursor: "text" }}
                onClick={() => setIsOpen(true)}
            >
                {/* Value text (inline, like screenshot) */}
                {!search && selected && (
                    <span className="me-2">{selected.label}</span>
                )}

                {/* Placeholder */}
                {!selected && !search && (
                    <span className="text-muted">{placeholder}</span>
                )}

                {/* Search input (expands full width) */}
                <input
                    type="text"
                    className="border-0 flex-grow-1 p-0"
                    style={{ outline: "none", boxShadow: "none" }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setIsOpen(true)}
                />

                {/* Clear icon */}
                {clearable && selected && (
                    <span
                        className="ms-2 text-muted"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onChange(null);
                            setSearch("");
                        }}
                    >
                        ×
                    </span>
                )}

                {/* Dropdown arrow */}
                <i className="bi bi-caret-down-fill ms-2 text-muted"></i>
            </div>

            {/* Dropdown menu */}
            {isOpen && (
                <div
                    className="border rounded mt-1 bg-white"
                    style={{
                        position: "absolute",
                        width: "100%",
                        zIndex: 5,
                        maxHeight: "200px",
                        overflowY: "auto",
                    }}
                >
                    {filtered.length === 0 && (
                        <div className="px-2 py-1 text-muted">No items</div>
                    )}

                    {filtered.map(opt => (
                        <div
                            key={opt.value}
                            className={`px-2 py-1 ${opt.value === value ? "bg-light fw-bold" : ""}`}
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                onChange(opt.value);
                                setSearch("");
                                setIsOpen(false);
                            }}
                        >
                            {opt.label}
                        </div>
                    ))}
                </div>
            )}

            {helperText && (
                <div className="form-text">
                    {helperText} <strong>{selected?.label ?? ""}</strong>
                </div>
            )}
        </div>
    );
};

export default AngularNg;
