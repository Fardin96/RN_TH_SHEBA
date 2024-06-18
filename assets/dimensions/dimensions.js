import {Dimensions} from 'react-native';

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('screen');

export const convert = input => {
  return input * (SCREEN_WIDTH / 1000);
};

export const convertH = input => {
  return input * (SCREEN_HEIGHT / 2000);
};
