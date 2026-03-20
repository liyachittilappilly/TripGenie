"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Sparkles, MapPin, Calendar, Wallet, Users, Star, ChevronRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  suggestions?: string[]
  packages?: TravelPackage[]
  isTyping?: boolean
}

interface TravelPackage {
  id: string
  name: string
  destination: string
  duration: string
  price: number
  rating: number
  image: string
  matchScore: number
  matchReasons: string[]
  highlights: string[]
}

interface UserPreferences {
  destination?: string
  budget?: string
  duration?: string
  travelType?: string
  travelers?: string
}

const samplePackages: TravelPackage[] = [
  {
    id: "1",
    name: "Enchanting Kerala Backwaters",
    destination: "Kerala, India",
    duration: "5 Days / 4 Nights",
    price: 25999,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=300&fit=crop",
    matchScore: 95,
    matchReasons: ["Matches your beach preference", "Within your budget", "Perfect duration"],
    highlights: ["Houseboat Stay", "Ayurvedic Spa", "Backwater Cruise"]
  },
  {
    id: "2",
    name: "Mystical Manali Adventure",
    destination: "Manali, India",
    duration: "6 Days / 5 Nights",
    price: 22499,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400&h=300&fit=crop",
    matchScore: 88,
    matchReasons: ["Adventure activities", "Scenic mountain views", "Budget friendly"],
    highlights: ["Rohtang Pass", "Solang Valley", "River Rafting"]
  },
  {
    id: "3",
    name: "Royal Rajasthan Heritage",
    destination: "Rajasthan, India",
    duration: "7 Days / 6 Nights",
    price: 32999,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&h=300&fit=crop",
    matchScore: 82,
    matchReasons: ["Cultural experience", "Historic sites", "Unique accommodations"],
    highlights: ["Palace Stay", "Desert Safari", "Heritage Walk"]
  }
]

