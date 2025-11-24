import React from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
} from "@mui/material";

const AngularMat = ({
    label = "Angular Material Design",
    options = [],
    value = "",
    onChange = () => { },
    helperText = "Value selected:",
    fullWidth = true,
}) => {
    // Normalize options: allow ["A","B"] or [{label, value}]
    const normalizedOptions = options.map(opt =>
        typeof opt === "string" ? { label: opt, value: opt } : opt
    );

    return (
        <FormControl variant="standard" fullWidth={fullWidth}>
            <InputLabel>{label}</InputLabel>

            <Select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                displayEmpty
            >
                {/* optional empty option if value="" */}
                <MenuItem value="">
                    <em>&nbsp;</em>
                </MenuItem>

                {normalizedOptions.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                    </MenuItem>
                ))}
            </Select>

            {helperText && (
                <FormHelperText>
                    {helperText} <strong>{value}</strong>
                </FormHelperText>
            )}
        </FormControl>
    );
};

export default AngularMat;
