import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';
import { useState } from 'react';
import { InstallmentModal } from '../src/components/InstallmentModal';
import type { InstallmentOption } from '../src/types';

// Mock installment options for different scenarios
const mockInstallment3Months: InstallmentOption = {
  instalment_count: 3,
  apr: { value: 10408, string: '104,08 %' },
  total_with_tax: { value: 39999, string: '399,99 €' },
  cost_of_credit: { value: 900, string: '9,00 €' },
  cost_of_credit_pct: { value: 600, string: '6,00 %' },
  grand_total: { value: 40899, string: '408,99 €' },
  max_financed_amount: { value: 200000, string: '2.000,00 €' },
  instalment_amount: { value: 13333, string: '133,33 €' },
  instalment_fee: { value: 300, string: '3,00 €' },
  instalment_total: { value: 13633, string: '136,33 €' },
};

const mockInstallment6Months: InstallmentOption = {
  instalment_count: 6,
  apr: { value: 10408, string: '104,08 %' },
  total_with_tax: { value: 39999, string: '399,99 €' },
  cost_of_credit: { value: 1800, string: '18,00 €' },
  cost_of_credit_pct: { value: 450, string: '4,50 %' },
  grand_total: { value: 41799, string: '417,99 €' },
  max_financed_amount: { value: 200000, string: '2.000,00 €' },
  instalment_amount: { value: 6666, string: '66,66 €' },
  instalment_fee: { value: 300, string: '3,00 €' },
  instalment_total: { value: 6966, string: '69,66 €' },
};

const mockInstallment12Months: InstallmentOption = {
  instalment_count: 12,
  apr: { value: 10408, string: '104,08 %' },
  total_with_tax: { value: 39999, string: '399,99 €' },
  cost_of_credit: { value: 3600, string: '36,00 €' },
  cost_of_credit_pct: { value: 900, string: '9,00 %' },
  grand_total: { value: 43599, string: '435,99 €' },
  max_financed_amount: { value: 200000, string: '2.000,00 €' },
  instalment_amount: { value: 3333, string: '33,33 €' },
  instalment_fee: { value: 300, string: '3,00 €' },
  instalment_total: { value: 3633, string: '36,33 €' },
};

const mockHighPriceInstallment: InstallmentOption = {
  instalment_count: 12,
  apr: { value: 10408, string: '104,08 %' },
  total_with_tax: { value: 199999, string: '1.999,99 €' },
  cost_of_credit: { value: 3600, string: '36,00 €' },
  cost_of_credit_pct: { value: 180, string: '1,80 %' },
  grand_total: { value: 203599, string: '2.035,99 €' },
  max_financed_amount: { value: 200000, string: '2.000,00 €' },
  instalment_amount: { value: 16666, string: '166,66 €' },
  instalment_fee: { value: 300, string: '3,00 €' },
  instalment_total: { value: 16966, string: '169,66 €' },
};

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
  title: 'seQura/components/InstallmentModal',
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