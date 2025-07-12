"use client"

// Removed: import { useTheme } from "next-themes"
import Layout from "@/app/layout"
import Navbar from "./shared/Navbar"
import Hero from "@/pages/Hero"
import Reviews from "@/Components/Reviews"
import { Users, Calendar, Shield, Clock, Stethoscope, TrendingUp, Award, FlaskConical } from "lucide-react"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Footer from "./shared/Footer"
import { MagicCard } from "@/components/magicui/magic-card" // Import MagicCard
import { BorderBeam } from "@/components/magicui/border-beam" // Import BorderBeam

export default function Welcome() {
  // Removed: const { theme } = useTheme()

  const features = [
    {
      icon: Stethoscope,
      title: "Comprehensive Health Checkups",
      description: "Regular health assessments and personalized wellness plans to keep you at your best.",
      benefits: ["Full body examinations", "Preventive screenings", "Personalized wellness plans"],
    },
    {
      icon: Users,
      title: "Specialized Consultations",
      description: "Access to expert specialists across various medical fields for targeted care.",
      benefits: ["Cardiology", "Dermatology", "Pediatrics", "Endocrinology"],
    },
    {
      icon: Shield,
      title: "Preventive Care Programs",
      description: "Proactive health management programs designed to prevent illness and promote long-term well-being.",
      benefits: ["Vaccinations", "Chronic disease management", "Health education"],
    },
    {
      icon: FlaskConical,
      title: "Advanced Diagnostic Services",
      description: "State-of-the-art diagnostic tools for accurate and timely health assessments.",
      benefits: ["Lab testing", "Imaging (X-ray, MRI)", "Pathology services"],
    },
    {
      icon: Clock,
      title: "24/7 Emergency & Urgent Care",
      description: "Immediate medical attention for urgent health concerns, available around the clock.",
      benefits: ["Walk-in appointments", "Emergency consultations", "Rapid response team"],
    },
    {
      icon: Calendar,
      title: "Telemedicine & Virtual Visits",
      description: "Convenient online consultations from the comfort of your home, connecting you with our doctors.",
      benefits: ["Video consultations", "Prescription refills", "Follow-up care"],
    },
  ]

  return (
    <Layout title="Welcome to Clinico">
      <Navbar />
      <Hero />
      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Your Health, Our Comprehensive Care
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Discover the wide range of services Clinico offers to support your well-being.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in-up-stagger">
            {features.map((feature, index) => (
              <div key={feature.title} className="relative" style={{ animationDelay: `${0.1 * index}s` }}>
                {/* Outer Card for BorderBeam and overall container */}
                <MagicCard
                  className="relative z-10 h-full overflow-hidden rounded-[var(--radius)] border border-border bg-card shadow-lg hover:shadow-xl transition-shadow duration-300"
                  gradientColor="#D9D9D955" // Static gradient color for pure React
                >
                  {/* BorderBeam directly on the MagicCard */}
                  <BorderBeam duration={8} size={100} />

                  {/* Card content elements, with their own padding */}
                  <CardHeader className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 group-hover:bg-blue-600 transition-colors duration-300 dark:bg-blue-900/30 dark:group-hover:bg-blue-600">
                        <feature.icon className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors duration-300 dark:text-blue-400 dark:group-hover:text-white" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardDescription className="text-base mb-4">{feature.description}</CardDescription>
                    <ul className="space-y-2">
                      {feature.benefits.map((item, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                          <div className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-600" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </MagicCard>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Stethoscope className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">50+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Experienced Doctors</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">10K+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Happy Patients</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">98%</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Successful Treatments</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">4.9/5</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Patient Satisfaction</div>
            </div>
          </div>
        </div>
      </section>
      <Reviews />
      <Footer />
      {/* Custom CSS for Animations (only fade-in-up remains) */}
      <style jsx>{`
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
      .animate-fade-in-up {
        animation: fade-in-up 0.8s ease-out forwards;
      }
      .animate-fade-in-up-stagger {
        animation: fade-in-up 0.8s ease-out forwards;
        /* Staggering handled by inline style animation-delay */
      }
    `}</style>
    </Layout>
  )
}
