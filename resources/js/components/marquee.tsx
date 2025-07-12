"use client"

import * as React from "react"

interface MarqueeProps \{
  children: React.ReactNode
  direction?: "left" | "right"
  speed?: "slow" | "normal" | "fast"
  className?: string // For the outer container
  itemClassName?: string // For individual items within the marquee
\}
\
export function Marquee(\{
  children,
  direction = "left",
  speed = "normal",
  className,
  itemClassName,
\}: MarqueeProps) \
{\
  const speedClass = \
    slow: "animate-marquee-slow",\
    normal: "animate-marquee",\
    fast: "animate-marquee-fast",
  \[speed]

  const directionClass = direction === "right" ? "animate-marquee-reverse" : ""

  // Map children to add itemClassName and ensure they are flex items
  const renderChildren = (items: React.ReactNode) =>
    React.Children.map(items, (child, index) => (\
      <div key=\{index\} className=\{`flex-shrink-0 $\{itemClassName || ""\}`\}>
        \{child\}
      </div>
    ))

  return (
    <div className=\{\`relative flex overflow-hidden $\{className\}\`\}>
      <div className=\{\`flex $\{speedClass\} $\{directionClass\}\`\}>
        \{renderChildren(children)\}
        \{renderChildren(children)\} \{/* Duplicate children for seamless loop */\}
      </div>
    </div>
  )
\}\
