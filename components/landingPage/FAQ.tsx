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
      answer: "You can export your designs as PNG, JSON, HTML/css",
    },
    {
      question: "How many credits do I get with the free plan?",
      answer: "You get 2000 credits for creating an account for testing and more can be bought if needed. Check pricing section for more info.",
    },
    {
      question: "Can I customize the generated UIs?",
      answer: "Absolutely! You can customize UI's with chain prompting.",
    }
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
              Everything you need to know about UISora
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
  