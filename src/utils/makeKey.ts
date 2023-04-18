export function makeKey(num: number) {
  let text = "";
  for (let i = 0; i < num; i++) {
    text += String.fromCharCode(Math.floor(Math.random() * 65535));
  }
  return text;
}
