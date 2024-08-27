import { Meta, StoryObj } from '@storybook/react';
import { Colors } from '../../../style/Colors';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'elements/Modal',
  component: Modal,
  parameters: {
    backgrounds: {
      default: 'main',
      values: [
        { name: 'main', value: Colors.MAIN },
        { name: 'white', value: Colors.WHITE }
      ]
    }
  },
  tags: ['autodocs']
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {}
};