const quickSuggestions = [
  "Beach vacation",
  "Mountain retreat",
  "Cultural experience",
  "Adventure trip",
  "Budget friendly",
  "Luxury escape"
]

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "bot",
      content: "Hello! I'm TripGenie, your AI travel companion. I'll help you find the perfect travel package based on your preferences. Where would you like to go? Or tell me what kind of experience you're looking for!",
      timestamp: new Date(),
      suggestions: quickSuggestions
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [preferences, setPreferences] = useState<UserPreferences>({})
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const analyzeIntent = (message: string): { intent: string; value?: string } => {
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes("beach") || lowerMessage.includes("goa") || lowerMessage.includes("kerala")) {
      return { intent: "destination_beach", value: "beaches" }
    }
    if (lowerMessage.includes("mountain") || lowerMessage.includes("manali") || lowerMessage.includes("shimla")) {
      return { intent: "destination_mountain", value: "mountains" }
    }
    if (lowerMessage.includes("budget") || lowerMessage.includes("cheap") || lowerMessage.includes("affordable")) {
      return { intent: "budget_low", value: "budget" }
    }
    if (lowerMessage.includes("luxury") || lowerMessage.includes("premium") || lowerMessage.includes("5 star")) {
      return { intent: "budget_high", value: "luxury" }
    }
    if (lowerMessage.includes("adventure") || lowerMessage.includes("trek") || lowerMessage.includes("rafting")) {
      return { intent: "type_adventure", value: "adventure" }
    }
    if (lowerMessage.includes("culture") || lowerMessage.includes("heritage") || lowerMessage.includes("historical")) {
      return { intent: "type_cultural", value: "cultural" }
    }
    if (lowerMessage.includes("week") || lowerMessage.includes("7 day")) {
      return { intent: "duration", value: "7 days" }
    }
    if (lowerMessage.includes("3 day") || lowerMessage.includes("weekend")) {
      return { intent: "duration", value: "3 days" }
    }
    if (lowerMessage.includes("5 day")) {
      return { intent: "duration", value: "5 days" }
    }
    return { intent: "general" }
  }

  const generateResponse = (userMessage: string): { content: string; suggestions?: string[]; showPackages?: boolean } => {
    const analysis = analyzeIntent(userMessage)
    const newPrefs = { ...preferences }
    
    if (analysis.intent.startsWith("destination")) {
      newPrefs.destination = analysis.value
      setPreferences(newPrefs)
      
      if (!preferences.budget) {
        return {
          content: `Great choice! ${analysis.value === "beaches" ? "Beach destinations are perfect for relaxation." : "Mountain escapes offer breathtaking views!"} I've noted your preference. What's your budget range for this trip?`,
          suggestions: ["Under ₹20,000", "₹20,000 - ₹35,000", "₹35,000 - ₹50,000", "Above ₹50,000"]
        }
      }
    }
    
    if (analysis.intent.startsWith("budget")) {
      newPrefs.budget = analysis.value
      setPreferences(newPrefs)
      
      if (!preferences.duration) {
        return {
          content: `Perfect! I'll find ${analysis.value === "luxury" ? "premium" : "budget-friendly"} options for you. How many days are you planning for this trip?`,
          suggestions: ["3-4 days", "5-6 days", "Week long", "10+ days"]
        }
      }
    }
    
    if (analysis.intent === "duration") {
      newPrefs.duration = analysis.value
      setPreferences(newPrefs)
    }
    
    if (analysis.intent.startsWith("type")) {
      newPrefs.travelType = analysis.value
      setPreferences(newPrefs)
    }

    // Check if we have enough preferences to show packages
    const prefCount = Object.keys(newPrefs).filter(k => newPrefs[k as keyof UserPreferences]).length
    
    if (prefCount >= 2) {
      return {
        content: `Based on your preferences, I've found some amazing packages that match your criteria. Here are my top recommendations, ranked by how well they match your needs:`,
        showPackages: true
      }
    }

    return {
      content: "I'd love to help you find the perfect trip! Tell me more about what you're looking for - destination type, budget, duration, or the kind of experience you want.",
      suggestions: quickSuggestions
    }
  }

  const handleSend = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500))

    const response = generateResponse(inputValue)
    
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "bot",
      content: response.content,
      timestamp: new Date(),
      suggestions: response.suggestions,
      packages: response.showPackages ? samplePackages : undefined
    }

    setIsTyping(false)
    setMessages(prev => [...prev, botMessage])
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
  }

  return (
    <div className="flex flex-col h-[600px] md:h-[700px] w-full max-w-3xl mx-auto bg-card/50 backdrop-blur-xl rounded-2xl border border-border/50 shadow-2xl overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border/50 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">TripGenie AI</h3>
          <p className="text-xs text-muted-foreground">Context-aware travel recommendations</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
            Online
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={cn(
            "flex",
            message.type === "user" ? "justify-end" : "justify-start"
          )}>
            <div className={cn(
              "max-w-[85%] rounded-2xl px-4 py-3",
              message.type === "user" 
                ? "bg-primary text-primary-foreground rounded-br-md" 
                : "bg-secondary/50 text-foreground rounded-bl-md"
            )}>
              <p className="text-sm leading-relaxed">{message.content}</p>
              
              {/* Suggestions */}
              {message.suggestions && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {message.suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-3 py-1.5 text-xs rounded-full bg-primary/20 hover:bg-primary/30 text-primary transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {/* Package Cards */}
              {message.packages && (
                <div className="mt-4 space-y-3">
                  {message.packages.map((pkg) => (
                    <div key={pkg.id} className="bg-card/80 rounded-xl p-3 border border-border/50">
                      <div className="flex gap-3">
                        <img 
                          src={pkg.image} 
                          alt={pkg.name}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-semibold text-sm text-foreground truncate">{pkg.name}</h4>
                            <div className="flex items-center gap-1 shrink-0">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                <span className="text-xs font-bold text-primary-foreground">{pkg.matchScore}%</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <MapPin className="w-3 h-3" />
                            <span>{pkg.destination}</span>
                            <Calendar className="w-3 h-3 ml-2" />
                            <span>{pkg.duration}</span>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                              <span className="text-xs font-medium text-foreground">{pkg.rating}</span>
                            </div>
                            <span className="text-sm font-bold text-primary">₹{pkg.price.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Match Reasons */}
                      <div className="mt-2 p-2 rounded-lg bg-primary/10">
                        <p className="text-xs font-medium text-primary mb-1">Why this matches you:</p>
                        <div className="flex flex-wrap gap-1">
                          {pkg.matchReasons.map((reason, idx) => (
                            <span key={idx} className="text-xs text-muted-foreground">
                              {idx > 0 && "•"} {reason}
                            </span>
                          ))}
                        </div>
                      </div>

                      <Button size="sm" className="w-full mt-2 bg-primary/20 hover:bg-primary/30 text-primary">
                        View Details <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-secondary/50 rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground">TripGenie is thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Preference Tags */}
      {Object.keys(preferences).length > 0 && (
        <div className="px-4 py-2 border-t border-border/30 bg-secondary/20">
          <p className="text-xs text-muted-foreground mb-1">Your preferences:</p>
          <div className="flex flex-wrap gap-2">
            {preferences.destination && (
              <span className="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {preferences.destination}
              </span>
            )}
            {preferences.budget && (
              <span className="px-2 py-1 text-xs rounded-full bg-accent/20 text-accent flex items-center gap-1">
                <Wallet className="w-3 h-3" /> {preferences.budget}
              </span>
            )}
            {preferences.duration && (
              <span className="px-2 py-1 text-xs rounded-full bg-chart-3/20 text-chart-3 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {preferences.duration}
              </span>
            )}
            {preferences.travelType && (
              <span className="px-2 py-1 text-xs rounded-full bg-chart-4/20 text-chart-4 flex items-center gap-1">
                <Users className="w-3 h-3" /> {preferences.travelType}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-border/50 bg-card/30">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Tell me about your dream trip..."
            className="flex-1 bg-secondary/50 border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
          <Button 
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping}
            className="h-12 w-12 rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
