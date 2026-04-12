import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import CreateButton, { CreateButtonCard, CreateButtonWithOutClick } from './CreateButton';

const meta = {
  title: 'Components/Dashboard/CreateButton',
  component: CreateButton,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CreateButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FloatingPrimaryAction: Story = {
  args: {
    onClick: fn(),
  },
};

export const OptionalClickVariant: Story = {
  render: () => <CreateButtonWithOutClick />,
};

export const CardVariant: Story = {
  render: () => (
    <div className="w-64">
      <CreateButtonCard onClick={fn()} text="Create a new storage" className="min-h-32" />
    </div>
  ),
};
