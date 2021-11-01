export default function getImageSizeByFile(
  file: File
): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const fr = new FileReader();
    fr.onload = () => {
      const img = new Image();

      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };

      img.src = fr.result as string;
    };
    fr.readAsDataURL(file);
  });
}
