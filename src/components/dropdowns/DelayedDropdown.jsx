import React, { useState, useRef, useEffect } from "react";

const DelayedDropdown = ({
    label = "Delayed Dropdown",
    options = [],
    value = null,
    onChange = () => { },
    helperText = "Value selected:",
    placeholder = "Select an option",
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showOptions, setShowOptions] = useState(false); // <-- new state
    const wrapperRef = useRef(null);

    // Normalize options: allow ["A","B"] or [{ label, value }]
    const normalized = options.map((o) =>
        typeof o === "string" ? { label: o, value: o } : o
    );

    const selected = normalized.find((o) => o.value === value) || null;

    // Close on outside click
    useEffect(() => {
        const handler = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setIsOpen(false);
                setShowOptions(false); // reset when closing
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const toggle = () => {
        if (!isOpen) {
            // Opening → start 2s timer
            setIsOpen(true);
            setShowOptions(false);

            setTimeout(() => {
                setShowOptions(true);
            }, 2000);
        } else {
            // Closing immediately
            setIsOpen(false);
            setShowOptions(false);
        }
    };

    // Delayed panel styles
    const dropdownStyle = {
        position: "absolute",
        left: 0,
        right: 0,
        marginTop: 2,
        backgroundColor: "#fff",
        border: "1px solid #ced4da",
        borderTop: "none",
        borderRadius: "0 0 .25rem .25rem",
        maxHeight: isOpen ? 200 : 0,
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? "translateY(0)" : "translateY(-5px)",
        overflow: "hidden",
        transition:
            "opacity 150ms ease, transform 150ms ease, max-height 150ms ease",
        zIndex: 20,
        boxShadow: isOpen ? "0 4px 10px rgba(0,0,0,0.12)" : "none",
    };

    const chevronStyle = {
        transition: "transform 150ms ease",
        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
    };

    return (
        <div className="mb-3 position-relative" ref={wrapperRef}>
            {label && <label className="form-label">{label}</label>}

            {/* Control */}
            <div
                className="form-control d-flex justify-content-between align-items-center"
                style={{ cursor: "pointer" }}
                onClick={toggle}
            >
                <span className={selected ? "" : "text-muted"}>
                    {selected ? selected.label : placeholder}
                </span>

                <i className="bi bi-chevron-down text-muted" style={chevronStyle} />
            </div>

            {/* Dropdown panel */}
            <div style={dropdownStyle} onClick={(e) => e.stopPropagation()}>
                {!showOptions && isOpen && (
                    <div className="px-3 py-2 text-muted">Loading...</div>
                )}

                {showOptions &&
                    normalized.map((opt) => {
                        const isSelected = opt.value === value;
                        return (
                            <div
                                key={opt.value}
                                className={
                                    "px-3 py-2 " + (isSelected ? "bg-light fw-semibold" : "")
                                }
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    onChange(opt.value);
                                    setIsOpen(false);
                                    setShowOptions(false);
                                }}
                            >
                                {opt.label}
                            </div>
                        );
                    })}
            </div>
            {helperText && (
                <div className="form-text">
                    {helperText} <strong>{selected?.label ?? ""}</strong>
                </div>
            )}
        </div>
    );
};

export default DelayedDropdown;
