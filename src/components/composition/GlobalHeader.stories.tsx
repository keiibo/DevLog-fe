import { Meta, StoryObj } from '@storybook/react';
import { GlobalHeader } from './GlobalHeader';

const meta = {
  title: 'composition/GlobalHeader',
  component: GlobalHeader,
  tags: ['autodocs']
} satisfies Meta<typeof GlobalHeader>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {};
