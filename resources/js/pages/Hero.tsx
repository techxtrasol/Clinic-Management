"use client"

import { Link } from "@inertiajs/react"
import { route } from "ziggy-js"
import {
  Calendar,
  Users,
  Shield,
  Clock,
  ArrowRight,
  CheckCircle,
  Star,
  ClipboardList,
  Stethoscope,
  Syringe,
  Pill,
  Microscope,
  Heart,
  Dna,
  FlaskConical,
  Thermometer,
  Info,
} from "lucide-react"
import { Button } from "@/components/ui/button"

// Array of Lucide icons to fall
const fallingIcons = [Stethoscope, Syringe, Pill, Microscope, Heart, Dna, FlaskConical, Thermometer]

export default function Hero() {
  // Generate a fixed number of falling items for consistency
  const numberOfFallingItems = 25 // Increased for more density
  const fallingItems = Array.from({ length: numberOfFallingItems }).map((_, i) => {
    const Icon = fallingIcons[Math.floor(Math.random() * fallingIcons.length)]
    const size = Math.random() * (30 - 18) + 18 // Size between 18px and 30px
    const left = Math.random() * 100 // Percentage from left
    const delay = Math.random() * 15 // Animation delay up to 15 seconds
    const duration = Math.random() * (40 - 20) + 20 // Animation duration between 20 and 40 seconds (slower)
    const opacity = Math.random() * (0.15 - 0.05) + 0.05 // Opacity between 0.05 and 0.15 (very subtle)

    return {
      id: i,
      Icon,
      size,
      left,
      delay,
      duration,
      opacity,
    }
  })

  return (
    <section className="min-h-screen relative flex items-center overflow-hidden hero-bg">
      {/* Falling Instruments Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {fallingItems.map((item) => (
          <item.Icon
            key={item.id}
            className="absolute text-blue-300/30 dark:text-blue-700/20 animate-fall"
            style={{
              left: `${item.left}%`,
              width: `${item.size}px`,
              height: `${item.size}px`,
              animationDelay: `${item.delay}s`,
              animationDuration: `${item.duration}s`,
              opacity: item.opacity, // Directly use the randomized opacity
              top: `-${item.size}px`, // Start above the viewport
            }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content Side */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center px-3 py-1 rounded-[var(--radius)] text-sm font-medium bg-accent text-accent-foreground">
                <Shield className="mr-2 h-3 w-3" />
                Your Health, Our Priority
              </div>
              {/* Heading */}
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Welcome to Clinico:{" "}
                <span className="block mt-2 text-primary">Compassionate Care for a Healthier You</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Clinico offers comprehensive and personalized healthcare services, ensuring your well-being is always at
                the heart of what we do.
              </p>
            </div>
            {/* Key Features / Benefits */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Users, text: "Personalized Treatment Plans" },
                { icon: Calendar, text: "Easy Online Appointments" },
                { icon: ClipboardList, text: "Secure Patient Records" },
                { icon: CheckCircle, text: "Dedicated Medical Team" },
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-[var(--radius)] bg-primary/10 text-primary">
                    <feature.icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{feature.text}</span>
                </div>
              ))}
            </div>
            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link
                href={route("home")} // Assuming a route for booking
                className="inline-flex items-center justify-center rounded-[var(--radius)] bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Book an Appointment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Button variant="outline" className="rounded-[var(--radius)] bg-transparent">
                <Info className="mr-2 h-4 w-4" />
                Learn More
              </Button>
            </div>
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {[
                { icon: Clock, text: "Experienced Medical Team" },
                { icon: Shield, text: "State-of-the-Art Facilities" },
                { icon: Star, text: "Trusted by Thousands of Patients" },
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <item.icon className="mr-2 h-4 w-4 text-primary" />
                  {item.text}
                </div>
              ))}
            </div>
          </div>
          {/* Visual Side */}
          <div className="relative animate-fade-in-right group">
            <div className="aspect-[4/3] rounded-[var(--radius)] overflow-hidden border border-border bg-card shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-1">
              <img
                src="https://cdn.pixabay.com/photo/2021/10/11/19/43/doctor-6701719_1280.png"
                alt="Clinico management system dashboard preview"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>
      {/* Custom CSS for Animations and Background */}
      <style jsx>{`
        .hero-bg {
          /* Light mode background */
          background-color: #f8fafc; /* Fallback */
          background-image: radial-gradient(at 80% 20%, hsla(220, 100%, 95%, 0.5) 0px, transparent 50%),
                            radial-gradient(at 20% 80%, hsla(260, 100%, 95%, 0.5) 0px, transparent 50%),
                            radial-gradient(at 50% 50%, hsla(200, 100%, 95%, 0.5) 0px, transparent 50%);
        }
        .dark .hero-bg {
          /* Dark mode background */
          background-color: #1e293b; /* Fallback */
          background-image: radial-gradient(at 80% 20%, hsla(220, 100%, 20%, 0.3) 0px, transparent 50%),
                            radial-gradient(at 20% 80%, hsla(260, 100%, 20%, 0.3) 0px, transparent 50%),
                            radial-gradient(at 50% 50%, hsla(200, 100%, 20%, 0.3) 0px, transparent 50%);
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-right {
          0% {
            opacity: 0;
            transform: translateX(20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fall {
          0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: var(--icon-opacity); /* Use CSS variable for dynamic opacity */
          }
          90% {
            opacity: var(--icon-opacity);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out forwards;
          animation-delay: 0.2s; /* Delay image animation slightly */
        }
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
    </section>
  )
}
