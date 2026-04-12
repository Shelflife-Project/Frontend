import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import type { User } from 'shelflife-react-hooks';
import { UnProtectedRoute } from './UnProtectedRoute';

type UnProtectedRouteStoryArgs = {
  user: User | null;
};

const demoUser: User = {
  id: 9,
  username: 'admin-user',
  admin: true,
};

const meta = {
  title: 'Components/UnProtectedRoute',
  component: UnProtectedRoute,
  render: ({ user }) => (
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route path="/login" element={<UnProtectedRoute element={<div>Login form visible</div>} user={user} />} />
        <Route path="/dashboard" element={<div>Redirected to dashboard</div>} />
      </Routes>
    </MemoryRouter>
  ),
} satisfies Meta<UnProtectedRouteStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GuestCanSeeLogin: Story = {
  args: {
    user: null,
  },
};

export const AuthenticatedGetsRedirected: Story = {
  args: {
    user: demoUser,
  },
};

export const AuthenticatedAdminRedirect: Story = {
  args: {
    user: {
      ...demoUser,
      id: 99,
      username: 'super-admin',
    },
  },
};
