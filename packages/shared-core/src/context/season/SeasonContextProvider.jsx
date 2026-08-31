import React, { useState, useEffect } from 'react';
import SeasonContext from './SeasonContext';

const SeasonContextProvider = ({ children }) => {
    const getInitialSeason = () => {
        const storedSeason = localStorage.getItem('selectedSeason');
        if (storedSeason) {
            try {
                return JSON.parse(storedSeason);
            } catch (e) {
                return null;
            }
        }
        return null;
    };

    const [selectedSeason, setSelectedSeasonState] = useState(getInitialSeason);

    const setSelectedSeason = (season) => {
        setSelectedSeasonState(season);
        if (season) {
            localStorage.setItem('selectedSeason', JSON.stringify(season));
        } else {
            localStorage.removeItem('selectedSeason');
        }
    };

    return (
        <SeasonContext.Provider value={{ selectedSeason, setSelectedSeason }}>
            {children}
        </SeasonContext.Provider>
    );
};

export default SeasonContextProvider;
export const useSeason = () => React.useContext(SeasonContext);
