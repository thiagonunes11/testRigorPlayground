import React, { useState, useRef, useEffect } from "react";

const AngularNgxSelect = ({
    label = "Angular Ngx Select",
    options = [],
    value = null,
    onChange = () => { },
    placeholder = "Select",
    helperText = "Value selected:",
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
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);

    const filtered = normalized.filter(opt =>
        opt.label.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="mb-3 position-relative" ref={wrapperRef}>
            {label && <label className="form-label">{label}</label>}

            {/* Top control box */}
            <div
                className="form-control d-flex justify-content-between align-items-center"
                onClick={() => setIsOpen(o => !o)}
                style={{ cursor: "pointer" }}
            >
                <span>{selected ? selected.label : placeholder}</span>

                <i className="bi bi-chevron-down text-muted"></i>
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div
                    className="border rounded bg-white"
                    style={{
                        position: "absolute",
                        width: "100%",
                        zIndex: 10,
                        marginTop: "2px",
                        maxHeight: "260px",
                        overflowY: "auto",
                        boxShadow: "0 3px 8px rgba(0,0,0,0.15)"
                    }}
                >
                    {/* Search bar */}
                    <div className="p-2 border-bottom">
                        <input
                            className="form-control"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            autoFocus
                        />
                    </div>

                    {/* Selected row */}
                    {selected && (
                        <>
                            <div
                                className="d-flex justify-content-between align-items-center px-3 py-2 text-white"
                                style={{ backgroundColor: "#0d6efd" }}
                            >
                                <span>{selected.label}</span>
                                <i
                                    className="bi bi-x-lg"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                        onChange(null);
                                        setSearch("");
                                    }}
                                ></i>
                            </div>

                            <hr className="my-1" />
                        </>
                    )}

                    {/* Other results */}
                    {filtered
                        .filter((opt) => opt.value !== value)
                        .map((opt) => (
                            <div key={opt.value}>
                                <div
                                    className="px-3 py-2"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                        onChange(opt.value);
                                        setSearch("");
                                        setIsOpen(false);
                                    }}
                                >
                                    {opt.label}
                                </div>
                                <hr className="my-1" />
                            </div>
                        ))}
                </div>
            )}

            {/* Helper text */}
            {helperText && (
                <div className="form-text">
                    {helperText} <strong>{selected?.label ?? ""}</strong>
                </div>
            )}
        </div>
    );
};

export default AngularNgxSelect;
