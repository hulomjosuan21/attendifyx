const rawDbConnectionString = process.env.DATABASE_URL?.trim();

if (!rawDbConnectionString) {
    throw new Error("❌ DATABASE_URL is missing, empty, or contains only whitespace");
}

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
export const DB_CONNECTION_STRING: string = rawDbConnectionString;