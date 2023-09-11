export function base64(file: File) {
  const reader = new FileReader();
  const result = new Promise<string>((resolve, reject) => {
    reader.onerror = (ev) => {
      reader.abort();
      reject(ev);
    };
    reader.onload = () => {
      resolve(reader.result as string);
    };
  });
  reader.readAsDataURL(file);
  return result;
}
