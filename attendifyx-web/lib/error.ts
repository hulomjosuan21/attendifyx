export type ActionError = {
    title: string;
    description: string;
};

export const throwActionError = (title: string, description: string) => {
    throw new Error(JSON.stringify({title, description}));
};

export const getError = (err: any) => {
    // 1. Ignore Next.js Redirects (Industry Standard)
    // Next.js uses the message "NEXT_REDIRECT" internally
    if (err?.message === "NEXT_REDIRECT" || err?.digest?.includes("NEXT_REDIRECT")) {
        return null;
    }

    const fallback = {
        title: "Something went wrong",
        description: "We encountered an unexpected issue. Please try again.",
    };

    try {
        // 2. Parse your custom JSON throw
        return JSON.parse(err.message);
    } catch {
        // 3. Handle standard string errors
        return {
            title: "Error",
            description: err.message || fallback.description,
        };
    }
};