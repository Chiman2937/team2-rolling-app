export function getColorImageBlob(color = '#ff0000', size = 100) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, size, size);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      blob.color = color;
      resolve(blob);
    }, 'image/png');
  });
}
