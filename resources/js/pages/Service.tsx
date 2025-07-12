import { Users, Calendar, CreditCard, Package, Shield, BarChart3, Stethoscope, FileText, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Services() {
  const services = [
    {
      icon: Users,
      title: "Patient Management",
      description: "Comprehensive patient profiles with medical history, contact information, and treatment records.",
      features: ["Digital health records", "Patient portal access", "Medical history tracking"],
    },
    {
      icon: Calendar,
      title: "Appointment Scheduling",
      description: "Smart scheduling system with automated reminders and calendar integration.",
      features: ["Online booking", "SMS reminders", "Calendar sync"],
    },
    {
      icon: CreditCard,
      title: "Billing & Invoicing",
      description: "Automated billing system with insurance claims and payment processing.",
      features: ["Insurance integration", "Payment tracking", "Financial reports"],
    },
    {
      icon: Package,
      title: "Inventory Management",
      description: "Track medical supplies, medications, and equipment with automated reorder alerts.",
      features: ["Stock monitoring", "Reorder alerts", "Supplier management"],
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description: "HIPAA-compliant platform with advanced security features and audit trails.",
      features: ["Data encryption", "Access controls", "Audit logs"],
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description: "Comprehensive reporting and analytics for better decision making.",
      features: ["Performance metrics", "Financial reports", "Patient insights"],
    },
    {
      icon: Stethoscope,
      title: "Clinical Tools",
      description: "Digital tools for diagnosis, treatment planning, and clinical documentation.",
      features: ["E-prescriptions", "Lab integration", "Clinical notes"],
    },
    {
      icon: FileText,
      title: "Document Management",
      description: "Secure storage and management of medical documents and forms.",
      features: ["Digital forms", "Document scanning", "Version control"],
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock technical support and system monitoring.",
      features: ["Live chat support", "System monitoring", "Training resources"],
    },
  ]

  return (
    <section id="services" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Comprehensive Healthcare Solutions
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Everything you need to run a modern, efficient healthcare practice
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md"
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 group-hover:bg-blue-600 transition-colors duration-300">
                    <service.icon className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">{service.description}</CardDescription>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <div className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
