import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  // Use UTC timezone for consistent server/client formatting
  const dateObj = new Date(date)
  return new Intl.DateTimeFormat('es-ES', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(dateObj)
}

export function formatDateShort(date: Date | string): string {
  const dateObj = new Date(date)
  return new Intl.DateTimeFormat('es-ES', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(dateObj)
}
