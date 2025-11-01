import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, MessageCircle, ListChecks, Camera, Heart, TrendingUp } from "lucide-react";
import Link from "next/link";

const examples = [
  {
    icon: ShoppingBag,
    category: "E-Commerce",
    prompt: "Create a modern e-commerce app with product grid and cart",
    color: "from-blue-500 to-cyan-500",
    link: "/project/view/9ecd2747-6b1f-402d-8247-dff51fd0c3a9"
  },
  {
    icon: MessageCircle,
    category: "Social Media",
    prompt: "Design a chat app with stories and messaging features",
    color: "from-purple-500 to-pink-500",
    link: "/project/view/91a151b7-7283-4037-a860-cde7c48a1cb7"
  },
  {
    icon: ListChecks,
    category: "Productivity",
    prompt: "Build a task manager with kanban board and calendar",
    color: "from-green-500 to-emerald-500",
    link: "/project/view/7bc963c6-92f6-4308-9105-7c7ff09d1bba"
  },
  {
    icon: Camera,
    category: "Photo Sharing",
    prompt: "Create an Instagram-like app with photo feed and filters",
    color: "from-orange-500 to-red-500",
    link: "/project/view/35c20f37-7436-4596-8c26-ef60d70a377b"
  },
  {
    icon: Heart,
    category: "Health & Fitness",
    prompt: "Design a workout tracking app with progress charts",
    color: "from-rose-500 to-pink-500",
    link: "/project/view/da81c142-599b-404d-9670-8a1d1e5684bf"
  },
  {
    icon: TrendingUp,
    category: "Finance",
    prompt: "Build a crypto trading app with real-time charts",
    color: "from-indigo-500 to-purple-500",
    link: "/project/view/38f8abcc-1af9-405a-993d-dd2fe526adf2"
  },
];

const Examples = () => {
  return (
    <section id="examples" className="py-10 bg-background">
      <div className="container mx-auto max-w-5xl z-20 max-md:py-2 max-md:pb-8 items-center gap-10 px-6 py-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            See What's Possible
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From simple ideas to stunning interfaces across all app categories
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examples.map((example, index) => (
            <Card 
              key={index}
              className="group bg-card border-border hover:border-primary/50 transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-primary/20 animate-fade-in overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${example.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <example.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{example.category}</h3>
                <p className="text-sm text-muted-foreground mb-4">{example.prompt}</p>
                
                <Link href={example.link} className="flex items-center text-sm text-primary group-hover:translate-x-2 transition-transform duration-300">
                  View Example →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Examples;
