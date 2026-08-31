import React, { useState, useEffect } from 'react';
import CollegeContext from './CollegeContext';

const CollegeContextProvider = ({ children }) => {
    // Read from localStorage on initial load
    const getInitialCollege = () => {
        const storedCollege = localStorage.getItem('selectedCollege');
        if (storedCollege) {
            try {
                return JSON.parse(storedCollege);
            } catch (e) {
                return null;
            }
        }
        return null;
    };

    const [selectedCollege, setSelectedCollegeState] = useState(getInitialCollege);

    const setSelectedCollege = (college) => {
        setSelectedCollegeState(college);
        if (college) {
            localStorage.setItem('selectedCollege', JSON.stringify(college));
        } else {
            localStorage.removeItem('selectedCollege');
        }
    };

    return (
        <CollegeContext.Provider value={{ selectedCollege, setSelectedCollege }}>
            {children}
        </CollegeContext.Provider>
    );
};

export default CollegeContextProvider;
export const useCollege = () => React.useContext(CollegeContext);
