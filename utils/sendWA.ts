export function sendWA(phoneNumber: string, message: string) {
  const win = window.open("", "_blank");
  if (!win) return;

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  win.location.href = url;
}
