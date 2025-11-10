import {
  View,
  Layers,
  WandSparkles,
  Coins,
  Download,
  //Lightbulb,
} from "lucide-react";

//import { Button } from "@/components/ui/button";

interface Feature {
  heading: string;
  description: string;
  icon: React.ReactNode;
}

interface Feature43Props {
  title?: string;
  features?: Feature[];
  buttonText?: string;
  buttonUrl?: string;
}

const Feature43 = ({
  title = "Everything you need to design apps fast",
  features = [
    {
      heading: "AI-Powered Generation",
      description:
        "Our core feature as a text to ui generator is transforming text into complete mobile UIs instantly.",
      icon: <WandSparkles className="size-6 text-[#8b5cf6]" />,
    },
    {
      heading: "Real-time Preview",
      description:
        "Watch your designs materialize in real-time.",
      icon: <View className="size-6 text-[#8b5cf6]" />,
    },
    {
      heading: "Export Ready",
      description:
        "Download production-ready code and design assets compatible with your workflow.",
      icon: <Download className="size-6 text-[#8b5cf6]" />,
    },
    {
      heading: "Multiple Screens",
      description:
        "Go beyond single views. Use our mobile interface builder to generate entire application flows with multiple, interconnected screens.",
      icon: <Layers className="size-6 text-[#8b5cf6]" />,
    },
    {
      heading: "Credit System",
      description:
        "Transparent, flexible pricing with no hidden fees or surprise charges.",
      icon: <Coins className="size-6 text-[#8b5cf6]" />,
    },
    {
      heading: "Innovation",
      description:
        "Cutting-edge design patterns and modern web technologies. Stay ahead with the latest trends in UI/UX design and development practices.",
      icon: <WandSparkles className="size-6 text-[#8b5cf6]" />,
    }
  ],
  //buttonText = "More Features",
  //buttonUrl = "https://shadcnblocks.com",
}: Feature43Props) => {
  return (
    <section className="py-14 max-md:py-12">
      <div className="container">
        {title && (
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="text-pretty text-4xl font-medium lg:text-5xl text-foreground">
              {title}
            </h2>
          </div>
        )}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div key={i} className="flex flex-col">
              <div className="bg-accent mb-5 flex size-16 items-center justify-center rounded-full border border-[#8b5cf6]/20">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">{feature.heading}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature43 };
