
import React from 'react'
import styles from './index.module.css'; 
const index = () => {
  return (
    <div className={styles.container}>
        <header>
        <div className={styles.logo}>TI</div>
        <div>
            <strong>MY HR</strong><br></br>
            <small>Developer: Techno India Group • package: <span className={styles.kbd}>com.techtrontracker</span></small>
        </div>
        </header>

        <main className={styles.card} role="main">
        <h1>Account deletion — Request &amp; process</h1>
        <p>This page explains how a user can request deletion of their <strong>MY HR</strong> account and the associated data. This page is public and does not require sign-in.</p>

        <section>
            <h2>How to request deletion</h2>
            <ol>
            <li>Send an email to <a href="erptig@gmail.com">erptig@gmail.com</a> with the subject <strong>Delete my MY HR account</strong>.</li>
            <li>In the email, include: your registered <strong>email address</strong>, <strong>phone number</strong>, and <strong>employee ID</strong> (if available).</li>
            <li>We will verify your request and may ask for a confirmation to prevent accidental deletions.</li>
            <li>Once verified, we will process the deletion and send a confirmation email when complete.</li>
            </ol>
            <p className={styles.note}><strong>Processing time:</strong> We aim to verify and process deletion requests within <strong>7 business days</strong>.</p>
        </section>

        <section>
            <h2>Data that will be deleted</h2>
            <p>When you request deletion, we will remove the following data associated with your account unless otherwise required to be retained by law:</p>
            <ul>
            <li>Profile information: name, email address, phone number, employee ID.</li>
            <li>Attendance records and timesheets linked to your account (unless legally required to retain a copy).</li>
            <li>Uploaded documents and attachments (resumes, certificates, images).</li>
            <li>Authentication data and tokens (password hashes, OTP records).</li>
            <li>App-specific usage logs tied directly to your account.</li>
            </ul>
        </section>

        <section>
            <h2>Data that may be retained (limited)</h2>
            <p>We may retain limited data for legitimate business or legal reasons. Any retained data will be minimized and only retained for the period stated below.</p>
            <dl>
            <dt>Reason</dt><dd>Legal compliance, payroll or statutory HR records, audit purposes</dd>
            <dt>Types of data kept</dt><dd>Aggregated payroll/attendance summaries, anonymized audit logs</dd>
            <dt>Retention period</dt><dd>Up to <strong>90 days</strong> (unless longer retention is required by law)</dd>
            </dl>
        </section>

        <section>
            <h2>Verification &amp; exceptions</h2>
            <p>To prevent fraudulent requests, we may verify account ownership before deletion (for example, by sending a confirmation to your registered email or phone). We will not delete accounts in response to requests that cannot be verified.</p>
            <p>In rare cases, some data may be retained longer if required by applicable law or a legal hold (for example, employment dispute investigations).</p>
        </section>

        <section>
            <h2>Contact &amp; support</h2>
            <p>If you have questions or need assistance, contact our support team:</p>
            <ul>
            <li>Email: <a href="erptig@gmail.com">erptig@gmail.com</a></li>
            <li>Developer: Techno India Group</li>
            <li>Website: <a href="https://myhr.techtron.net">https://myhr.techtron.net</a></li>
            </ul>
            <p><a className={styles.btn} href="mailto:erptig@gmail.com?subject=Delete%20my%20MY%20HR%20account">Request account deletion</a></p>
        </section>

        <footer>
            <p>This page refers to the MY HR mobile app (package <span className={styles.kbd}>com.techtrontracker</span>) and is maintained by Techno India Group. Last updated: <time datetime="2025-10-25">October 25, 2025</time>.</p>
        </footer>
        </main>

    </div>
  )
}

export default index