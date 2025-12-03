import React, { useState, useRef, useEffect } from "react";

const ReactSemanticSelect = ({
    label = "React Semantic Select",
    options = [],
    value = null,
    onChange = () => { },
    helperText = "Value selected:",
    placeholder = "",
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const wrapperRef = useRef(null);

    // Normalize options: allow ["A","B"] or [{label, value}]
    const normalized = options.map((o) =>
        typeof o === "string" ? { label: o, value: o } : o
    );

    const selected = normalized.find((o) => o.value === value) || null;

    // Close when clicking outside
    useEffect(() => {
        const handler = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setIsOpen(false);
                setSearch(""); // reset search on close
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const visibleOptions = normalized.filter((opt) =>
        opt.label.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="mb-3 position-relative" ref={wrapperRef}>
            {label && <label className="form-label">{label}</label>}

            {/* Main control */}
            <div
                className="form-control d-flex justify-content-between align-items-center"
                style={{
                    cursor: "pointer",
                    minHeight: "40px",
                    borderColor: isOpen ? "#86b7fe" : "#ced4da",
                    boxShadow: isOpen
                        ? "0 0 0 0.15rem rgba(13,110,253,.25)"
                        : "none",
                }}
                onClick={() => setIsOpen((o) => !o)}
            >
                <span className="text-truncate">
                    {selected
                        ? selected.label
                        : placeholder || (normalized[0] && normalized[0].label) || ""}
                </span>

                <i className="bi bi-chevron-down text-muted ms-2" />
            </div>

            {/* Dropdown menu */}
            {isOpen && (
                <div
                    className="border border-top-0 rounded-bottom bg-white w-100"
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        zIndex: 10,
                        maxHeight: "260px",
                        overflowY: "auto",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    }}
                    onClick={(e) => e.stopPropagation()} // don't close when clicking inside
                >
                    {/* Search input */}
                    <div className="p-2 border-bottom">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            autoFocus
                        />
                    </div>

                    {/* Options */}
                    {visibleOptions.map((opt) => {
                        const isSelected = opt.value === value;
                        return (
                            <div
                                key={opt.value}
                                className="px-3 py-2"
                                style={{
                                    cursor: "pointer",
                                    backgroundColor: isSelected ? "#f5f5f5" : "transparent",
                                    fontWeight: isSelected ? "600" : "400",
                                    borderBottom: "1px solid #f0f0f0",
                                }}
                                onClick={() => {
                                    onChange(opt.value);
                                    setIsOpen(false);
                                    setSearch("");
                                }}
                            >
                                {opt.label}
                            </div>
                        );
                    })}

                    {visibleOptions.length === 0 && (
                        <div className="px-3 py-2 text-muted">No results</div>
                    )}
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

export default ReactSemanticSelect;
