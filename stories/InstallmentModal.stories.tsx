import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';
import { useState } from 'react';
import { InstallmentModal } from '../src/components/InstallmentModal';
import type { InstallmentOption } from '../src/types';

import {
  mockInstallment3Months,
  mockInstallment6Months,
  mockInstallment12Months,
  mockHighPriceInstallment,
} from '../__mocks__/InstallmentsMock';

// Wrapper component to handle modal state
const ModalWrapper: React.FC<{
  selectedOption: InstallmentOption;
  onClose?: () => void;
  initialOpen?: boolean;
}> = ({ selectedOption, onClose = fn(), initialOpen = false }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: '12px 24px',
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
      >
        Abrir Modal
      </button>
      
      <InstallmentModal
        isOpen={isOpen}
        onClose={handleClose}
        selectedOption={selectedOption}
      />
    </div>
  );
};

const meta = {
  title: 'seQura/InstallmentModal',
  component: InstallmentModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Modal component that displays detailed information about a selected installment plan.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls whether the modal is visible',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    onClose: {
      description: 'Callback function called when the modal is closed',
      table: {
        category: 'Events',
      },
    },
    selectedOption: {
      description: 'The installment option to display in the modal',
      control: 'object',
    },
  },
  args: {
    onClose: fn(),
  },
} satisfies Meta<typeof InstallmentModal>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// STORIES
// ============================================================================

export const ThreeMonths: Story = {
  args: {
    isOpen: true,
    selectedOption: mockInstallment3Months,
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal showing a 3-month installment plan (399.99€ product)',
      },
    },
  },
};

export const SixMonths: Story = {
  args: {
    isOpen: true,
    selectedOption: mockInstallment6Months,
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal showing a 6-month installment plan (399.99€ product)',
      },
    },
  },
};

export const TwelveMonths: Story = {
  args: {
    isOpen: true,
    selectedOption: mockInstallment12Months,
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal showing a 12-month installment plan (399.99€ product)',
      },
    },
  },
};

export const HighPrice: Story = {
  args: {
    isOpen: false,
    selectedOption: mockHighPriceInstallment,
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal showing installment plan for a high-price product (1,999.99€)',
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    isOpen: true,
    selectedOption: mockInstallment6Months,
  },

  render: (args) => (
    <ModalWrapper 
      selectedOption={mockInstallment6Months}
      onClose={args.onClose}
    />
  ),

  parameters: {
    docs: {
      description: {
        story: 'Interactive modal with a button to open it. Test the open/close interactions and keyboard navigation (ESC to close).',
      },
    },
  }
};