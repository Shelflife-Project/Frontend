import type { Meta, StoryObj } from '@storybook/react';
import ErrorDisplay from './ErrorDisplay';

const meta = {
  title: 'Components/ErrorDisplay',
  component: ErrorDisplay,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ErrorDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HiddenWhenNoError: Story = {
  name: 'No error (hidden)',
  args: {
    error: null,
  },
};

export const SingleLineError: Story = {
  args: {
    error: new Error('Network request failed. Please try again.'),
  },
};

export const DetailedError: Story = {
  args: {
    error: new Error(
      'Could not save profile settings because the server timed out after 30 seconds. Please verify your connection and retry.'
    ),
  },
};
