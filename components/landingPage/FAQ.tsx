import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  
  const faqs = [
    {
      question: "How does the AI generation work?",
      answer: "Our AI uses advanced machine learning models trained on thousands of modern mobile UI designs. Simply describe your app in natural language, and our AI analyzes your requirements to generate beautiful, production-ready interfaces that match your vision.",
    },
    {
      question: "What formats can I export my designs in?",
      answer: "You can export your designs as React Native code, Flutter code, or design files (Figma, Sketch). Pro users also get access to additional formats including HTML/CSS and native iOS/Android code.",
    },
    {
      question: "How many credits do I get with the free plan?",
      answer: "The free plan includes 5 credits to get you started. Each generation typically costs 1 credit. This lets you try out the platform and see if it fits your needs before upgrading.",
    },
    {
      question: "Can I customize the generated UIs?",
      answer: "Absolutely! You have full control over colors, typography, layouts, and components. You can also regenerate specific sections or make manual adjustments after export.",
    },
    {
      question: "Is the generated code production-ready?",
      answer: "Yes! All generated code follows industry best practices, is fully responsive, and includes proper component structure. However, we recommend reviewing and testing the code as you would with any generated content.",
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee for Pro subscriptions. If you're not satisfied with Design Forge, contact our support team within 30 days of purchase for a full refund.",
    },
  ];
  
  const FAQ = () => {
    return (
      <section className="py-7 bg-background" id="faq">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about Design Forge
            </p>
          </div>
  
          <div className="max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-lg px-6 hover:border-primary/50 transition-colors"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    );
  };
  
  export default FAQ;
  