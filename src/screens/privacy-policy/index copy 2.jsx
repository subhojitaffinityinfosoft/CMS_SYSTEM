import React from 'react'
import { NavLink } from 'react-router-dom'

const index = () => {
  return (
    <div className='container mx-auto px-10 py-5 space-y-5'>
           <h1 className='text-4xl'>Privacy Policy</h1>
            <p className='text-[15px]'>
                This privacy policy applies to the techtrontracker app (hereby referred to as "Application") for mobile devices that was created by RAJKUMAR PATRA (hereby referred to as "Service Provider") as a Free service. This service is intended for use "AS IS".
            </p>
            <h2 className='text-2xl'>Information Collection and Use</h2>
            <ul  class="space-y-4  list-inside ">
                <li>
                    <p className='text-sm'>The Application collects information when you download and use it. This information may include information such as</p>
                        <ol class="ps-5 mt-2 space-y-1 list-disc list-inside">  
                                <li className='text-xs'>Your device's Internet Protocol address (e.g. IP address)</li>
                    <li className='text-xs'>The pages of the Application that you visit, the time and date of your visit, the time spent on those pages</li>
                    <li className='text-xs'>The time spent on the Application</li>
                    <li className='text-xs'>The operating system you use on your mobile device</li>
                    </ol>
                </li>
            </ul>

            <ul  class="space-y-4  list-inside ">
                <li>
                    <p className='text-sm'>The Application collects your device's location, which helps the Service Provider determine your approximate geographical location and make use of in below ways:</p>
                    <ol class="ps-5 mt-2 space-y-1 list-disc list-inside">  
                    <li className='text-xs'>Geolocation Services: The Service Provider utilizes location data to provide features such as personalized content, relevant recommendations, and location-based services.</li>
                    <li className='text-xs'>Analytics and Improvements: Aggregated and anonymized location data helps the Service Provider to analyze user behavior, identify trends, and improve the overall performance and functionality of the Application.</li>
                    <li className='text-xs'>Third-Party Services: Periodically, the Service Provider may transmit anonymized location data to external services. These services assist them in enhancing the Application and optimizing their offerings.</li>
                    </ol>
                </li>
            </ul>

              <ul  class="space-y-4  list-inside ">
                  <li><p className='text-sm'>The Service Provider may use the information you provided to contact you from time to time to provide you with important information, required notices and marketing promotions.</p></li>
                  <li><p className='text-sm'>
                    For a better experience, while using the Application, the Service Provider may require you to provide us with certain personally identifiable information, including but not limited to erptig@gmail.com. The information that the Service Provider request will be retained by them and used as described in this privacy policy.</p></li>
              </ul>


            <h2 className='text-2xl'>Third Party Access</h2>
                <ul  class="space-y-4  list-inside ">
                <li>
                    <p className='text-sm'>Only aggregated, anonymized data is periodically transmitted to external services to aid the Service Provider in improving the Application and their service. The Service Provider may share your information with third parties in the ways that are described in this privacy statement.</p>

                </li>
            </ul>


             <ul  class="space-y-4  list-inside ">
                <li>
                    <p className='text-sm'>Please note that the Application utilizes third-party services that have their own Privacy Policy about handling data. Below are the links to the Privacy Policy of the third-party service providers used by the Application:</p>
                    <ol class="ps-5 mt-2 space-y-1 list-disc list-inside">  
                    <li className='text-xs'>
                        <NavLink className={'underline text-sky-500'} to="https://www.google.com/policies/privacy/" target='__blank' rel="noopener noreferrer">Google Play Services</NavLink>
                    </li>
                     <li className='text-xs'>
                        <NavLink className={'underline text-sky-500'} to="https://firebase.google.com/support/privacy" target='__blank' rel="noopener noreferrer">Google Analytics for Firebase</NavLink>
                    </li>
                    <li className='text-xs'>
                        <NavLink className={'underline text-sky-500'} to="https://firebase.google.com/support/privacy/" target='__blank' rel="noopener noreferrer">Firebase Crashlytics</NavLink>
                    </li>
                    </ol>
                </li>
            </ul>

             <ul  class="space-y-4  list-inside ">
                <li>
                    <p className='text-sm'>The Service Provider may disclose User Provided and Automatically Collected Information:</p>
                    <ol class="ps-5 mt-2 space-y-1 list-disc list-inside">  
                    <li className='text-xs'>as required by law, such as to comply with a subpoena, or similar legal process;</li>
                    <li className='text-xs'>when they believe in good faith that disclosure is necessary to protect their rights, protect your safety or the safety of others, investigate fraud, or respond to a government request;</li>
                    <li className='text-xs'>with their trusted services providers who work on their behalf, do not have an independent use of the information we disclose to them, and have agreed to adhere to the rules set forth in this privacy statement.</li>
                    </ol>
                </li>
            </ul>

             <ul  class="space-y-4  list-inside ">
                <li>
                    <p className='text-sm font-PoppinsBold'>Opt-Out Rights</p>
                    <ol class="ps-5 mt-2 space-y-1 list-disc list-inside">  
                    <li className='text-xs'>You can stop all collection of information by the Application easily by uninstalling it. You may use the standard uninstall processes as may be available as part of your mobile device or via the mobile application marketplace or network.</li>
                    </ol>
                </li>
            </ul>

             <ul  class="space-y-4  list-inside ">
                <li>
                    <p className='text-sm  font-PoppinsBold'>Data Retention Policy</p>
                    <ol class="ps-5 mt-2 space-y-1 list-disc list-inside">  
                    <li className='text-xs'>The Service Provider will retain User Provided data for as long as you use the Application and for a reasonable time thereafter. If you'd like them to delete User Provided Data that you have provided via the Application, please contact them at erptig@gmail.com and they will respond in a reasonable time.</li>
                    </ol>
                </li>
            </ul>

             <ul  class="space-y-4  list-inside ">
                <li>
                    <p className='text-sm  font-PoppinsBold'>Children</p>
                    <ol class="ps-5 mt-2 space-y-1 list-disc list-inside">  
                    <li className='text-xs'>The Service Provider does not use the Application to knowingly solicit data from or market to children under the age of 13.</li>
                    </ol>
                </li>
            </ul>

             <ul  class="space-y-4  list-inside ">
                <li>
                    <p className='text-sm'>
                        The Application does not address anyone under the age of 13. The Service Provider does not knowingly collect personally identifiable information from children under 13 years of age. In the case the Service Provider discover that a child under 13 has provided personal information, the Service Provider will immediately delete this from their servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact the Service Provider (erptig@gmail.com) so that they will be able to take the necessary actions.
                    </p>
                </li>
            </ul>

             <ul  class="space-y-4  list-inside ">
                <li>
                    <p className='text-sm  font-PoppinsBold'>Security</p>
                    <ol class="ps-5 mt-2 space-y-1 list-disc list-inside">  
                    <li className='text-xs'>This Privacy Policy may be updated from time to time for any reason. The Service Provider will notify you of any changes to the Privacy Policy by updating this page with the new Privacy Policy. You are advised to consult this Privacy Policy regularly for any changes, as continued use is deemed approval of all changes.</li>
                    </ol>
                </li>
            </ul>


            <ul  class="space-y-4  list-inside ">
                <li>
                    <p className='text-sm  font-PoppinsBold'>Changes</p>
                    <ol class="ps-5 mt-2 space-y-1 list-disc list-inside">  
                    <li className='text-xs'>This Privacy Policy may be updated from time to time for any reason. The Service Provider will notify you of any changes to the Privacy Policy by updating this page with the new Privacy Policy. You are advised to consult this Privacy Policy regularly for any changes, as continued use is deemed approval of all changes.</li>
                    </ol>
                </li>
            </ul>


              <ul  class="space-y-4  list-inside ">
                <li>
                    <p className='text-sm'>
                        This privacy policy is effective as of 2025-05-30
                    </p>
                </li>
            </ul>

             <ul  class="space-y-4  list-inside ">
                <li>
                    <p className='text-sm  font-PoppinsBold'>Your Consent</p>
                    <ol class="ps-5 mt-2 space-y-1 list-disc list-inside">  
                    <li className='text-xs'>By using the Application, you are consenting to the processing of your information as set forth in this Privacy Policy now and as amended by us.</li>
                    </ol>
                </li>
            </ul>

            <ul  class="space-y-4  list-inside ">
                <li>
                    <p className='text-sm  font-PoppinsBold'>Contact Us</p>
                    <ol class="ps-5 mt-2 space-y-1 list-disc list-inside">  
                    <li className='text-xs'>If you have any questions regarding privacy while using the Application, or have questions about the practices, please contact the Service Provider via email at erptig@gmail.com.</li>
                    </ol>
                </li>
            </ul>

            <hr></hr>

            <div>
                <p className="text-sm">This privacy policy page was generated by  <NavLink className={'underline text-sky-500 text-xs'} to="https://app-privacy-policy-generator.nisrulz.com/" target="_blank" rel="noopener noreferrer">App Privacy Policy Generator</NavLink></p>
            </div>

        </div>
  )
}

export default index

