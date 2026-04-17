import React from 'react'

const MSegregratorComponent = ({ title }) => {
    return (
        <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink font-medium text-sm  
             text-red-500 uppercase  shadow-sm px-5 py-1 rounded-md">
                {title}
            </span>
            <div className="flex-grow border-t border-gray-200"></div>
        </div>
    )
}

export default MSegregratorComponent
