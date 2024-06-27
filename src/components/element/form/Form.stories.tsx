import { Meta, StoryObj } from '@storybook/react';
import { Input } from 'antd';
import { Form } from './Form';
import { FormItem } from './FormItem';

const meta: Meta<typeof Form> = {
  title: 'elements/Form',
  component: Form,
  parameters: {
    controls: {
      include: []
    }
  }
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
