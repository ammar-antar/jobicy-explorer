import DOMPurify from "dompurify";

export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "p", "br", "strong", "b", "em", "i", "u",
      "ul", "ol", "li",
      "h1", "h2", "h3", "h4",
      "a", "blockquote", "code", "pre",
    ],
    ALLOWED_ATTR: ["href", "target", "rel"],
  });
}