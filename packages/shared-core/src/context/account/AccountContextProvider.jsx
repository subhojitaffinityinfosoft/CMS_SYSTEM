import  React, {useState} from 'react';
import AccountContext from './AccountContext';

const AccountContextProvider = ({children}) =>{
    const [acc_dtls,setAccDtls] = useState(null);

    return (
        <AccountContext.Provider value={{acc_dtls,setAccDtls}}>
            {children}
        </AccountContext.Provider>
    )
}

export default AccountContextProvider;
export const useAccount = () => React.useContext(AccountContext);