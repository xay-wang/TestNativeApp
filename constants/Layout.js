// constants/Layout.js
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
  borderRadius: 8,
};