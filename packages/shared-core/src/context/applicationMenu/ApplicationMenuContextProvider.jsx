import  React, {useState} from 'react';
import ApplicationMenuContext from './ApplicationMenuContext';

const ApplicationMenuContextProvider = ({children}) =>{
    const [appMenus,setAppMenus] = useState([]);
    const [rawMenus,setRawMenus] = useState([]);

    return (
        <ApplicationMenuContext.Provider value={{appMenus,rawMenus,setAppMenus,setRawMenus}}>
            {children}
        </ApplicationMenuContext.Provider>
    )
}

export default ApplicationMenuContextProvider;
export const useAppMenu = () => React.useContext(ApplicationMenuContext);