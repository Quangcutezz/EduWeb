import { Spinner } from '@nextui-org/react';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LoadingContextProps {
    children: ReactNode;
}

interface LoadingContextValue {
    startLoading: () => void;
    stopLoading: () => void;
    isLoading: boolean;
}

const LoadingContext = createContext<LoadingContextValue | undefined>(undefined);

export const LoadingProvider: React.FC<LoadingContextProps> = ({ children }) => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);
    return (
        <LoadingContext.Provider value={{ startLoading, stopLoading, isLoading }}>
            {isLoading && (
                <div className="fixed  select-none bg-black/5 dark:bg-white/5 top-0 bottom-0 left-0 right-0 z-[10000000] flex justify-center items-center">
                    <Spinner size="md" color="primary" />
                </div>
            )}
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = (): LoadingContextValue => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
};
