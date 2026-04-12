import type { Meta, StoryObj } from '@storybook/react';
import ErrorDisplay from './ErrorDisplay';

type ErrorDisplayStoryArgs = {
  message: string | null;
};

const meta = {
  title: 'Components/ErrorDisplay',
  component: ErrorDisplay,
  render: ({ message }) => <ErrorDisplay error={message ? new Error(message) : null} />,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<ErrorDisplayStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HiddenWhenNoError: Story = {
  name: 'No error (hidden)',
  args: {
    message: null,
  },
};

export const SingleLineError: Story = {
  args: {
    message: 'Network request failed. Please try again.',
  },
};

export const DetailedError: Story = {
  args: {
    message:
      'Could not save profile settings because the server timed out after 30 seconds. Please verify your connection and retry.',
  },
};
