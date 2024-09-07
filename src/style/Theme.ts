import { Colors } from './Colors';

export const Theme = {
  token: {
    colorBgLayout: Colors.MAIN,
    colorTextPlaceholder: Colors.TEXT_DARK,
    colorBgContainer: Colors.WHITE,
    colorPrimary: Colors.PURPLE,
    colorText: Colors.MAIN
  },
  components: {
    Layout: {
      headerBg: Colors.MAIN,
      bodyBg: Colors.MAIN,
      siderBg: Colors.TEXT_DARK
    },
    Divider: {
      colorSplit: `${Colors.PURPLE}2a`
    },
    Button: {
      colorPrimary: Colors.PURPLE,
      defaultBg: Colors.PURPLE,
      defaultHoverBg: Colors.PURPLE,
      defaultHoverBorderColor: Colors.WHITE,
      algorithm: true
    },
    Menu: {
      colorText: Colors.TEXT,
      colorBgContainer: Colors.MAIN,
      itemBorderRadius: 0,
      iconSize: 24,
      itemMarginInline: 0,
      itemMarginBlock: 4,
      itemSelectedBg: Colors.MAIN_LIGHT,
      itemSelectedColor: Colors.WHITE
    },
    Modal: {
      colorText: Colors.MAIN,
      titleColor: Colors.MAIN,
      titleFontSize: 24,
      headerBg: Colors.WHITE,
      contentBg: Colors.WHITE,
      footerBg: Colors.WHITE
    },
    Link: {
      colorText: Colors.MAIN
    }
  }
};
