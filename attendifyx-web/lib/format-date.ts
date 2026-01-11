/**
 * Formats a date or string into a localized string.
 * Default format: Jan 9, 2026, 09:30 PM
 */
export function formatDate(
    date: Date | string | null | undefined,
    options: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    }
) {
    if (!date) return "N/A";

    // 1. Convert to Date object
    const d = typeof date === "string" ? new Date(date) : date;

    // 2. Validate Date
    if (isNaN(d.getTime())) return "Invalid Date";

    // 3. Format using the provided options (or the defaults)
    return new Intl.DateTimeFormat("en-US", options).format(d);
}