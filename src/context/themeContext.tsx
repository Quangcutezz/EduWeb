import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ThemeContextProps {
    children: ReactNode;
}

interface ThemeContextValue {
    theme: typeTheme;
    toggleTheme: () => void;
}

export enum typeTheme {
    DARK_MODE = 'dark',
    LIGHT_MODE = 'light',
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeContextProps> = ({ children }) => {
    const [theme, setTheme] = useState<any>(null);

    const toggleTheme = () => {
        setTheme((prev: typeTheme) => {
            return prev === typeTheme.DARK_MODE ? typeTheme.LIGHT_MODE : typeTheme.DARK_MODE;
        });
    };

    const handleGetDefaultThemeSys = () => {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setTheme(darkModeQuery ? typeTheme.DARK_MODE : typeTheme.LIGHT_MODE);
    };

    useEffect(() => {
        const themeExist = localStorage.getItem('theme');
        if (!themeExist) handleGetDefaultThemeSys();
        setTheme(themeExist);
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div
                className={`${
                    theme === typeTheme.DARK_MODE ? 'dark ' : 'light '
                } min-h-screen text-foreground bg-background bg-modal`}
            >
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
