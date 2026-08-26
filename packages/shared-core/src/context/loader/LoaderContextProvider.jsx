import  React, {useState} from 'react';
import LoaderContext from './LoaderContext';

const LoaderContextProvider = ({children}) =>{
    const [isLoading,setLoader] = useState(false);

    return (
        <LoaderContext.Provider value={{isLoading,setLoader}}>
            {children}
        </LoaderContext.Provider>
    )
}

export default LoaderContextProvider;
export const useLoader = () => React.useContext(LoaderContext);