import { Meta, StoryObj } from '@storybook/react';
import { Colors } from '../../../../style/Colors';
import { NoteIcon } from './NoteIcon';

const meta = {
  title: 'feature/note/elements/NoteIcon',
  component: NoteIcon,
  parameters: {
    backgrounds: {
      default: 'main',
      values: [
        { name: 'main', value: Colors.MAIN },
        { name: 'white', value: Colors.WHITE }
      ]
    }
  },
  argTypes: {},
  tags: ['autodocs']
} satisfies Meta<typeof NoteIcon>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {}
};
