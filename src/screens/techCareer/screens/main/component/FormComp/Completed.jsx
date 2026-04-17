import { Alert } from '@mantine/core'
import { randomId } from '@mantine/hooks'
import { Check  } from 'lucide-react';

const CompletedComponent = () => {
  return (
    <div>
    <div className="flex container min-w-screen justify-center py-16 mx-auto">
        <div>
        <div className="flex flex-col items-center space-y-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-28 w-28 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-4xl font-bold">Thank You !</h1>
            <p>Thank you for your interest! Your application has been successfully sumitted.</p>
            <Alert p={'xs'} variant="light" color="rgba(17, 166, 56, 0.61)" 
            title="Reference ID" icon={<Check />}>
                <p > Your reference Id - <span className='underline text-sky-500'>TIB-{randomId().split('-')[1]}</span></p>
            </Alert>
        </div>
        </div>
    </div>
    </div>
  )
}

export default CompletedComponent
