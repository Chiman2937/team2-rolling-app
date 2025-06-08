const hexToRgb = (hex) => {
  const parsedHex = hex.replace('#', '');
  const bigint = parseInt(parsedHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
};

export const isColorDark = (hexColor) => {
  const { r, g, b } = hexToRgb(hexColor);
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance <= 128;
};
