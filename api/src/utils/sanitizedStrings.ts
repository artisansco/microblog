import sanitizeHtml from "sanitize-html";

export function sanitizeObject(obj: Record<string, any>): Record<string, any> {
  const sanitize: Record<string, any> = {};
  for (const key in obj) {
    if (typeof obj[key] === "string") {
      sanitize[key] = sanitizeHtml(obj[key], {
        allowedTags: ["li", "b", "i", "em", "strong", "a", "ol", "br"],
        allowedAttributes: {
          a: ["href", "rel", "target"],
        },
      });
    }
  }

  return sanitize;
}
