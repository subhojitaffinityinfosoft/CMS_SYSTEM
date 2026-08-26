import React from 'react'
// import CommingSoonImg from '@/assets/commingSoon.svg';
import CommingSoonImg from '@/assets/commingSoon.png';

const CommingSoon = () => {
  return (
    <div>

    <img
        src={CommingSoonImg}
        height={250}
        width={250}
        className='mx-auto'
    />
    <p className='text-center text-muted-foreground'>Get Notified When Launched</p>
    </div>

  )
}

export default CommingSoon