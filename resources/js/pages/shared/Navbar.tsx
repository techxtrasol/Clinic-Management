"use client"

import { useState } from "react"
import { Link, usePage } from "@inertiajs/react"
import { Menu, X, Calendar, Users, Phone, Stethoscope, Home, ClipboardList, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"

export default function Navbar() {
  const { auth } = usePage().props
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    {
      name: "Services",
      href: "#services",
      icon: Stethoscope, // Icon for the parent service item
      subItems: [
        { name: "Patient Management", icon: Users, href: "#services" },
        { name: "Appointment Scheduling", icon: Calendar, href: "#services" },
        { name: "Billing & Invoicing", icon: ClipboardList, href: "#services" },
      ],
    },
    { name: "Our Doctors", href: "#doctors", icon: Users },
    { name: "Contact", href: "#contact", icon: Phone },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border  backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius)] bg-primary/10 text-primary">
            🏥
          </div>
          <span className="text-lg font-semibold">Clinico</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) =>
            !item.subItems ? (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ) : (
              <div key={item.name} className="group relative">
                <button className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-foreground">
                  {item.name}
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 top-full mt-2 hidden w-48 rounded-md border bg-popover p-2 shadow-lg group-hover:block animate-in fade-in-0 zoom-in-95 data-[state=open]:animate-out data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className="flex items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <subItem.icon className="h-4 w-4 text-primary" />
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              </div>
            ),
          )}
        </nav>

        {/* Desktop Auth + Theme */}
        <div className="hidden items-center gap-4 md:flex">
          <ModeToggle />
          {auth?.user ? (
            <Link
              href={route("dashboard")}
              className="rounded-[var(--radius)] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Dashboard
            </Link>
          ) : (
            <div className="flex gap-2">
              <Link
                href={route("login")}
                className="rounded-[var(--radius)] border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Log in
              </Link>
              <Link
                href={route("register")}
                className="rounded-[var(--radius)] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                <span className="sr-only">Toggle mobile menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-[280px] flex-col justify-between p-4">
              {/* Mobile Nav Items */}
              <div className="mt-8 flex-1 space-y-2">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {!item.subItems ? (
                      <Link
                        href={item.href}
                        className="flex items-center gap-3 rounded-md px-3 py-3 text-lg font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.icon && <item.icon className="h-5 w-5 text-primary" />}
                        {item.name}
                      </Link>
                    ) : (
                      <>
                        <p className="flex items-center gap-3 rounded-md px-3 py-3 text-lg font-medium">
                          {item.icon && <item.icon className="h-5 w-5 text-primary" />}
                          {item.name}
                        </p>
                        <div className="ml-6 space-y-1 border-l border-border pl-4">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="flex items-center gap-2 rounded-md px-3 py-2 text-base hover:bg-accent hover:text-accent-foreground transition-colors"
                              onClick={() => setMobileOpen(false)}
                            >
                              <subItem.icon className="h-4 w-4 text-primary" />
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile Auth Buttons */}
              <div className="border-t border-border pt-4">
                {auth?.user ? (
                  <Link
                    href={route("dashboard")}
                    className="block w-full rounded-[var(--radius)] bg-primary px-4 py-2 text-center font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    Dashboard
                  </Link>
                ) : (
                  <div className="space-y-2">
                    <Link
                      href={route("login")}
                      className="block w-full rounded-[var(--radius)] border border-input bg-background px-4 py-2 text-center text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      Log in
                    </Link>
                    <Link
                      href={route("register")}
                      className="block w-full rounded-[var(--radius)] bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
