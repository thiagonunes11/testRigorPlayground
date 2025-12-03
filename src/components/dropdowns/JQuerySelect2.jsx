import React, { useState, useRef, useEffect } from "react";

const JQuerySelect2 = ({
    label = "JQuery Select2",
    options = [],
    value = null,
    onChange = () => { },
    placeholder = "Select an option",
    helperText = "Value selected:",
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const wrapperRef = useRef(null);

    // Normalize options: allow ["A", "B"] or [{ label, value }]
    const normalized = options.map((o) =>
        typeof o === "string" ? { label: o, value: o } : o
    );

    const selected = normalized.find((o) => o.value === value) || null;

    // Close when clicking outside
    useEffect(() => {
        const handler = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setIsOpen(false);
                setSearch("");
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
            {label && (
                <label className="form-label d-block" htmlFor="jquery-select2">
                    {label}
                </label>
            )}

            {/* Select2-looking control */}
            <div
                id="jquery-select2"
                className="form-control d-flex justify-content-between align-items-center"
                style={{
                    cursor: "pointer",
                    minHeight: "38px",
                    borderColor: isOpen ? "#86b7fe" : "#ced4da",
                    boxShadow: isOpen
                        ? "0 0 0 0.15rem rgba(13,110,253,.25)"
                        : "none",
                }}
                onClick={() => setIsOpen((o) => !o)}
            >
                <span className={selected ? "" : "text-muted"}>
                    {selected ? selected.label : placeholder}
                </span>

                {/* Arrow (Bootstrap Icon) */}
                <i className="bi bi-caret-down-fill text-muted ms-2" />
            </div>

            {/* Dropdown panel */}
            {isOpen && (
                <div
                    className="bg-white border rounded mt-1"
                    style={{
                        position: "absolute",
                        width: "100%",
                        zIndex: 20,
                        maxHeight: "260px",
                        overflowY: "auto",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Search box at top (like Select2) */}
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
                    {visibleOptions.length === 0 && (
                        <div className="px-3 py-2 text-muted">No results</div>
                    )}

                    {visibleOptions.map((opt) => {
                        const isSelected = opt.value === value;

                        return (
                            <div
                                key={opt.value}
                                className={
                                    "px-3 py-2" +
                                    (isSelected ? " bg-primary text-white" : "")
                                }
                                style={{
                                    cursor: "pointer",
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
                </div>
            )}

            {helperText && (
                <p className="form-text mb-0">
                    {helperText} <strong>{selected?.label ?? ""}</strong>
                </p>
            )}
        </div>
    );
};

export default JQuerySelect2;
