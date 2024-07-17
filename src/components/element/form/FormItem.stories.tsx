import { Meta, StoryObj } from '@storybook/react';
import { Input } from 'antd';
import { FormItem } from './FormItem'; // FormItem コンポーネントのパスを適切に設定してください。
import { Colors } from '../../../constant/Colors';

const meta: Meta<typeof FormItem> = {
  title: 'elements/FormItem',
  parameters: {
    backgrounds: {
      default: 'main',
      values: [
        { name: 'main', value: Colors.MAIN },
        { name: 'white', value: Colors.WHITE }
      ]
    },
    controls: {
      include: ['label', 'help', 'required', 'validateStatus', 'hasFeedback']
    }
  },
  component: FormItem,
  argTypes: {
    label: { control: 'text' },
    help: { control: 'text' },
    required: { control: 'boolean' },
    validateStatus: {
      control: {
        type: 'select',
        options: ['success', 'warning', 'error', 'validating', '']
      }
    },
    hasFeedback: { control: 'boolean' }
  },
  tags: ['autodocs']
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    label: 'Username',
    help: 'Enter your username',
    required: true
  },
  render: (args) => (
    <FormItem {...args}>
      <Input placeholder="Username" />
    </FormItem>
  )
};

export const WithError: StoryObj<typeof meta> = {
  args: {
    label: 'Email',
    help: 'Invalid email address',
    required: true,
    validateStatus: 'error'
  },
  render: (args) => (
    <FormItem {...args}>
      <Input placeholder="Email" />
    </FormItem>
  )
};

export const WithSuccess: StoryObj<typeof meta> = {
  args: {
    label: 'Password',
    help: 'Password strength: strong',
    required: true,
    validateStatus: 'success',
    hasFeedback: true
  },
  render: (args) => (
    <FormItem {...args}>
      <Input.Password placeholder="Password" />
    </FormItem>
  )
};
