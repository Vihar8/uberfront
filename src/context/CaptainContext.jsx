import React, { createContext, useState, useContext, useEffect } from 'react';

export const CaptainDataContext = createContext();

const CaptainProvider = ({ children }) => {
    const [captain, setCaptain] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateCaptain = (captainData) => {
        setCaptain(captainData);
    };

    // Use useEffect to log captain changes
    useEffect(() => {
        if (captain) {
            console.log("Captain Updated:", captain);
        }
    }, [captain]);

    const value = {
        captain,
        setCaptain,
        loading,
        setLoading,
        error,
        setError,
        updateCaptain,
    };

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    );
};

// Custom hook for easier usage in components
export const useCaptain = () => useContext(CaptainDataContext);

export default CaptainProvider;