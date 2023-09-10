export type Dimensions = {
  width: number;
  height: number;
};
export function getDimensionScale(natural: Dimensions, max: Dimensions) {
  const { width, height } = natural;
  const { width: maxWidth, height: maxHeight } = max;
  const isWidthLarger = width > height;
  if (isWidthLarger) {
    if (width > maxWidth) {
      const widthScale = maxWidth / width;
      return { width: maxWidth, height: height * widthScale };
    }
  } else {
    if (height > maxHeight) {
      const heightScale = maxHeight / height;
      return { width: width * heightScale, height: maxHeight };
    }
  }
  return natural;
}

export async function resizeImage(imagePath: string, size: number) {
  //create an image object from the path
  const originalImage = new Image();
  originalImage.src = imagePath;

  //get a reference to the canvas
  const canvas = document.createElement("canvas");
  canvas.style.display = "none";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  //wait for the image to load
  await new Promise((resolve) => {
    originalImage.addEventListener("load", resolve);
  });

  //get the original image size and aspect ratio
  const originalWidth = originalImage.naturalWidth;
  const originalHeight = originalImage.naturalHeight;

  const { width, height } = getDimensionScale(
    { width: originalWidth, height: originalHeight },
    { width: size, height: size }
  );

  //set the canvas size
  canvas.width = width;
  canvas.height = height;

  //render the image
  ctx?.drawImage(originalImage, 0, 0, width, height);

  //return the new image data
  const res = canvas.toDataURL("image/jpeg", 0.7);
  canvas.remove();
  return res;
}
