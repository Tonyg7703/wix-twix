export function merge<T extends object>(...objects: T[]): T {
  return Object.assign({}, ...objects);
}
/* maybe
export function merge<T extends object>(objects: T): T {
  return Object.assign({}, objects);
}
*/
