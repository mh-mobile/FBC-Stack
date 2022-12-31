import type { Meta, StoryObj } from '@storybook/react';

import Date from '../components/Date';

const meta: Meta<typeof Date> = {
  title: 'Date',
  component: Date,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Date>;

export const Primary: Story = {
  args: {
    dateString: "2022-12-31",
  },
};

export const Secondary: Story = {
  args: {
    dateString: "2022-12-25",
  },
};
