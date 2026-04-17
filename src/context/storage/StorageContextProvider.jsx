import  React, {useState} from 'react';
import StorageContext from './StorageContext';
import { getStorageData } from '@/lib/Storage';

const StorageContextProvider = ({children}) =>{
    const [has_authenticated_key,setAuthenticatedKey] = useState(
        getStorageData(import.meta.env.VITE_AU_TK) || null
    );

    return (
        <StorageContext.Provider value={{has_authenticated_key,setAuthenticatedKey}}>
            {children}
        </StorageContext.Provider>
    )
}

export default StorageContextProvider;
export const useLoader = () => React.useContext(StorageContext);