"use client"

import { useState } from "react"
import { Link, usePage } from "@inertiajs/react"
import { Menu, X, Calendar, Users, Phone, Stethoscope } from "lucide-react"
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
import { ModeToggle } from "@/components/mode-toggle"

export default function Navbar() {
  const { auth } = usePage().props
  const [isOpen, setIsOpen] = useState(false)

  const services = [
    {
      title: "Patient Management",
      description: "Comprehensive patient record system",
      href: "#services",
      icon: Users,
    },
    {
      title: "Appointment Scheduling",
      description: "Smart scheduling and calendar management",
      href: "#services",
      icon: Calendar,
    },
    {
      title: "Billing & Invoicing",
      description: "Automated billing and payment processing",
      href: "#services",
      icon: Phone,
    },
    {
      title: "Medical Records",
      description: "Secure digital health records",
      href: "#services",
      icon: Stethoscope,
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 transition-transform duration-200 hover:scale-105">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold transition-all duration-200 hover:bg-primary/20">
            🏥
          </div>
          <span className="text-2xl font-bold tracking-tight text-foreground">ClinicPro</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-9">Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {services.map((service) => (
                      <li key={service.title}>
                        <NavigationMenuLink asChild>
                          <a
                            href={service.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                          >
                            <div className="flex items-center gap-2 text-sm font-medium leading-none">
                              <service.icon className="h-4 w-4 text-primary group-hover:text-accent-foreground transition-colors" />
                              {service.title}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground group-hover:text-accent-foreground/80">
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
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Our Doctors
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#contact"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex lg:items-center lg:space-x-4">
          <ModeToggle />

          {auth?.user ? (
            <Link
              href={route("dashboard")}
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-all duration-200 hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Dashboard
            </Link>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                href={route("login")}
                className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Log in
              </Link>
              <Link
                href={route("register")}
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-all duration-200 hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center space-x-2 lg:hidden">
          <ModeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-6 mt-8">
                {/* Mobile Navigation Links */}
                <div className="space-y-4">
                  <Link
                    href="/"
                    className="block text-lg font-medium transition-colors hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>

                  <div className="space-y-3">
                    <p className="text-lg font-medium">Services</p>
                    <div className="pl-4 space-y-3">
                      {services.map((service) => (
                        <a
                          key={service.title}
                          href={service.href}
                          className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
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
                    className="flex items-center gap-2 text-lg font-medium transition-colors hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    <Users className="h-4 w-4" />
                    Our Doctors
                  </Link>

                  <Link
                    href="#contact"
                    className="flex items-center gap-2 text-lg font-medium transition-colors hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    <Phone className="h-4 w-4" />
                    Contact
                  </Link>
                </div>

                {/* Mobile Auth Buttons */}
                <div className="border-t pt-6 space-y-3">
                  {auth?.user ? (
                    <Link
                      href={route("dashboard")}
                      className="flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <>
                      <Link
                        href={route("login")}
                        className="flex h-10 w-full items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                        onClick={() => setIsOpen(false)}
                      >
                        Log in
                      </Link>
                      <Link
                        href={route("register")}
                        className="flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                        onClick={() => setIsOpen(false)}
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
