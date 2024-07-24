import { extendTheme } from '@chakra-ui/react';

// theme.js
const colors = {
  primary: {
    50: '#EBEBFE',
    100: '#C8C8FC',
    200: '#A4A4FA',
    300: '#7F7FF7',
    400: '#6666F4',
    500: '#5352ED', //? figma color
    600: '#4A4ADB',
    700: '#3F3FC8',
    800: '#3333A5',
    900: '#25257A',
  },
};

export const theme = extendTheme({
  colors,
});
