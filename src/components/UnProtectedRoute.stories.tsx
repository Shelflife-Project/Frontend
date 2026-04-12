import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import type { User } from 'shelflife-react-hooks';
import { UnProtectedRoute } from './UnProtectedRoute';

const demoUser: User = {
  id: 9,
  username: 'admin-user',
  admin: true,
};

const meta = {
  title: 'Components/UnProtectedRoute',
  component: UnProtectedRoute,
  render: (args) => (
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route path="/login" element={<UnProtectedRoute {...args} />} />
        <Route path="/dashboard" element={<div>Redirected to dashboard</div>} />
      </Routes>
    </MemoryRouter>
  ),
} satisfies Meta<typeof UnProtectedRoute>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GuestCanSeeLogin: Story = {
  args: {
    element: <div>Login form visible</div>,
    user: null,
  },
};

export const AuthenticatedGetsRedirected: Story = {
  args: {
    element: <div>Login form visible</div>,
    user: demoUser,
  },
};

export const AuthenticatedAdminRedirect: Story = {
  args: {
    element: <div>Login form visible</div>,
    user: {
      ...demoUser,
      id: 99,
      username: 'super-admin',
    },
  },
};
