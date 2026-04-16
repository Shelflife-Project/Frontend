import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import FormPopUp from './FormPopUp';

const meta = {
  title: 'Components/FormPopUp',
  component: FormPopUp,
  parameters: {
    layout: 'centered',
  },
  args: {
    button: <button className="btn btn-primary">Open form</button>,
    children: (
      <form className="space-y-4">
        <h2 className="text-xl font-semibold">Create storage</h2>
        <input className="input input-bordered w-full" placeholder="Storage name" />
        <button type="button" className="btn btn-primary w-full">Submit</button>
      </form>
    ),
  },
} satisfies Meta<typeof FormPopUp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ClosedByDefault: Story = {};

export const OpensOnTriggerClick: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Open form' }));

    const modalRoot = canvasElement.ownerDocument.body;
    await expect(within(modalRoot).getByText('Create storage')).toBeVisible();
  },
};

export const ClosesWithCloseButton: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Open form' }));

    const modalRoot = canvasElement.ownerDocument.body;
    await userEvent.click(within(modalRoot).getByRole('button', { name: '✕' }));
    await expect(within(modalRoot).queryByText('Create storage')).not.toBeInTheDocument();
  },
};
