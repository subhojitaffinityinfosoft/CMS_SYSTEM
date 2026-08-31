import React, { useState, useEffect } from 'react';
import UnitContext from './UnitContext';

const UnitContextProvider = ({ children }) => {
    const getInitialUnits = () => {
        const storedUnits = localStorage.getItem('selectedUnits');
        if (storedUnits) {
            try {
                return JSON.parse(storedUnits);
            } catch (e) {
                return [];
            }
        }
        return [];
    };

    const [selectedUnits, setSelectedUnitsState] = useState(getInitialUnits);

    const setSelectedUnits = (units) => {
        setSelectedUnitsState(units);
        if (units && units.length > 0) {
            localStorage.setItem('selectedUnits', JSON.stringify(units));
        } else {
            localStorage.removeItem('selectedUnits');
        }
    };

    return (
        <UnitContext.Provider value={{ selectedUnits, setSelectedUnits }}>
            {children}
        </UnitContext.Provider>
    );
};

export default UnitContextProvider;
export const useUnit = () => React.useContext(UnitContext);
