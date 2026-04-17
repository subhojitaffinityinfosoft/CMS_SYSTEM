import React from 'react'
import { NavLink } from 'react-router-dom'

const index = () => {
  return (
    <div className='container mx-auto px-10 py-5 space-y-5'>
           <h1 className='text-4xl'>Privacy Policy</h1>
            <p className='text-md'>Effective date: May 13, 2025</p>
            <p className='text-[15px]'><strong>MY HR</strong> ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our app.</p>

            <h2 className='text-2xl'>1. Information We Collect</h2>
                <ul  class="space-y-4  list-inside ">
                <li>
                    <p className='text-sm'>We may collect certain information, including but not limited to:</p>
                        <ol class="ps-5 mt-2 space-y-1 list-disc list-inside">  
                                <li className='text-xs'>Device information (e.g., model, OS version)</li>
                    <li className='text-xs'>Usage data</li>
                    <li className='text-xs'>Advertising ID (if applicable)</li> 
                    </ol>
                </li>
            </ul>


            <h2 className='text-2xl'>2. How We Use Your Information</h2>
                <ul  class="space-y-4  list-inside ">
                <li>
                    <p className='text-sm'>We use the collected data to:</p>
                        <ol class="ps-5 mt-2 space-y-1 list-disc list-inside">  
                               <li className='text-xs'>Improve user experience</li>
                            <li className='text-xs'>Display relevant advertisements (if ads are shown)</li>
                            <li className='text-xs'>Analyze usage patterns</li>
                    </ol>
                </li>
            </ul>

            <h2 className='text-2xl'>3. Third-Party Services</h2>
            <p className='text-sm'>We may use third-party services such as Google AdMob, Firebase, or others. These services may collect information used to identify you.</p>

                <h2  className='text-2xl'>4. Data Security</h2>
                    <p className='text-sm'>We take reasonable steps to protect your personal data. However, no method of transmission over the internet is 100% secure.</p>

                <h2 className='text-2xl'>5. Your Rights</h2>
                    <p className='text-sm'>You may contact us to request deletion of your data or to ask questions about your information.</p>

                <h2 className='text-2xl'>6. Changes to This Policy</h2>
                    <p className='text-sm'>We may update this Privacy Policy from time to time. We encourage you to review it periodically.</p>

                <h2 className='text-2xl'>7. Contact Us</h2>
                <p className='text-sm'>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
                <p className='text-sm'>Email: <NavLink className={'underline text-sky-500'} to="mailto:erptig@gmail.com" target='__blank'>your@email.com</NavLink></p>
        </div>
  )
}

export default index

