import { Colors } from './Colors';

export const Theme = {
  token: {
    colorPrimary: Colors.MAIN,
    borderRadius: 8,
    colorError: Colors.RED,
    colorPrimaryText: Colors.TEXT
  },
  components: {
    Button: {
      colorPrimary: Colors.PURPLE,
      algorithm: true
    },
    Input: {
      colorPrimary: Colors.PURPLE,
      algorithm: true
    }
  }
};
