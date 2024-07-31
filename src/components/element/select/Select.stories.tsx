import { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';
import { Option } from './Option';
import { Colors } from '../../../style/Colors';

const meta: Meta<typeof Select> = {
  title: 'elements/Select',
  component: Select,
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
  render: () => (
    <Select defaultValue="option1">
      <Option value="option1">Option 1</Option>
      <Option value="option2">Option 2</Option>
      <Option value="option3">Option 3</Option>
    </Select>
  )
};
