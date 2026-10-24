import { ATLAS_W } from "./geo";

/**
 * Robinson projection, the classic atlas compromise: lines of latitude
 * straight, continents only gently distorted. project() turns a real
 * latitude and longitude into a point on the map (0–ATLAS_W wide).
 */
const X = [1,0.9986,0.9954,0.99,0.9822,0.973,0.96,0.9427,0.9216,0.8962,0.8679,0.835,0.7986,0.7597,0.7186,0.6732,0.6213,0.5722,0.5322];
const Y = [0,0.062,0.124,0.186,0.248,0.31,0.372,0.434,0.4958,0.5571,0.6176,0.6769,0.7346,0.7903,0.8435,0.8936,0.9394,0.9761,1];
const R = ATLAS_W / (2 * Math.PI * 0.8487);
const TOP = 82;

function robinson(lon: number, lat: number): [number, number] {
  const a = Math.min(Math.abs(lat), 90) / 5;
  const i = Math.min(Math.floor(a), 17);
  const t = a - i;
  const x = X[i] + (X[i + 1] - X[i]) * t;
  const y = Y[i] + (Y[i + 1] - Y[i]) * t;
  return [0.8487 * R * x * (lon * Math.PI) / 180, 1.3523 * R * y * Math.sign(lat)];
}

const y0 = robinson(0, TOP)[1];

export function project(lat: number, lon: number): [number, number] {
  const [x, y] = robinson(lon, lat);
  return [x + ATLAS_W / 2, y0 - y];
}
