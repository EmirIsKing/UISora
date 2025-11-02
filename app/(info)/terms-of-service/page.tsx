import React from 'react'

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: January 2025</p>
        
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
            <p className="mb-4">
              By accessing or using UISora (the "Service"), you agree to be bound by these Terms of Service 
              ("Terms"). If you disagree with any part of these terms, you may not access the Service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
            <p className="mb-4">
              UISora is an AI-powered platform that generates mobile UI designs based on user descriptions. 
              The Service includes:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>AI-generated UI/UX designs for mobile applications</li>
              <li>Image generation for UI components</li>
              <li>Project management and storage</li>
              <li>Credit-based usage system</li>
              <li>Export capabilities for generated designs</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
            <h3 className="text-xl font-semibold mb-3">3.1 Registration</h3>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>You must be at least 13 years old to use the Service</li>
              <li>You must provide accurate and complete registration information</li>
              <li>You are responsible for maintaining the security of your account</li>
              <li>You must notify us immediately of any unauthorized access</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">3.2 Account Responsibility</h3>
            <p className="mb-4">
              You are responsible for all activities that occur under your account. We reserve the right to suspend 
              or terminate accounts that violate these Terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">4. Credit System and Payments</h2>
            <h3 className="text-xl font-semibold mb-3">4.1 Credits</h3>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>The Service operates on a credit-based system</li>
              <li>Credits are consumed for UI generation, image creation, and conversions</li>
              <li>Credits have no monetary value and cannot be exchanged for cash</li>
              <li>Credits do not expire unless your account is terminated</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">4.2 Purchases and Refunds</h3>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>All purchases are processed through LemonSqueezy</li>
              <li>Prices and credit packages may change at any time</li>
              <li>All sales are final - credits are non-refundable</li>
              <li>We reserve the right to refuse or cancel orders</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">4.3 Subscription Terms</h3>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Subscriptions automatically renew unless cancelled</li>
              <li>You may cancel your subscription at any time</li>
              <li>No refunds for partial subscription periods</li>
              <li>We may change subscription fees with 30 days notice</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">5. Acceptable Use</h2>
            <p className="mb-4">You agree NOT to:</p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Use the Service for any illegal or unauthorized purpose</li>
              <li>Violate any laws in your jurisdiction</li>
              <li>Transmit malicious code, viruses, or harmful software</li>
              <li>Attempt to gain unauthorized access to the Service or its systems</li>
              <li>Interfere with or disrupt the Service's operation</li>
              <li>Generate content that is illegal, harmful, offensive, or violates others' rights</li>
              <li>Use the Service to create content that infringes intellectual property rights</li>
              <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
              <li>Use automated systems to access the Service without permission</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
            <h3 className="text-xl font-semibold mb-3">6.1 Your Content</h3>
            <p className="mb-4">
              You retain ownership of any designs, prompts, and content you create using the Service. By using 
              the Service, you grant us a license to use, store, and process your content to provide the Service.
            </p>

            <h3 className="text-xl font-semibold mb-3">6.2 AI-Generated Content</h3>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>You own the rights to UI designs generated for you</li>
              <li>Our AI models are trained on publicly available data</li>
              <li>No warranty that generated content won't infringe third-party rights</li>
              <li>You are responsible for verifying content doesn't infringe rights</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">6.3 Service Ownership</h3>
            <p className="mb-4">
              The Service, including all software, designs, and content, is owned by UISora and protected 
              by intellectual property laws.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">7. Service Availability</h2>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>We strive to maintain Service availability but do not guarantee uninterrupted access</li>
              <li>The Service may be temporarily unavailable for maintenance or updates</li>
              <li>We reserve the right to modify or discontinue the Service at any time</li>
              <li>We are not liable for any loss resulting from Service unavailability</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">8. Disclaimer of Warranties</h2>
            <p className="mb-4">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS 
              OR IMPLIED. TO THE FULLEST EXTENT PERMISSIBLE BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, 
              INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, 
              AND NON-INFRINGEMENT.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
            <p className="mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, 
              CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR 
              INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM YOUR USE 
              OF THE SERVICE.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">10. Indemnification</h2>
            <p className="mb-4">
              You agree to indemnify and hold harmless UISora, its officers, directors, employees, and agents 
              from any claims, damages, losses, liabilities, and expenses (including attorney fees) arising from 
              your use of the Service or violation of these Terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">11. Termination</h2>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>You may terminate your account at any time</li>
              <li>We may terminate or suspend your account for violating these Terms</li>
              <li>Upon termination, your right to use the Service immediately ceases</li>
              <li>We may delete your data after a reasonable period following termination</li>
              <li>Sections relating to liability, indemnity, and dispute resolution survive termination</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">12. Governing Law and Disputes</h2>
            <p className="mb-4">
              These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], 
              without regard to conflict of law provisions. Any disputes arising from these Terms or the Service 
              shall be resolved through binding arbitration.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">13. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these Terms at any time. We will notify users of significant changes 
              via email or through the Service. Continued use of the Service after changes constitutes acceptance 
              of the modified Terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">14. Severability</h2>
            <p className="mb-4">
              If any provision of these Terms is found to be unenforceable or invalid, that provision shall be 
              limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain 
              in full force and effect.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">15. Contact Information</h2>
            <p className="mb-4">
              For questions about these Terms, please contact us at:
            </p>
            <ul className="list-none space-y-2">
              <li><strong>Email:</strong> legal@uisora.ai</li>
              <li><strong>Website:</strong> https://uisora.ai</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

