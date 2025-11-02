import React from 'react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: January 2025</p>
        
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="mb-4">
              Welcome to UISora (the "Service"). We respect your privacy and are committed to protecting 
              your personal data. This privacy policy explains how we collect, use, disclose, and safeguard your 
              information when you use our AI-powered UI generation platform.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold mb-3">2.1 Information You Provide</h3>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Account registration details (email address, name)</li>
              <li>Profile information (including profile pictures)</li>
              <li>Project data, UI designs, and prompts you create</li>
              <li>Payment information processed through our third-party payment provider</li>
              <li>Communications you send to us (feedback, support requests)</li>
              <li>Newsletter subscription information (if applicable)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">2.2 Automatically Collected Information</h3>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Usage data and analytics (pages visited, features used, time spent)</li>
              <li>Device information (browser type, operating system, device identifiers)</li>
              <li>IP addresses and general location data</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">We use your information to:</p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Provide, maintain, and improve our Service</li>
              <li>Process your account registration and manage your user profile</li>
              <li>Generate UI designs based on your prompts using AI services</li>
              <li>Process payments and manage credit transactions</li>
              <li>Communicate with you about your account, projects, and our Service</li>
              <li>Send you marketing communications (with your consent where required)</li>
              <li>Monitor and analyze usage patterns to enhance user experience</li>
              <li>Detect and prevent fraud, abuse, and security threats</li>
              <li>Comply with legal obligations and enforce our Terms of Service</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">4. Third-Party Services</h2>
            <p className="mb-4">We use the following third-party services that may collect or process your data:</p>
            
            <h3 className="text-xl font-semibold mb-3">4.1 AI Services</h3>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li><strong>OpenAI</strong></li>
              <li><strong>FAL AI (fal.ai)</strong></li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">4.2 Infrastructure & Storage</h3>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li><strong>Firebase (Google)</strong></li>
              <li><strong>Vercel Blob</strong></li>
              <li><strong>Firebase Analytics:</strong> Tracks usage patterns and app performance</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">4.3 Payment Processing</h3>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li><strong>LemonSqueezy:</strong> Processes subscription and credit purchases securely</li>
            </ul>

            <p className="mb-4">
              These third-party services have their own privacy policies. We encourage you to review them 
              to understand how your data is handled.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">5. Data Sharing and Disclosure</h2>
            <p className="mb-4">We do not sell your personal data. We may share your information:</p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>With third-party service providers who perform services on our behalf (as listed above)</li>
              <li>When required by law, court order, or government regulation</li>
              <li>To protect our rights, property, or safety, or that of our users</li>
              <li>In connection with a business transfer, merger, or acquisition</li>
              <li>With your explicit consent</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
            <p className="mb-4">
              We implement appropriate technical and organizational measures to protect your personal data 
              against unauthorized access, alteration, disclosure, or destruction. However, no method of 
              transmission over the internet or electronic storage is 100% secure.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
            <p className="mb-4">Depending on your location, you may have the following rights:</p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
              <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
              <li><strong>Erasure:</strong> Request deletion of your personal data</li>
              <li><strong>Restriction:</strong> Limit how we process your data</li>
              <li><strong>Portability:</strong> Request your data in a structured, commonly used format</li>
              <li><strong>Objection:</strong> Object to certain processing activities</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing activities</li>
            </ul>
            <p className="mb-4">
              To exercise these rights, please contact us at the email address provided in Section 9.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
            <p className="mb-4">
              Our Service is not intended for users under the age of 13 (or the applicable age of consent 
              in your jurisdiction). We do not knowingly collect personal information from children. If you 
              become aware that a child has provided us with personal information, please contact us immediately.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">9. International Data Transfers</h2>
            <p className="mb-4">
              Your information may be transferred to and processed in countries other than your own. We ensure 
              that appropriate safeguards are in place to protect your data in accordance with this policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">10. Changes to This Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. We will notify you of significant changes 
              by posting the new policy on this page and updating the "Last updated" date. Your continued use 
              of the Service after changes become effective constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
            <p className="mb-4">
              If you have questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <ul className="list-none space-y-2">
              <li><strong>Email:</strong> privacy@uisora.ai</li>
              <li><strong>Website:</strong> https://uisora.ai</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

