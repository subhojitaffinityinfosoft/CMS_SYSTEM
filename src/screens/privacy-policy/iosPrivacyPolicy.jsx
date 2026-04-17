import React from 'react'

const IosPrivacyPolicy = () => {
  return (
    <div className="mx-auto max-w-4xl px-6 py-8 space-y-8 text-gray-800">
      
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Privacy Policy
      </h1>

      <p className="leading-relaxed">
        This Privacy Policy applies to the <strong>Techno Tracker</strong> mobile application
        (hereinafter referred to as “the Application”), developed by{" "}
        <strong>RAJKUMAR PATRA</strong> (“the Service Provider”).
      </p>

      <p className="leading-relaxed">
        Techno Tracker is an employee work management system that enables organizations
        to manage attendance, working hours, and leave records for employees working
        on-site or remotely. The Application is provided as a free service and is intended
        for use as is.
      </p>

      <hr className="border-gray-300" />

      {/* Information Collection */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Information Collection and Use
        </h2>

        <p className="leading-relaxed">
          The Application collects information necessary to provide and improve its core
          features, including attendance tracking, work-hour monitoring, and leave
          management.
        </p>

        <h3 className="text-lg font-medium text-gray-900">
          Automatically Collected Information
        </h3>

        <ul className="list-disc pl-6 space-y-2">
          <li>Device Internet Protocol (IP) address</li>
          <li>Device type, operating system, and version</li>
          <li>Date, time, and duration of Application usage</li>
          <li>Application feature usage data</li>
        </ul>

        <p className="leading-relaxed">
          This information is used for analytics, performance monitoring, and improving
          Application functionality.
        </p>
      </section>

      <hr className="border-gray-300" />

      {/* Location */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Location Information
        </h2>

        <p className="leading-relaxed">
          The Application may collect location data during specific user actions to support
          core functionality such as:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>On-site attendance verification</li>
          <li>Remote work attendance validation</li>
          <li>Accurate work-hour and attendance records</li>
        </ul>

        <p className="leading-relaxed">
          Location data is collected only at the time of attendance-related actions and is
          not continuously tracked in the background.
        </p>
      </section>

      <hr className="border-gray-300" />

      {/* Camera */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Camera Usage
        </h2>

        <p className="leading-relaxed">
          The Application requires access to your device’s camera to support essential
          features, including but not limited to:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Capturing employee photos for attendance verification</li>
          <li>Uploading images related to work or identity confirmation</li>
        </ul>

        <p className="leading-relaxed">
          Photos are captured only when explicitly initiated by the user and are used
          solely for attendance, verification, or organizational record purposes.
          The Application does not access the camera without user consent and does not
          record video or audio in the background.
        </p>
      </section>

      <hr className="border-gray-300" />

      {/* Personal Info */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Personally Identifiable Information
        </h2>

        <p className="leading-relaxed">
          The Application may collect personally identifiable information, including:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Employee or organization identifiers</li>
        </ul>

        <p className="leading-relaxed">
          This information is used only to identify users, manage attendance records,
          and provide Application services.
        </p>
      </section>

      <hr className="border-gray-300" />

      {/* Third Party */}
      {/* <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Third-Party Services
        </h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Google Play Services</li>
          <li>Google Analytics for Firebase</li>
          <li>Firebase Crashlytics</li>
        </ul>

        <p className="leading-relaxed">
          These services may collect information in accordance with their respective
          privacy policies. Only anonymized or aggregated data is shared where applicable.
        </p>
      </section> */}

      {/* <hr className="border-gray-300" /> */}

      {/* Legal */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Legal Disclosure
        </h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Comply with legal obligations</li>
          <li>Protect user rights and safety</li>
          <li>Prevent fraud or misuse</li>
        </ul>
      </section>

      <hr className="border-gray-300" />
        {/* Location Permission */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Location Permission
        </h2>

        <p className="leading-relaxed">
          The Application requests location permission only when you attempt to mark
          attendance or perform actions that require location verification.
        </p>

        <p className="leading-relaxed">
          Granting location permission is optional; however, attendance features that
          require location validation may not function correctly without it.
        </p>

        <p className="leading-relaxed">
          You can allow, deny, or revoke location access at any time through your device
          settings.
        </p>
      </section>

      <hr className="border-gray-300" />

      {/* Camera Usage */}
      {/* <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Camera Usage
        </h2>

        <p className="leading-relaxed">
          The Application uses your device’s camera to capture photos for attendance
          verification and identity confirmation.
        </p>

        <p className="leading-relaxed">
          Camera access is used only when explicitly initiated by the user and is never
          accessed in the background.
        </p>
      </section>

      <hr className="border-gray-300" /> */}

      {/* Camera Permission */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Camera Permission
        </h2>

        <p className="leading-relaxed">
          Camera permission is requested only when you choose to capture a photo for
          attendance or verification purposes.
        </p>

        <p className="leading-relaxed">
          You may manage or revoke camera permission at any time via device settings.
        </p>
      </section>

      <hr className="border-gray-300" />

      {/* Data Retention */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Data Retention
        </h2>

        <p className="leading-relaxed">
          User data is retained only for as long as necessary to provide Application
          services. Requests for data deletion may be sent to:
        </p>

        <p className="font-medium">
          Email: <span className="text-blue-600">erptig@gmail.com</span>
        </p>
      </section>

      <hr className="border-gray-300" />

      {/* Children */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Children’s Privacy
        </h2>

        <p className="leading-relaxed">
          The Application is not intended for children under the age of 13.
          The Service Provider does not knowingly collect personal information from children.
        </p>
      </section>

      <hr className="border-gray-300" />

      {/* Security */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Security
        </h2>

        <p className="leading-relaxed">
          Reasonable administrative and technical safeguards are used to protect user data.
          However, no method of transmission or storage is completely secure.
        </p>
      </section>

      <hr className="border-gray-300" />

      {/* Consent */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Your Consent
        </h2>

        <p className="leading-relaxed">
          By using the Application, you consent to the collection and use of information as
          described in this Privacy Policy.
        </p>
      </section>

      <hr className="border-gray-300" />

      {/* Contact */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-900">
          Contact Us
        </h2>

        <p className="leading-relaxed">
          <strong>RAJKUMAR PATRA</strong><br />
          Email: <span className="text-blue-600">erptig@gmail.com</span>
        </p>
      </section>

    </div>
  )
}

export default IosPrivacyPolicy
