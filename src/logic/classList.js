export const classList = (tokens) =>
  Array.isArray(tokens)
    ? tokens.filter(Boolean).join(" ")
    : Object.entries(tokens)
        .filter(([, value]) => !!value)
        .map(([key]) => key)
        .join(" ");
