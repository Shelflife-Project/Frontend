import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import type { PaginatedResponse } from 'shelflife-react-hooks';
import Paginator from './Paginator';

const createResponse = (
  overrides: Partial<PaginatedResponse<unknown>> = {}
): PaginatedResponse<unknown> => ({
  data: [],
  currentPage: 0,
  totalPages: 1,
  totalItems: 0,
  pageSize: 5,
  hasNext: false,
  hasPrevious: false,
  ...overrides,
});

const meta = {
  title: 'Components/Paginator',
  component: Paginator,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Paginator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SinglePageResult: Story = {
  args: {
    onChange: fn(async () => createResponse()),
  },
};

export const FirstPageWithNext: Story = {
  args: {
    onChange: fn(async () =>
      createResponse({
        hasNext: true,
        hasPrevious: false,
        totalPages: 4,
        totalItems: 20,
      })
    ),
  },
};

export const InteractiveSearch: Story = {
  args: {
    onChange: fn(async (search: string, page: number, size: number) =>
      createResponse({
        currentPage: page,
        pageSize: size,
        totalItems: search.length > 0 ? 12 : 0,
        totalPages: search.length > 0 ? 3 : 1,
        hasNext: search.length > 0,
        hasPrevious: page > 0,
      })
    ),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByPlaceholderText('Search...');

    await userEvent.type(searchInput, 'milk');

    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalled();
      expect(args.onChange).toHaveBeenLastCalledWith('milk', 0, 5);
    });
  },
};
