/** Вообще лучше библиотеку использовать, но для тестового это излишне */

export function formatDateToDMY(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}
