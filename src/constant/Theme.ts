import { Colors } from './Colors';

export const Theme = {
  token: {
    colorTextBase: Colors.TEXT,
    colorBgBase: Colors.MAIN,
    colorBgLayout: Colors.MAIN,
    colorTextPlaceholder: Colors.TEXT_DARK,
    colorBgContainer: Colors.WHITE
  },
  components: {
    Layout: {
      headerBg: Colors.MAIN,
      bodyBg: Colors.MAIN,
      siderBg: Colors.TEXT_DARK
    },
    Button: {
      algorithm: true
    },
    Menu: {
      colorBgContainer: Colors.MAIN
    }
  }
};
