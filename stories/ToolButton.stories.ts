import type { Meta, StoryObj } from '@storybook/react'

import ToolButton from '../components/ToolButton'

const meta: Meta<typeof ToolButton> = {
  title: 'ToolButton',
  component: ToolButton,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ToolButton>

export const Primary: Story = {
  args: {
    name: 'Chakra UI',
    id: 'chakraui',
    version: '3.0.0',
  },
}

export const Secondary: Story = {
  args: {
    name: 'Next.js',
    id: 'nextjs',
    version: '13.0.0',
  },
}

export const Third: Story = {
  args: {
    name: 'TypeScript',
    id: 'typescript',
  },
}
