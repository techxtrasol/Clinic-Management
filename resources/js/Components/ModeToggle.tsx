"use client"

import { Monitor, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "./ThemeProvider"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm hover:bg-slate-50 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/80 dark:hover:bg-slate-700 transition-all duration-300"
        >
          <Sun className="h-[1.1rem] w-[1.1rem] scale-100 rotate-0 transition-all duration-300 dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.1rem] w-[1.1rem] scale-0 rotate-90 transition-all duration-300 dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[140px] bg-white/95 backdrop-blur-sm border-slate-200 dark:bg-slate-800/95 dark:border-slate-700"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
          {theme === "light" && <div className="ml-auto h-2 w-2 rounded-full bg-blue-600" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
          {theme === "dark" && <div className="ml-auto h-2 w-2 rounded-full bg-blue-600" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          <Monitor className="mr-2 h-4 w-4" />
          <span>System</span>
          {theme === "system" && <div className="ml-auto h-2 w-2 rounded-full bg-blue-600" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
