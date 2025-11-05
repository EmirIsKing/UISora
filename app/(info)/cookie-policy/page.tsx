import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy – UISora',
  description: 'Learn what cookies UISora uses and how to control them.',
  alternates: { canonical: '/cookie-policy' },
  openGraph: {
    title: 'Cookie Policy – UISora',
    description: 'Learn what cookies UISora uses and how to control them.',
    images: [{ url: '/uisora-gradient.png', width: 1200, height: 630 }],
  },
}

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: January 2025</p>
        
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies?</h2>
            <p className="mb-4">
              Cookies are small text files that are placed on your device when you visit a website. They are widely 
              used to make websites work more efficiently and provide information to website owners. This Cookie 
              Policy explains how UISora uses cookies and similar technologies.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Cookies</h2>
            <p className="mb-4">We use cookies for the following purposes:</p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for the Service to function properly</li>
              <li><strong>Authentication:</strong> To keep you logged in and verify your identity</li>
              <li><strong>Preferences:</strong> To remember your settings and preferences</li>
              <li><strong>Analytics:</strong> To understand how visitors interact with the Service</li>
              <li><strong>Performance:</strong> To monitor and improve Service performance</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">3. Types of Cookies We Use</h2>
            
            <h3 className="text-xl font-semibold mb-3">3.1 Strictly Necessary Cookies</h3>
            <p className="mb-4">
              These cookies are essential for the Service to function properly. They enable core functionality 
              such as user authentication, security, and navigation. You cannot opt out of these cookies.
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Session management and authentication</li>
              <li>Security and fraud prevention</li>
              <li>Load balancing and server routing</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">3.2 Performance and Analytics Cookies</h3>
            <p className="mb-4">
              These cookies help us understand how visitors interact with the Service by collecting and reporting 
              information anonymously.
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li><strong>Firebase Analytics:</strong> Tracks usage patterns, page views, and user behavior</li>
              <li>Performance monitoring and error tracking</li>
              <li>Service optimization insights</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">3.3 Functionality Cookies</h3>
            <p className="mb-4">
              These cookies allow the Service to remember choices you make and provide enhanced, personalized features.
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Theme preferences (light/dark mode)</li>
              <li>Language and region settings</li>
              <li>Display preferences</li>
              <li>Recent projects and activity</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">3.4 Third-Party Cookies</h3>
            <p className="mb-4">We may use third-party services that set their own cookies:</p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li><strong>Firebase (Google):</strong> Authentication and analytics</li>
              <li><strong>LemonSqueezy:</strong> Payment processing and security</li>
              <li><strong>Vercel:</strong> Infrastructure and performance monitoring</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">4. Cookie Duration</h2>
            
            <h3 className="text-xl font-semibold mb-3">4.1 Session Cookies</h3>
            <p className="mb-4">
              Session cookies are temporary and deleted when you close your browser. They are essential for 
              maintaining your session and authentication state.
            </p>

            <h3 className="text-xl font-semibold mb-3">4.2 Persistent Cookies</h3>
            <p className="mb-4">
              Persistent cookies remain on your device for a set period or until you delete them. They remember 
              your preferences and login status across sessions.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">5. Managing Your Cookie Preferences</h2>
            <p className="mb-4">You have several options to manage cookies:</p>
            
            <h3 className="text-xl font-semibold mb-3">5.1 Browser Settings</h3>
            <p className="mb-4">
              Most browsers allow you to control cookies through their settings. You can:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Block all cookies</li>
              <li>Block third-party cookies</li>
              <li>Delete existing cookies</li>
              <li>Be notified before cookies are set</li>
            </ul>
            <p className="mb-4">
              Please note that blocking certain cookies may affect the functionality of the Service.
            </p>

            <h3 className="text-xl font-semibold mb-3">5.2 Browser-Specific Instructions</h3>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
              <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
              <li><strong>Edge:</strong> Settings → Privacy, search, and services → Cookies and site permissions</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">5.3 Analytics Opt-Out</h3>
            <p className="mb-4">
              You can opt out of Firebase Analytics by configuring your browser settings or using Google&apos;s 
              opt-out tool: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Analytics Opt-out</a>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">6. Similar Technologies</h2>
            <p className="mb-4">
              In addition to cookies, we may use similar technologies such as:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li><strong>Local Storage:</strong> To store preferences and temporary data in your browser</li>
              <li><strong>Session Storage:</strong> To maintain session data while you browse</li>
              <li><strong>Web Beacons:</strong> To track email open rates and engagement</li>
              <li><strong>Pixel Tags:</strong> To measure Service usage and effectiveness</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">7. Cookies We Don&apos;t Use</h2>
            <p className="mb-4">
              We do not currently use:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Advertising or marketing cookies from third-party ad networks</li>
              <li>Social media tracking cookies</li>
              <li>Behavioral advertising cookies</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">8. Updates to This Policy</h2>
            <p className="mb-4">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for 
              operational, legal, or regulatory reasons. We will post the updated policy on this page and 
              update the &ldquo;Last updated&ldquo; date.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
            <p className="mb-4">
              If you have questions about our use of cookies, please contact us at:
            </p>
            <ul className="list-none space-y-2">
              <li><strong>Email:</strong> support@uisora.com</li>
              <li><strong>Website:</strong> https://uisora.ai</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

