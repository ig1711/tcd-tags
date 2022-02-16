const colorPallettes = [
  ['emerald', 'teal', '209,250,229'],
  ['cyan', 'sky', '207,250,254'],
  ['pink', 'rose', '252,231,243'],
  ['lime', 'green', '236,252,203'],
].map(m => [
  `text-${m[0]}-100`,
  `from-${m[1]}-900`,
  `to-${m[0]}-100`,
  `shadow-[0_0_0_1px_rgb(${m[2]})_inset]`,
  `rgb(${m[2]})`,
  `bg-${m[0]}-100`,
  `text-${m[1]}-900`,
]);
import { createContext } from 'react';
export default createContext(colorPallettes[0]);
