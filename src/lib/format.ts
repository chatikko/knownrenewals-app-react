export function formatDate(value: string) {
  return new Date(value).toLocaleDateString();
}

export function toDateInputValue(value: string) {
  return new Date(value).toISOString().slice(0, 10);
}
