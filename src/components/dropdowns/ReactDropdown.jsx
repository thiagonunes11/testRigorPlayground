import React from "react";
import Select from "react-dropdown-select";

const ReactDropdown = ({
    label = "React Dropdown Select",
    options = [],
    value = null,          // primitive value
    onChange = () => { },   // (newValue: any) => void
    placeholder = "Select...",
    helperText = "Value selected:",
    color = "#0074D9",
}) => {
    // Normalize options: allow ["A","B"] or [{ label, value }]
    const normalized = options.map((o) =>
        typeof o === "string" ? { label: o, value: o } : o
    );

    const selected = normalized.find((o) => o.value === value) || null;

    const handleChange = (vals) => {
        // react-dropdown-select passes an array of selected option objects
        const v = vals && vals[0] ? vals[0].value : null;
        onChange(v);
    };

    return (
        <div className="mb-3">
            {label && (
                <label className="form-label d-block mb-1">{label}</label>
            )}

            <Select
                options={normalized}
                values={selected ? [selected] : []}
                onChange={handleChange}
                placeholder={placeholder}
                color={color}
                dropdownHandle
                clearable
            />

            {helperText && (
                <div className="form-text">
                    {helperText} <strong>{selected?.label ?? ""}</strong>
                </div>
            )}
        </div>
    );
};

export default ReactDropdown;
