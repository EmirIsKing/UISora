import React from 'react'
import Link from 'next/link'
import { Sparkles, Wand2, Zap, Code, Layers, Shield, Users, Target } from 'lucide-react'
import Logo from '@/components/Logo'

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Logo variant="gradient" />
          </div>
          <h1 className="text-5xl font-bold mb-4">About UISora</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Empowering creators to build beautiful mobile interfaces with the power of AI
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-3xl font-semibold mb-6 flex items-center gap-3">
              <Target className="text-primary" size={32} />
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              At UISora, we believe that great design should be accessible to everyone. We're on a mission to 
              democratize mobile UI/UX design by harnessing the power of artificial intelligence to transform 
              ideas into beautiful, production-ready interfaces in seconds.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you're a startup founder, a designer, a developer, or someone with a creative vision, 
              UISora empowers you to bring your app ideas to life without the traditional barriers of time, 
              cost, or design expertise.
            </p>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">What We Do</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <Wand2 className="text-primary mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-3">AI-Powered Design Generation</h3>
              <p className="text-muted-foreground">
                Simply describe your app vision in plain English, and our advanced AI models transform your 
                ideas into stunning, modern mobile interfaces. No design skills required.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <Layers className="text-primary mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-3">Complete App Flows</h3>
              <p className="text-muted-foreground">
                Generate entire app experiences with multiple connected screens, including splash screens, 
                onboarding flows, and feature screens—all seamlessly integrated.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <Code className="text-primary mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-3">Production-Ready Export</h3>
              <p className="text-muted-foreground">
                Download your designs as clean, exportable code and design assets that integrate seamlessly 
                into your development workflow.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <Zap className="text-primary mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
              <p className="text-muted-foreground">
                What used to take designers hours or days now happens in seconds. Iterate on your designs 
                instantly and explore multiple concepts effortlessly.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Users className="text-primary mb-4 mx-auto" size={32} />
              <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
              <p className="text-muted-foreground">
                We believe great design tools should be available to everyone, regardless of technical 
                expertise or budget constraints.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Zap className="text-primary mb-4 mx-auto" size={32} />
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-muted-foreground">
                We continuously push the boundaries of what's possible with AI and design, staying at the 
                forefront of technology.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Shield className="text-primary mb-4 mx-auto" size={32} />
              <h3 className="text-xl font-semibold mb-3">Transparency</h3>
              <p className="text-muted-foreground">
                Clear pricing, honest communication, and respect for your privacy are fundamental to 
                everything we do.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works - Simplified */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">How It Works</h2>
          <div className="bg-card border border-border rounded-lg p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Describe</h3>
                <p className="text-muted-foreground">
                  Tell us about your app idea in natural language. Be as detailed or as simple as you like—our 
                  AI understands context and intent.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Generate</h3>
                <p className="text-muted-foreground">
                  Our AI processes your description, applies modern design principles, and creates beautiful 
                  mobile interfaces in seconds.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Export</h3>
                <p className="text-muted-foreground">
                  Download your designs as production-ready code or design files, ready to integrate into 
                  your project.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Credit System Section */}
        <section className="mb-16">
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-3xl font-semibold mb-6">Fair & Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground mb-6">
              UISora operates on a credit-based system designed to be fair and transparent:
            </p>
            <ul className="list-disc list-inside space-y-3 text-muted-foreground mb-6">
              <li>Pay only for what you use—no hidden fees or surprise charges</li>
              <li>Clear credit pricing for UI generation, image creation, and conversions</li>
              <li>Preflight credit estimation before generation so you always know the cost</li>
              <li>Flexible packages and subscription options to suit your needs</li>
              <li>New users receive free credits to get started</li>
            </ul>
            <div className="mt-6">
              <Link 
                href="/pricing" 
                className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </section>

        {/* Join Us Section */}
        <section className="mb-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 border border-border rounded-lg p-12">
            <h2 className="text-3xl font-semibold mb-4">Join Thousands of Creators</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              From startups to established companies, designers to developers—UISora is helping creators 
              worldwide bring their app visions to life faster than ever before.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link 
                href="/sign-up" 
                className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Get Started Free
              </Link>
              <Link 
                href={`${process.env.BASE_URL}#examples`}
                className="inline-block bg-card border border-border text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-accent transition-colors"
              >
                View Examples
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="text-center">
          <h2 className="text-3xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-muted-foreground mb-6">
            Have questions, feedback, or want to learn more? We'd love to hear from you.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <a 
              href="mailto:support@uisora.ai" 
              className="text-primary hover:underline"
            >
              support@uisora.ai
            </a>
            <span className="hidden md:inline text-muted-foreground">•</span>
            <Link 
              href="/privacy-policy" 
              className="text-primary hover:underline"
            >
              Privacy Policy
            </Link>
            <span className="hidden md:inline text-muted-foreground">•</span>
            <Link 
              href="/terms-of-service" 
              className="text-primary hover:underline"
            >
              Terms of Service
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

