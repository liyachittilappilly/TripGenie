"use client"

import { motion } from "framer-motion"
import { MapPin, TrendingUp, Star } from "lucide-react"

const destinations = [
  {
    name: "Kerala",
    country: "India",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500&h=600&fit=crop",
    packages: 45,
    trending: true,
    rating: 4.9
  },
  {
    name: "Manali",
    country: "India",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=500&h=600&fit=crop",
    packages: 38,
    trending: true,
    rating: 4.8
  },
  {
    name: "Goa",
    country: "India",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&h=600&fit=crop",
    packages: 52,
    trending: false,
    rating: 4.7
  },
  {
    name: "Rajasthan",
    country: "India",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=500&h=600&fit=crop",
    packages: 41,
    trending: true,
    rating: 4.9
  },
  {
    name: "Andaman",
    country: "India",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=600&fit=crop",
    packages: 28,
    trending: false,
    rating: 4.8
  },
  {
    name: "Ladakh",
    country: "India",
    image: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=500&h=600&fit=crop",
    packages: 33,
    trending: true,
    rating: 4.9
  }
]

export function DestinationsSection() {
  return (
    <section id="destinations" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-chart-4/10 text-chart-4 text-sm font-medium mb-4">
            Popular Destinations
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Trending This Month
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the most popular destinations our travelers are exploring right now.
          </p>
        </motion.div>

        {/* Destinations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer"
            >
              {/* Image */}
              <img
                src={destination.image}
                alt={destination.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Trending Badge */}
              {destination.trending && (
                <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-chart-4/90 text-background text-xs font-medium">
                  <TrendingUp className="w-3 h-3" />
                  Trending
                </div>
              )}

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-1 text-white/80 text-sm mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{destination.country}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{destination.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-sm">{destination.packages} packages</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <span className="text-white font-medium">{destination.rating}</span>
                  </div>
                </div>

                {/* Hover Action */}
                <div className="mt-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <button className="w-full py-2.5 rounded-xl bg-white/20 backdrop-blur-sm text-white text-sm font-medium hover:bg-white/30 transition-colors">
                    Explore Packages
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
