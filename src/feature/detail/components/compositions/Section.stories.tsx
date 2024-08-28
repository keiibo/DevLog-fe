import { CategoryLabelMode } from '../../../../components/composition/categoryLabel/CategoryLabel';
import { MultiLineText } from '../../../../components/composition/MultiLineText';
import { Colors } from '../../../../style/Colors';
import { Section } from './Section';

import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'feature/detail/composition/Section',
  parameters: {
    backgrounds: {
      default: 'main',
      values: [
        { name: 'main', value: Colors.MAIN },
        { name: 'white', value: Colors.WHITE }
      ]
    }
  },
  component: Section,
  argTypes: {},
  tags: ['autodocs']
} satisfies Meta<typeof Section>;

export default meta;
type TStory = StoryObj<typeof meta>;

const text = (
  <MultiLineText
    text={`test
  testesttest
  
  sssssss`}
  />
);

export const Default: TStory = {
  args: {
    label: 'プロジェクト名',
    children: text,
    mode: CategoryLabelMode.BUTTON
  }
};
