import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Sanitize slug to prevent injection and match stored format
 */
export function sanitizeSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')  // Remove special characters
    .replace(/\s+/g, '-')           // Replace spaces with dashes
    .replace(/-+/g, '-')            // Collapse multiple dashes
    .replace(/^-|-$/g, '');         // Remove leading/trailing dashes
}

/**
 * Normalize date to ISO format (YYYY-MM-DD)
 */
export function normalizeDate(dateString) {
  const date = new Date(dateString)

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date format')
  }

  return date.toISOString().split('T')[0]
}

/**
 * Normalize time to 24-hour format (HH:MM)
 */
export function normalizeTime(time) {
  const timeRegex = /^(\d{1,2}):(\d{2})(\s*(AM|PM))?$/i;
  const match = time.trim().match(timeRegex)

  if (!match) {
    throw new Error('Invalid Time format.')
  }

  let hours = parseInt(match[1])
  const minutes = match[2]
  const period = match[4]?.toUpperCase()

  if (period) {
    if (period === 'PM' && hours != 12) hours += 12
    if (period === 'AM' && hours === 12) hours = 0
  }

  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    throw new Error('Invalid time values');
  }

  return `${hours.toString().padStart(2, '0')}:${minutes}`;
}
