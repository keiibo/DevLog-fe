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
      colorPrimary: Colors.PURPLE,
      defaultBg: Colors.PURPLE,
      defaultHoverBg: Colors.PURPLE,
      defaultHoverBorderColor: Colors.WHITE,
      algorithm: true
    },
    Menu: {
      colorBgContainer: Colors.MAIN,
      itemBorderRadius: 8,
      iconSize: 24,
      itemMarginInline: 0,
      itemMarginBlock: 16,
      itemSelectedBg: Colors.MAIN_LIGHT,
      itemSelectedColor: Colors.WHITE
    },
    Modal: {
      colorText: Colors.MAIN,
      titleColor: Colors.MAIN,
      titleFontSize: '24px',
      headerBg: Colors.WHITE,
      contentBg: Colors.WHITE,
      footerBg: Colors.WHITE
    }
  }
};
