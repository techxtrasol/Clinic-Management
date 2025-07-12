"use client"

import { Monitor, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "./theme-provider"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-all duration-200"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[8rem]">
        <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer">
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
          {theme === "light" && <div className="ml-auto h-2 w-2 rounded-full bg-primary" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer">
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
          {theme === "dark" && <div className="ml-auto h-2 w-2 rounded-full bg-primary" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer">
          <Monitor className="mr-2 h-4 w-4" />
          <span>System</span>
          {theme === "system" && <div className="ml-auto h-2 w-2 rounded-full bg-primary" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
