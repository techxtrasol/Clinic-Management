import type React from "react"
import { Head } from "@inertiajs/react"
import { ThemeProvider } from "@/components/theme-provider"

interface AppLayoutProps {
  children: React.ReactNode
  title?: string
}

export default function Layout({ children, title }: AppLayoutProps) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="clinicpro-theme">
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <Head title={title || "ClinicPro - Healthcare Management System"} />
        {children}
      </div>
    </ThemeProvider>
  )
}
