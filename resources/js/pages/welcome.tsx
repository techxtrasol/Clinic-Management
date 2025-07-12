import Layout from "@/app/layout"
import Navbar from "./shared/Navbar"
import Hero from "@/pages/Hero"
import { Users, Calendar, FileText, Activity, Shield, Clock, Stethoscope, TrendingUp, Award } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Welcome() {
  const features = [
    {
      icon: Users,
      title: "Patient Management",
      description: "Complete patient profiles with medical history, contact information, and treatment records.",
      features: ["Digital health records", "Patient portal access", "Medical history tracking"],
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Intelligent appointment booking with automated reminders and calendar synchronization.",
      features: ["Online booking", "SMS reminders", "Calendar sync"],
    },
    {
      icon: FileText,
      title: "Digital Records",
      description: "Secure, searchable medical records with easy access and sharing capabilities.",
      features: ["Cloud storage", "Quick search", "Secure sharing"],
    },
    {
      icon: Activity,
      title: "Clinical Analytics",
      description: "Advanced reporting and insights to optimize your practice performance.",
      features: ["Performance metrics", "Financial reports", "Patient insights"],
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description: "HIPAA-compliant platform with enterprise-grade security and data protection.",
      features: ["Data encryption", "Access controls", "Audit logs"],
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock technical support and system monitoring for peace of mind.",
      features: ["Live chat support", "System monitoring", "Training resources"],
    },
  ]

  return (
    <Layout title="Welcome to ClinicPro">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Everything you need to run your clinic
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Comprehensive tools designed specifically for healthcare professionals
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
              >
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 group-hover:bg-blue-600 transition-colors duration-300 dark:bg-blue-900/30 dark:group-hover:bg-blue-600">
                      <feature.icon className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors duration-300 dark:text-blue-400 dark:group-hover:text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">{feature.description}</CardDescription>
                  <ul className="space-y-2">
                    {feature.features.map((item, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                        <div className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
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
              <div className="text-3xl font-bold text-slate-900 dark:text-white">500+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Healthcare Providers</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">50K+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Patients Managed</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">99.9%</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">System Uptime</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">4.9/5</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
