/** Преобразовываем объект, чтобы не было пустых значений (полезно при отправке данных на сервер)  */
export function toQueryObj<T>(src: T): Partial<T> {
  if (!src) return src;
  return Object.fromEntries(Object.entries(src).filter(([key, value]) => !!value)) as Partial<T>;
}
