import { Meta, StoryObj } from '@storybook/react';
import { Colors } from '../../../../style/Colors';
import { SortPopover } from './SortPopover';
import { Button } from '../../../../components/element/button/Button';

const meta = {
  title: 'feature/ticket/elements/SortPopover',
  component: SortPopover,
  parameters: {
    backgrounds: {
      default: 'main',
      values: [
        { name: 'main', value: Colors.MAIN },
        { name: 'white', value: Colors.WHITE }
      ]
    }
  },
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof SortPopover>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {
    children: 'test'
  },
  render: () => (
    <div>
      <SortPopover>
        <Button type="primary">並び替え</Button>
      </SortPopover>
    </div>
  )
};
