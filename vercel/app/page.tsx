import { Header } from "@/components/tripgenie/header"
import { HeroSection } from "@/components/tripgenie/hero-section"
import { FeaturesSection } from "@/components/tripgenie/features-section"
import { HowItWorksSection } from "@/components/tripgenie/how-it-works-section"
import { ChatbotSection } from "@/components/tripgenie/chatbot-section"
import { DestinationsSection } from "@/components/tripgenie/destinations-section"
import { Footer } from "@/components/tripgenie/footer"

export default function TripGeniePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ChatbotSection />
      <DestinationsSection />
      <Footer />
    </main>
  )
}
