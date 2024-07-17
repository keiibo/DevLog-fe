import { Meta, StoryObj } from '@storybook/react';
import { Input } from 'antd';
import { Form } from './Form';
import { FormItem } from './FormItem';
import { Colors } from '../../../constant/Colors';

const meta: Meta<typeof Form> = {
  title: 'elements/Form',
  parameters: {
    backgrounds: {
      default: 'main',
      values: [
        { name: 'main', value: Colors.MAIN },
        { name: 'white', value: Colors.WHITE }
      ]
    }
  },
  component: Form,
  tags: ['autodocs']
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  render: () => (
    <Form>
      <FormItem label="Username" name="username" rules={[{ required: true }]}>
        <Input placeholder="Enter your username" />
      </FormItem>
      <FormItem label="Password" name="password" rules={[{ required: true }]}>
        <Input.Password placeholder="Enter your password" />
      </FormItem>
    </Form>
  )
};
