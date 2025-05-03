import React, { useState } from 'react';
import { Button } from '@douyinfe/semi-ui';
function Demo() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const switchMode = () => {
        const body = document.body;
        if (body.hasAttribute('theme-mode')) {
            body.removeAttribute('theme-mode');
            setIsDarkMode(false);
        } else {
            body.setAttribute('theme-mode', 'dark');
            setIsDarkMode(true);
        }
    };

    return (
        <Button
            onClick={switchMode}
        >
            {isDarkMode ? '白天模式' : '暗黑模式'}
        </Button>
    );
}
export default Demo;