import { useContext } from 'react';
import ColorPalletteContext from '../contexts/colorPallette';
const Four04 = () => {
  const colorPallette = useContext(ColorPalletteContext);
  return (
    <div className={`font-bold text-[350px] ${colorPallette[0]}`}>404</div>
  );
};
export default Four04;
