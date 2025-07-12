import { Link } from "@inertiajs/react"
import { route } from "ziggy-js"
import { Calendar, Users, Shield, Activity, Clock, ArrowRight, CheckCircle, Star, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Content */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-6">
              <Badge
                variant="secondary"
                className="w-fit bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 border-0"
              >
                <Shield className="mr-2 h-3 w-3" />
                HIPAA Compliant & Secure Platform
              </Badge>

              <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
                Transform Your
                <span className="block bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
                  Healthcare Practice
                </span>
              </h1>

              <p className="text-lg leading-8 text-slate-600 dark:text-slate-300 max-w-2xl">
                Streamline your clinic operations with our comprehensive platform. Manage appointments, patient records,
                billing, and more with enterprise-grade security and intuitive design built for healthcare
                professionals.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">500+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Active Clinics</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">50K+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Patients Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">99.9%</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Uptime SLA</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href={route("register")}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-base font-medium text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 transition-all duration-200 group"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="rounded-xl border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white hover:border-slate-400 dark:border-slate-600 dark:bg-slate-800/80 dark:hover:bg-slate-700"
              >
                <Activity className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                24/7 Support
              </div>
              <div className="flex items-center">
                <Shield className="mr-2 h-4 w-4" />
                HIPAA Compliant
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4" />
                No Setup Fee
              </div>
              <div className="flex items-center">
                <Star className="mr-2 h-4 w-4 text-yellow-500" />
                4.9/5 Rating
              </div>
            </div>
          </div>

          {/* Visual/Dashboard Preview */}
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 shadow-2xl dark:from-slate-700 dark:to-slate-800 border border-slate-200 dark:border-slate-600">
              <img
                src="/placeholder.svg?height=600&width=800"
                alt="ClinicPro Dashboard Interface"
                className="h-full w-full object-cover"
              />

              {/* Floating Dashboard Cards */}
              <Card className="absolute -bottom-6 -left-6 w-64 shadow-xl border-slate-200 dark:border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center dark:bg-emerald-900/30">
                      <Calendar className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">Today's Appointments</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">24 scheduled • 3 pending</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="absolute -top-6 -right-6 w-56 shadow-xl border-slate-200 dark:border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900/30">
                      <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">Revenue Growth</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">+23% this month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="absolute top-1/2 -right-4 w-48 shadow-xl border-slate-200 dark:border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center dark:bg-purple-900/30">
                      <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">Active Patients</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">1,247 registered</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
