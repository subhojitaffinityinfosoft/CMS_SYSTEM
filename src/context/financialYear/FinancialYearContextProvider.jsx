import  React, {useState} from 'react';
import FinancialYearContext from './financialYearContext';

const FinancialYearContextProvider = ({children}) =>{
    const [finYear,setFinancialYear] = useState('');
    const [finYearDtls,setFinancialYearDtls] = useState('');

    return (
        <FinancialYearContext.Provider value={{finYear,finYearDtls,setFinancialYear,setFinancialYearDtls}}>
            {children}
        </FinancialYearContext.Provider>
    )
}

export default FinancialYearContextProvider;
export const useFinancialYear = () => React.useContext(FinancialYearContext);