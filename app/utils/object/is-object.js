export default function objectIsObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}
