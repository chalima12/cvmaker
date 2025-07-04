// src/DelayedInput.js
import React, { useState, useEffect } from 'react';

const DelayedInput = ({ value, onBlur, ...props }) => {
    // Local state to hold the value as the user types
    const [localValue, setLocalValue] = useState(value);

    // Update local state if the external 'value' prop changes (e.g., from PDF upload or initial load)
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    // Handles real-time typing, updates only local state
    const handleLocalChange = (e) => {
        setLocalValue(e.target.value);
    };

    // Handles blur event, updates the parent component's state
    const handleLocalBlur = (e) => {
        if (onBlur) onBlur(e);
    };

    return (
        <input
            {...props} // Pass through any other props (type, name, className, etc.)
            value={localValue} // Controlled component: value is managed by local state
            onChange={handleLocalChange} // Update local state on every keystroke
            onBlur={handleLocalBlur} // Trigger parent update when focus is lost
        />
    );
};

export default DelayedInput;
