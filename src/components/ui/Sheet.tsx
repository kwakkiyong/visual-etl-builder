import * as React from "react"
import { cn } from "@/lib/utils"

interface SheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  side?: "left" | "right" | "top" | "bottom"
}

export function Sheet({ open, onOpenChange, children, side = "right" }: SheetProps) {
  if (!open) return null

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={() => onOpenChange?.(false)}
      />
      <div
        className={cn(
          "fixed z-50 bg-background border shadow-lg transition-transform",
          {
            "right-0 top-0 h-full w-[400px]": side === "right",
            "left-0 top-0 h-full w-[400px]": side === "left",
            "top-0 left-0 right-0 h-[400px]": side === "top",
            "bottom-0 left-0 right-0 h-[400px]": side === "bottom",
          }
        )}
      >
        {children}
      </div>
    </>
  )
}

export function SheetContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("p-6 h-full overflow-y-auto bg-white", className)}>
      {children}
    </div>
  )
}

export function SheetHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("mb-4", className)}>
      {children}
    </div>
  )
}

export function SheetTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={cn("text-lg font-semibold", className)}>
      {children}
    </h2>
  )
}

