import React, { useState, useRef, useEffect } from "react";

const AnimatedDropdown = ({
    label = "Animated Dropdown",
    options = [],
    value = null,
    onChange = () => { },
    placeholder = "Select an option",
}) => {
    const [isOpen, setIsOpen] = useState(false);
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
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const toggle = () => setIsOpen((o) => !o);

    // Animated panel styles
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

                {/* Bootstrap chevron icon */}
                <i className="bi bi-chevron-down text-muted" style={chevronStyle} />
            </div>

            {/* Animated dropdown menu */}
            <div style={dropdownStyle} onClick={(e) => e.stopPropagation()}>
                {normalized.map((opt) => {
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
                            }}
                        >
                            {opt.label}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AnimatedDropdown;
