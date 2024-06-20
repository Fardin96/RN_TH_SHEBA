import {convert} from '../assets/dimensions/dimensions';

// todo: covert all fonts to MUST use fontsize
// incase device is set to differet fontsize
export const FontSize = {
  tiny: convert(25),
  small: convert(35),
  medium: convert(40),
  semiMedium: convert(50),
  semiLarge: convert(60),
  title: convert(150),
  mgsBottom: convert(35),
  btnTitle: convert(50),
  hint: convert(25),
  dateTxt: convert(70),
  secondaryTitle: convert(50),
};
