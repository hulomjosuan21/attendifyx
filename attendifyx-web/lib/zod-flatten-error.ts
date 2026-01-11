export const flattenZodTree = (tree: any): Record<string, string> => {
    const flatErrors: Record<string, string> = {};
    if (tree.properties) {
        for (const [key, value] of Object.entries(tree.properties)) {
            const prop = value as { errors: string[] };
            if (prop.errors && prop.errors.length > 0) {
                flatErrors[key] = prop.errors[0];
            }
        }
    }
    if (tree.errors && tree.errors.length > 0) {
        flatErrors["form"] = tree.errors[0];
    }
    return flatErrors;
};