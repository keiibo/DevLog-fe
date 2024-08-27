import { Meta, StoryObj } from '@storybook/react';
import { Colors } from '../../../../style/Colors';
import { SettingModal } from './SettingModal';

const meta = {
  title: 'feature/ticket/elements/SettingModal',
  component: SettingModal,
  parameters: {
    backgrounds: {
      default: 'white',
      values: [
        { name: 'main', value: Colors.MAIN },
        { name: 'white', value: Colors.WHITE }
      ]
    }
  },
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof SettingModal>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {
    isOpened: true,
    title: '設定',
    hasCloseIcon: true,
    setIsOpened: () => {}
  }
};
