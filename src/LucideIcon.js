// src/LucideIcon.js
import React, { useEffect } from 'react';
// We don't import createIcons directly here as it's loaded globally via CDN in index.html
// and exposed as window.lucide.createIcons.

const LucideIcon = ({ name, className, color = 'currentColor', size = 20 }) => {
    useEffect(() => {
        // Ensure window.lucide (from the CDN import in index.html) is available
        // and the target element exists before attempting to create icons.
        // A small timeout helps ensure the DOM is ready.
        const timer = setTimeout(() => {
            if (window.lucide && document.querySelector(`[data-lucide="${name}"]`)) {
                // Use the globally exposed createIcons function from Lucide CDN
                window.lucide.createIcons();
            }
        }, 0); // Minimal delay

        return () => clearTimeout(timer);
    }, [name, className, color, size]); // Re-run effect if these props change

    // Render a span with data-lucide attribute, which lucide.js will transform into an SVG
    return <span data-lucide={name} className={className} style={{ color: color, width: size, height: size }}></span>;
};

export default LucideIcon;
