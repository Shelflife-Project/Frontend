import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import type { User } from 'shelflife-react-hooks';
import { ProtectedRoute } from './ProtectedRoute';

const demoUser: User = {
  id: 7,
  username: 'story-user',
  admin: false,
};

const meta = {
  title: 'Components/ProtectedRoute',
  component: ProtectedRoute,
  render: (args) => (
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<ProtectedRoute {...args} />} />
        <Route path="/login" element={<div>Redirected to login</div>} />
      </Routes>
    </MemoryRouter>
  ),
} satisfies Meta<typeof ProtectedRoute>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoadingState: Story = {
  args: {
    element: <div>Protected content</div>,
    user: null,
    isLoading: true,
  },
};

export const UnauthenticatedRedirect: Story = {
  args: {
    element: <div>Protected content</div>,
    user: null,
    isLoading: false,
  },
};

export const AuthenticatedContent: Story = {
  args: {
    element: <div>Protected content</div>,
    user: demoUser,
    isLoading: false,
  },
};
