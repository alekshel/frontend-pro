import { useContext, useEffect } from 'react';
import { ThemeContext } from '../model/ThemeContext';

export const useTheme = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    useEffect(() => {
        const root = document.documentElement;

        if (theme === 'light') {
            root.style.setProperty('--primary-color', 'var(--primary-color-light)');
            root.style.setProperty('--text-color', 'var(--text-color-light)');
            root.style.setProperty('--bg-color', 'var(--bg-color-light)');
            root.style.setProperty('--header-bg-color', 'var(--header-bg-color-light)');
        } else {
            root.style.setProperty('--primary-color', 'var(--primary-color-dark)');
            root.style.setProperty('--text-color', 'var(--text-color-dark)');
            root.style.setProperty('--bg-color', 'var(--bg-color-dark)');
            root.style.setProperty('--header-bg-color', 'var(--header-bg-color-dark)');
        }
    }, [theme]);

    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme');
        localTheme && setTheme(localTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        window.localStorage.setItem('theme', newTheme);
    };

    return { theme, toggleTheme };
};