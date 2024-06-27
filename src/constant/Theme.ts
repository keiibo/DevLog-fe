import { Colors } from './Colors';

export const Theme = {
  token: {
    colorPrimary: Colors.PURPLE,
    borderRadius: 8,
    colorError: Colors.RED,
    colorPrimaryText: Colors.TEXT,
    colorTextSecondary: Colors.TEXT,
    colorTextTertiary: Colors.TEXT,
    colorTextLabel: Colors.TEXT
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
