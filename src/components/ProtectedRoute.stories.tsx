import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import type { User } from 'shelflife-react-hooks';
import { ProtectedRoute } from './ProtectedRoute';

type ProtectedRouteStoryArgs = {
  user: User | null;
  isLoading: boolean;
};

const demoUser: User = {
  id: 7,
  username: 'story-user',
  admin: false,
};

const meta = {
  title: 'Components/ProtectedRoute',
  component: ProtectedRoute,
  render: ({ user, isLoading }) => (
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<div>Protected content</div>} user={user} isLoading={isLoading} />} />
        <Route path="/login" element={<div>Redirected to login</div>} />
      </Routes>
    </MemoryRouter>
  ),
} satisfies Meta<ProtectedRouteStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoadingState: Story = {
  args: {
    user: null,
    isLoading: true,
  },
};

export const UnauthenticatedRedirect: Story = {
  args: {
    user: null,
    isLoading: false,
  },
};

export const AuthenticatedContent: Story = {
  args: {
    user: demoUser,
    isLoading: false,
  },
};
