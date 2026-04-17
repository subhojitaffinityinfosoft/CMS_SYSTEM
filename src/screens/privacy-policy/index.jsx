import React from 'react'
import { NavLink } from 'react-router-dom'

const index = () => {
  return (
    <div className='container mx-auto px-10 py-5 space-y-5'>
           <h1 className='text-2xl'>Privacy Policy</h1>

    <p>This Privacy Policy applies to the <strong>TechtronTracker</strong> app (hereafter referred to as "the Application") for mobile devices, developed by <strong>RAJKUMAR PATRA</strong> ("the Service Provider"). This Application is provided as a <strong>free service</strong> and is intended for use <strong>as is</strong>.</p>

    <h2>Information Collection and Use</h2>
    <p>The Application collects certain types of information when you download and use it. This may include:</p>
    <ul>
        <li>Your device’s Internet Protocol (IP) address</li>
        <li>Pages visited within the Application, along with the date, time, and duration of visits</li>
        <li>Information about your mobile device’s operating system</li>
        <li>Time spent within the Application</li>
    </ul>
    <p>Additionally, the Application collects your <strong>device’s location data</strong> to enable specific features, including but not limited to:</p>
    <ul>
        <li><strong>Geolocation Services:</strong> To provide personalized content, location-based recommendations, and other location-based services.</li>
        <li><strong>Analytics and Improvements:</strong> To analyze aggregated and anonymized location data for improving the functionality and performance of the Application.</li>
        <li><strong>Third-Party Services:</strong> To occasionally share anonymized location data with external services to enhance and optimize the Application.</li>
    </ul>
    <p>The Service Provider may also use the collected information to contact you with important updates, legal notices, and promotional materials.</p>
    <p>For enhanced functionality, the Application may request personally identifiable information such as your <strong>name, email address, or phone number</strong>. This information will be collected, stored, and used as described in this Privacy Policy.</p>

    <h2>Third-Party Access</h2>
    <p>The Application may share anonymized, aggregated data with third-party service providers to improve the Application and its services. However, these third parties are not permitted to use the data for any other purpose.</p>
    <p>The Application uses the following third-party services, which may collect information in accordance with their respective privacy policies:</p>
    <ul>
        <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google Play Services</a></li>
        <li><a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener">Google Analytics for Firebase</a></li>
        <li><a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener">Firebase Crashlytics</a></li>
    </ul>
    <p>Additionally, the Service Provider may disclose user information in the following cases:</p>
    <ul>
        <li>To comply with legal obligations (e.g., subpoenas or legal processes).</li>
        <li>When disclosure is necessary to protect rights, ensure user safety, prevent fraud, or respond to government requests.</li>
        <li>To trusted service providers who assist with Application operations and who are bound by confidentiality agreements.</li>
    </ul>

    <h2>Opt-Out Rights</h2>
    <p>You can stop all collection of information by the Application by uninstalling it from your device. You may use the standard uninstall process available on your mobile device or app store.</p>

    <h2>Data Retention Policy</h2>
    <p>The Service Provider will retain your data for as long as you use the Application and for a reasonable period thereafter. If you wish to delete your provided data, please contact the Service Provider at <a href="mailto:erptig@gmail.com">erptig@gmail.com</a>. They will process your request within a reasonable timeframe.</p>

    <h2>Children’s Privacy</h2>
    <p>The Application is <strong>not intended for children under the age of 13</strong>. The Service Provider does not knowingly collect personal data from children under 13. If you become aware that a child under 13 has provided personal information, please contact the Service Provider immediately at <a href="mailto:erptig@gmail.com">erptig@gmail.com</a>. Any such data will be deleted promptly.</p>

    <h2>Security</h2>
    <p>The Service Provider takes reasonable measures to protect your data; however, no method of transmission over the Internet or electronic storage is 100% secure. Therefore, absolute security cannot be guaranteed.</p>

    <h2>Changes to This Privacy Policy</h2>
    <p>This Privacy Policy may be updated from time to time. Any changes will be posted on this page. You are advised to review this Privacy Policy periodically. Continued use of the Application after updates constitutes acceptance of the changes.</p>
    <p><strong>Effective Date:</strong> May 30, 2025</p>

    <h2>Your Consent</h2>
    <p>By using the Application, you consent to the collection, use, and disclosure of your information as described in this Privacy Policy.</p>

    <h2>Contact Us</h2>
    <p>If you have any questions or concerns about this Privacy Policy or the handling of your personal information, please contact:</p>
    <p><strong>RAJKUMAR PATRA</strong><br></br>
    Email: 
    <NavLink className={'underline text-sky-500  text-lg'} to="mailto:erptig@gmail.com" target="_blank" rel="noopener noreferrer">erptig@gmail.com</NavLink>
    </p>


        </div>
  )
}

export default index

