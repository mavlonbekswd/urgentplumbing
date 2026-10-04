/** Joins class names, skipping falsy values. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Section headings read as short statements: make sure one ends with a full stop or question mark. */
export function sentence(text: string): string {
  return /[.?!]$/.test(text) ? text : `${text}.`;
}
