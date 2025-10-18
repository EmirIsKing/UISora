import { MessageSquare, Wand2, FileCode } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "Describe",
    description: "Tell us about your app idea in plain English. Be as detailed or simple as you like.",
  },
  {
    icon: Wand2,
    number: "02",
    title: "Generate",
    description: "Our AI processes your description and creates beautiful, modern mobile interfaces in seconds.",
  },
  {
    icon: FileCode,
    number: "03",
    title: "Export",
    description: "Download your designs as production-ready code or design files, ready to use in your project.",
  },
];

const HowItWorks = () => {
  return (
    <section
      className="mx-auto max-w-5xl z-20 max-md:py-2 max-md:pb-8 items-center gap-10 px-6 py-6" id="how-it-works">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2
            className="text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            How It Works
          </h2>
          <p
            className="text-xl max-w-2xl mx-auto text-muted-foreground"
          >
            From idea to production-ready UI in three simple steps
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-16 left-full w-full h-0.5 -z-10"
                  style={{
                    background: "linear-gradient(to right, #3b82f6, transparent)",
                  }}
                />
              )}

              <div className="text-center">
                {/* Icon Circle */}
                <div
                  className="relative inline-flex items-center justify-center w-32 h-32 rounded-full mb-6"
                  style={{
                    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    boxShadow: "0 0 60px rgba(59, 130, 246, 0.4)",
                  }}
                >
                  <step.icon className="w-12 h-12" color="#ffffff" />
                  <div
                    className="absolute -top-2 -right-2 w-12 h-12 rounded-full border-2 flex items-center justify-center"
                    style={{
                      backgroundColor: "#0b1120",
                      borderColor: "#3b82f6",
                    }}
                  >
                    <span className="text-sm font-bold" style={{ color: "#3b82f6" }}>
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Step Title */}
                <h3 className="text-2xl font-bold mb-3 text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
