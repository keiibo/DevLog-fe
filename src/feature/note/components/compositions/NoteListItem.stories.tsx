import { Meta, StoryObj } from '@storybook/react';
import { Colors } from '../../../../style/Colors';
import { NoteListItem } from './NoteListItem';

const meta = {
  title: 'feature/note/composition/NoteListItem',
  component: NoteListItem,
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
} satisfies Meta<typeof NoteListItem>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {}
};
