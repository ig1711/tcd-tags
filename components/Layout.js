import { useEffect, useState } from 'react';
import ColorPalletteContext from '../contexts/colorPallette';
import AnimationContext from '../contexts/animation';

// const colorPallettes = [
//   ['emerald', 'teal', '209,250,229'],
//   ['cyan', 'sky', '207,250,254'],
//   ['pink', 'rose', '252,231,243'],
//   ['lime', 'green', '236,252,203'],
// ].map(m => [
//   `text-${m[0]}-100`,
//   `from-${m[1]}-900`,
//   `to-${m[0]}-100`,
//   `shadow-[0_0_0_1px_rgb(${m[2]})_inset]`,
//   `rgb(${m[2]})`,
//   `bg-${m[0]}-100`,
//   `text-${m[1]}-900`,
// ]);

// stoopid tailwind doesnt work with the above in production

const colorPallettes = [
  [
    'text-emerald-100/70',
    'from-teal-900',
    'to-emerald-100',
    'shadow-[0_0_0_1px_rgb(209,250,229)_inset]',
    'rgb(209,250,229)',
    'bg-emerald-100',
    'text-teal-900',
    'placeholder:text-emerald-100/20',
    'rgba(6,78,59,0.3)',
  ],
  [
    'text-cyan-100/70',
    'from-sky-900',
    'to-cyan-100',
    'shadow-[0_0_0_1px_rgb(207,250,254)_inset]',
    'rgb(207,250,254)',
    'bg-cyan-100',
    'text-sky-900',
    'placeholder:text-cyan-100/20',
    'rgba(12,74,110,0.3)',
  ],
  [
    'text-pink-100/70',
    'from-rose-900',
    'to-pink-100',
    'shadow-[0_0_0_1px_rgb(252,231,243)_inset]',
    'rgb(252,231,243)',
    'bg-pink-100',
    'text-rose-900',
    'placeholder:text-pink-100/20',
    'rgba(136,19,55,0.3)',
  ],
  [
    'text-lime-100/70',
    'from-green-900',
    'to-lime-100',
    'shadow-[0_0_0_1px_rgb(236,252,203)_inset]',
    'rgb(236,252,203)',
    'bg-lime-100',
    'text-green-900',
    'placeholder:text-lime-100/20',
    'rgba(20,83,45,0.3)',
  ],
];

const Layout = ({ children }) => {
  const [colorPallette, setColorPallette] = useState(colorPallettes[0]);
  const [animation, setAnimation] = useState(false);

  // Random theme
  useEffect(() => {
    setColorPallette(
      colorPallettes[Math.floor(Math.random() * colorPallettes.length)]
    );
  }, []);

  useEffect(() => {
    const handler = e => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        setAnimation(a => !a);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <AnimationContext.Provider value={{ animation, setAnimation }}>
      <ColorPalletteContext.Provider value={colorPallette}>
        <div
          style={
            animation
              ? {
                  background:
                    'linear-gradient(45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
                  backgroundSize: '400% 400%',
                  animation: 'gradient 15s ease infinite',
                }
              : {}
          }
          className={`min-h-screen p-4 md:p-10 bg-gradient-to-tr ${colorPallette[1]} ${colorPallette[2]} grid grid-columns-1`}
        >
          <div
            className={`content-start w-full min-h-full rounded-lg shadow-2xl bg-black/10 grid grid-columns-1 place-content-center overflow-y-hidden`}
          >
            {children}
          </div>
        </div>
      </ColorPalletteContext.Provider>
    </AnimationContext.Provider>
  );
};

export default Layout;
