export function base64ToBlob(base64: string) {
  const parts = base64.split(";base64,");
  const mime = parts[0].split(":")[1];
  const binary = atob(parts[1]);
  const array = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i);
  }

  return new Blob([array], { type: mime });
}
