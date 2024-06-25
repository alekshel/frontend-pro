import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../hooks/useTheme';

const ThemeSwitcher = (props) => {
    const { className } = props;
    const { theme, toggleTheme } = useTheme();

    return (
        <div onClick={toggleTheme} className={className}>
            Theme change {theme === 'light' ? <FiMoon /> : <FiSun />}
        </div>
    );
};

export default ThemeSwitcher;