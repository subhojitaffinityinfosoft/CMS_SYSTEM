const STORAGE_KEY = "app-config";

export const hexToHSL = (hex) => {
  let r = 0, g = 0, b = 0;

  if (hex.length === 4) {
    r = "0x" + hex[1] + hex[1];
    g = "0x" + hex[2] + hex[2];
    b = "0x" + hex[3] + hex[3];
  } else {
    r = "0x" + hex[1] + hex[2];
    g = "0x" + hex[3] + hex[4];
    b = "0x" + hex[5] + hex[6];
  }

  r /= 255;
  g /= 255;
  b /= 255;

  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;

  let h = 0, s = 0, l = 0;

  if (delta !== 0) {
    if (cmax === r) h = ((g - b) / delta) % 6;
    else if (cmax === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
  }

  h = Math.round(h * 60);
  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  return `${h} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%`;
};

export const applyTheme = (config) => {
  if (!config) return;

  // 🎨 PRIMARY
  if (config.primaryColor) {
    const hsl = hexToHSL(config.primaryColor);
    document.documentElement.style.setProperty("--primary", hsl);
  }

  // 🏢 COMPANY NAME
  if (config.companyName) {
    document.title = config.companyName;
  }

  // 🖼️ LOGO (optional global usage)
  if (config.logo) {
    document.documentElement.style.setProperty("--logo-url", `url(${config.logo})`);
  }
};

export const getStoredConfig = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
};

export const setStoredConfig = (config) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
};