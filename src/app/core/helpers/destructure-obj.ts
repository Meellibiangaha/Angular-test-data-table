export function destructureObj<T>(obj: T): { key: string; value: T }[] {
  if (!obj) return null;
  return Object.entries(obj)
    .filter(([key, value]) => !!value)
    .map(([key, value]) => ({ key, value }));
}
