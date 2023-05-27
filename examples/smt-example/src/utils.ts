
let started = 0;

export function dts() {
  if (! started)
    started = Date.now();
  const secs = (Date.now() - started).toFixed(0); // to miliseconds
  return `\n[${secs}]`;
}
