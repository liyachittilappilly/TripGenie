"use client"

import { motion } from "framer-motion"
import { MessageSquare, Brain, Sparkles, CheckCircle2 } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Start a Conversation",
    description: "Tell TripGenie about your dream trip naturally. No forms, no dropdowns - just chat like you would with a travel expert friend.",
    details: ["\"I want a beach vacation\"", "\"Budget around 30K\"", "\"For about a week\""]
  },
  {
    number: "02",
    icon: Brain,
    title: "AI Learns Your Preferences",
    description: "Our context-aware AI analyzes your inputs, remembers preferences, and builds a dynamic profile of what you're looking for.",
    details: ["Destination preference detected", "Budget range captured", "Duration noted"]
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Smart Package Ranking",
    description: "Using our scoring algorithm, packages are ranked based on how well they match your preferences - not just filtered, but intelligently ranked.",
    details: ["95% match score", "Weighted factor analysis", "Real-time optimization"]
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Explainable Recommendations",
    description: "Get personalized suggestions with clear explanations of WHY each package suits you. Refine naturally through conversation.",
    details: ["\"Matches your beach preference\"", "\"Within your budget\"", "\"Perfect 5-day duration\""]
  }
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            From Conversation to
            <br />
            <span className="text-accent">Perfect Trip</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Four simple steps powered by advanced AI to find your ideal travel package.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-chart-4 hidden md:block" />

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative md:flex items-center ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} md:mb-16`}
              >
                {/* Content */}
                <div className={`md:w-1/2 ${idx % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                  <div className={`p-6 rounded-2xl bg-card/50 border border-border/50 ${idx % 2 === 0 ? "md:ml-auto" : ""} max-w-lg`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl font-bold text-primary/30">{step.number}</span>
                      <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">{step.description}</p>
                    <div className="space-y-2">
                      {step.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span className="text-foreground/80">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Icon */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20 z-10 hidden md:flex">
                  <step.icon className="w-7 h-7 text-primary-foreground" />
                </div>

                {/* Mobile Icon */}
                <div className="md:hidden flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
