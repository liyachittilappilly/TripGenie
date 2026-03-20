"use client"

import { motion } from "framer-motion"
import { 
  Brain, 
  MessageSquare, 
  BarChart3, 
  Lightbulb, 
  RefreshCw, 
  SlidersHorizontal,
  Sparkles,
  Target
} from "lucide-react"

const features = [
  {
    icon: MessageSquare,
    title: "Adaptive Conversation",
    description: "Dynamic question flow that adapts based on your responses. No fixed scripts - just natural dialogue.",
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    icon: Brain,
    title: "Preference Memory",
    description: "Remembers what you said earlier and automatically factors it into recommendations. \"I like beaches\" → suggests coastal destinations.",
    color: "text-accent",
    bgColor: "bg-accent/10"
  },
  {
    icon: BarChart3,
    title: "Scoring Algorithm",
    description: "Intelligent ranking using weighted factors: Budget (40%), Destination (30%), Travel Type (20%), Duration (10%).",
    color: "text-chart-4",
    bgColor: "bg-chart-4/10"
  },
  {
    icon: Lightbulb,
    title: "Explainable AI",
    description: "Understand WHY each package is recommended. \"This suits you because it matches your budget and beach preference.\"",
    color: "text-chart-3",
    bgColor: "bg-chart-3/10"
  },
  {
    icon: RefreshCw,
    title: "Follow-Up Intelligence",
    description: "Say \"Too expensive\" and the system automatically adjusts budget and suggests cheaper alternatives.",
    color: "text-chart-5",
    bgColor: "bg-chart-5/10"
  },
  {
    icon: SlidersHorizontal,
    title: "Conversational Filters",
    description: "Refine naturally: \"Show cheaper options\", \"Only 3 days trip\", \"Not Goa, something else\" - results update live.",
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    icon: Sparkles,
    title: "Smart Suggestions",
    description: "When confused, get helpful prompts: \"Popular choices this month: Kerala, Manali, Goa\" - helpful, not robotic.",
    color: "text-accent",
    bgColor: "bg-accent/10"
  },
  {
    icon: Target,
    title: "Precision Matching",
    description: "98% match accuracy through multi-dimensional preference analysis and real-time scoring optimization.",
    color: "text-chart-4",
    bgColor: "bg-chart-4/10"
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Powerful Features
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Not Just a Chatbot.
            <br />
            <span className="text-primary">A Travel Decision Engine.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Powered by context-aware AI that dynamically understands your preferences and delivers 
            explainable, personalized recommendations.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Algorithm Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 p-8 rounded-2xl bg-card/50 border border-border/50"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Package Scoring Algorithm
              </h3>
              <p className="text-muted-foreground mb-6">
                Our proprietary scoring system ranks packages intelligently based on weighted factors 
                that matter most to travelers.
              </p>
              <div className="space-y-4">
                {[
                  { label: "Budget Match", value: 40, color: "bg-primary" },
                  { label: "Destination Match", value: 30, color: "bg-accent" },
                  { label: "Travel Type Match", value: 20, color: "bg-chart-4" },
                  { label: "Duration Match", value: 10, color: "bg-chart-3" }
                ].map((factor, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground">{factor.label}</span>
                      <span className="text-muted-foreground">{factor.value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary/50 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${factor.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                        className={`h-full ${factor.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-secondary/30 rounded-xl p-6 font-mono text-sm">
              <div className="text-muted-foreground mb-2">{"// Scoring Formula"}</div>
              <div className="text-foreground">
                <span className="text-primary">Score</span> = {"{"}
                <div className="pl-4">
                  <div><span className="text-accent">0.4</span> × Budget Match +</div>
                  <div><span className="text-accent">0.3</span> × Destination Match +</div>
                  <div><span className="text-accent">0.2</span> × Travel Type Match +</div>
                  <div><span className="text-accent">0.1</span> × Duration Match</div>
                </div>
                {"}"}
              </div>
              <div className="mt-4 pt-4 border-t border-border/50">
                <div className="text-muted-foreground">{"// Result"}</div>
                <div className="text-chart-4">
                  {"→ \"Top 3 recommendations based on your preferences\""}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
