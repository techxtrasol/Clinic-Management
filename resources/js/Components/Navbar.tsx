"use client"

import { useState } from "react"
import { Link, usePage } from "@inertiajs/react"
import { Menu, X, Calendar, Users, Phone, Stethoscope, Activity, FileText, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { ModeToggle } from "@/Components/ModeToggle"

export default function Navbar() {
  const { auth } = usePage().props as any
  const [isOpen, setIsOpen] = useState(false)

  const services = [
    {
      title: "Patient Management",
      description: "Complete patient records and history management",
      href: "#services",
      icon: Users,
    },
    {
      title: "Appointment Scheduling",
      description: "Smart scheduling with automated reminders",
      href: "#services",
      icon: Calendar,
    },
    {
      title: "Medical Records",
      description: "Secure digital health record system",
      href: "#services",
      icon: FileText,
    },
    {
      title: "Clinical Analytics",
      description: "Advanced reporting and insights",
      href: "#services",
      icon: Activity,
    },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:border-slate-700/60 dark:bg-slate-900/80 dark:supports-[backdrop-filter]:bg-slate-900/60 transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <Stethoscope className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-slate-900"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent dark:from-white dark:to-slate-300">
                  ClinicPro
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 -mt-1">Healthcare Management</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900 focus:outline-none dark:hover:bg-slate-800 dark:hover:text-slate-50 dark:focus:bg-slate-800 dark:focus:text-slate-50"
                  >
                    Home
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-10 rounded-xl">
                    <Activity className="mr-2 h-4 w-4" />
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[500px] gap-3 p-6 md:w-[600px] md:grid-cols-2">
                      {services.map((service) => (
                        <li key={service.title}>
                          <NavigationMenuLink asChild>
                            <a
                              href={service.href}
                              className="block select-none space-y-1 rounded-xl p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-slate-50 hover:shadow-md focus:bg-slate-50 dark:hover:bg-slate-800 dark:focus:bg-slate-800 group"
                            >
                              <div className="flex items-center gap-3 text-sm font-medium leading-none">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 group-hover:bg-blue-600 transition-colors dark:bg-blue-900 dark:group-hover:bg-blue-600">
                                  <service.icon className="h-4 w-4 text-blue-600 group-hover:text-white transition-colors dark:text-blue-400 dark:group-hover:text-white" />
                                </div>
                                {service.title}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-slate-600 dark:text-slate-400">
                                {service.description}
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#doctors"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900 focus:outline-none dark:hover:bg-slate-800 dark:hover:text-slate-50 dark:focus:bg-slate-800 dark:focus:text-slate-50"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Our Doctors
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#contact"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900 focus:outline-none dark:hover:bg-slate-800 dark:hover:text-slate-50 dark:focus:bg-slate-800 dark:focus:text-slate-50"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Contact
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex lg:items-center lg:space-x-3">
            <ModeToggle />

            {auth?.user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                    <span className="text-xs font-semibold text-white">{auth.user.name?.charAt(0).toUpperCase()}</span>
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{auth.user.name}</span>
                </div>
                <Link
                  href={route("dashboard")}
                  className="inline-flex h-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 text-sm font-medium text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 transition-all duration-200"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href={route("login")}
                  className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 transition-all duration-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  Log in
                </Link>
                <Link
                  href={route("register")}
                  className="inline-flex h-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 text-sm font-medium text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 transition-all duration-200"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center space-x-2 lg:hidden">
            <ModeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-xl border border-slate-200 dark:border-slate-700"
                >
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] bg-white/95 backdrop-blur-xl dark:bg-slate-900/95">
                <div className="flex flex-col space-y-6 mt-8">
                  {/* Mobile Logo */}
                  <div className="flex items-center space-x-3 pb-4 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700">
                      <Stethoscope className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="font-bold text-slate-900 dark:text-white">ClinicPro</h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Healthcare Management</p>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="space-y-4">
                    <Link
                      href="/"
                      className="block text-lg font-medium text-slate-700 hover:text-blue-600 transition-colors dark:text-slate-300 dark:hover:text-blue-400"
                      onClick={() => setIsOpen(false)}
                    >
                      Home
                    </Link>

                    <div className="space-y-3">
                      <p className="text-lg font-medium text-slate-900 dark:text-white">Services</p>
                      <div className="pl-4 space-y-3">
                        {services.map((service) => (
                          <a
                            key={service.title}
                            href={service.href}
                            className="flex items-center gap-3 text-sm text-slate-600 hover:text-blue-600 transition-colors dark:text-slate-400 dark:hover:text-blue-400"
                            onClick={() => setIsOpen(false)}
                          >
                            <service.icon className="h-4 w-4" />
                            {service.title}
                          </a>
                        ))}
                      </div>
                    </div>

                    <Link
                      href="#doctors"
                      className="flex items-center gap-2 text-lg font-medium text-slate-700 hover:text-blue-600 transition-colors dark:text-slate-300 dark:hover:text-blue-400"
                      onClick={() => setIsOpen(false)}
                    >
                      <Users className="h-4 w-4" />
                      Our Doctors
                    </Link>

                    <Link
                      href="#contact"
                      className="flex items-center gap-2 text-lg font-medium text-slate-700 hover:text-blue-600 transition-colors dark:text-slate-300 dark:hover:text-blue-400"
                      onClick={() => setIsOpen(false)}
                    >
                      <Phone className="h-4 w-4" />
                      Contact
                    </Link>
                  </div>

                  {/* Mobile Auth */}
                  <div className="border-t pt-6 space-y-3 border-slate-200 dark:border-slate-700">
                    {auth?.user ? (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                            <span className="text-sm font-semibold text-white">
                              {auth.user.name?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">{auth.user.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Logged in</p>
                          </div>
                        </div>
                        <Link
                          href={route("dashboard")}
                          className="flex h-11 w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-sm font-medium text-white shadow-lg"
                          onClick={() => setIsOpen(false)}
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          Dashboard
                        </Link>
                      </div>
                    ) : (
                      <>
                        <Link
                          href={route("login")}
                          className="flex h-11 w-full items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                          onClick={() => setIsOpen(false)}
                        >
                          Log in
                        </Link>
                        <Link
                          href={route("register")}
                          className="flex h-11 w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-sm font-medium text-white shadow-lg"
                          onClick={() => setIsOpen(false)}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          Get Started
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
