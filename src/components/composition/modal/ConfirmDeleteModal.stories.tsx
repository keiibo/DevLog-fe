import { Meta, StoryObj } from '@storybook/react';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';
import { Colors } from '../../../style/Colors';
import { action } from '@storybook/addon-actions';

const meta = {
  title: 'composition/ConfirmDeleteModal',
  component: ConfirmDeleteModal,
  parameters: {
    backgrounds: {
      default: 'main',
      values: [
        { name: 'main', value: Colors.MAIN },
        { name: 'white', value: Colors.WHITE }
      ]
    }
  },
  argTypes: {
    isOpened: {
      control: 'boolean',
      defaultValue: true
    },
    width: {
      control: 'text',
      defaultValue: '640px'
    },
    confirmMessage: {
      control: 'text',
      defaultValue: 'チケットを削除してもよろしいですか？'
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof ConfirmDeleteModal>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {
    isOpened: true,
    confirmMessage: '削除してよろしいですか',
    width: '640px',
    handleClose: action('handleClose'),
    handleCancel: action('handleCancel'),
    handleDelete: action('handleDelete')
  }
};
