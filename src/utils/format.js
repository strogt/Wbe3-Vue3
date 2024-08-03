export function AccoutFormat(data) {
  const pre = data.slice(0, 8);
  const next = data.slice(-6);
  const account = pre + "..." + next;
  return account;
}
