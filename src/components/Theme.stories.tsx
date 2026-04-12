import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import Theme from './Theme';
import { ThemeProvider } from '../providers/ThemeProvider';

const meta = {
  title: 'Components/Theme',
  component: Theme,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Theme>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightModeDefault: Story = {
  loaders: [
    async () => {
      localStorage.setItem('theme', 'false');
      document.documentElement.classList.remove('dark');
      return {};
    },
  ],
};

export const DarkModeFromStorage: Story = {
  loaders: [
    async () => {
      localStorage.setItem('theme', 'true');
      document.documentElement.classList.add('dark');
      return {};
    },
  ],
};

export const ToggleThemeInteraction: Story = {
  loaders: [
    async () => {
      localStorage.setItem('theme', 'false');
      document.documentElement.classList.remove('dark');
      return {};
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('checkbox');

    await userEvent.click(toggle);
    await expect(toggle).toBeChecked();
  },
};
