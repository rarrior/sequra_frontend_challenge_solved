import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { InstallmentModal } from '../../src/components/InstallmentModal';
import { mockInstallmentOption } from '../../__mocks__/InstallmentsMock';

import type { InstallmentOption } from '../../src/types';

const installmentModalWrapper = ( isOpen: boolean, onClose: () => void, selectedOption: InstallmentOption | null ) => {
  return (
    <InstallmentModal
      isOpen={isOpen}
      onClose={onClose}
      selectedOption={selectedOption}
    />
  );
}

describe('InstallmentModal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should not render when isOpen is false', () => {
      const { container } = render(installmentModalWrapper(false, mockOnClose, mockInstallmentOption));
      expect(container.firstChild).toBeNull();
    });

    it('should not render when selectedOption is null', () => {
      const { container } = render(installmentModalWrapper(true, mockOnClose, null));
      expect(container.firstChild).toBeNull();
    });

    it('should render modal when isOpen is true and selectedOption is provided', () => {
      render(installmentModalWrapper(true, mockOnClose, mockInstallmentOption));
      const modal = screen.getByRole('dialog');
      expect(modal).toBeInTheDocument();
    });
  });

  describe('Content Display', () => {
    it('should display all info cards and title', () => {
      render(installmentModalWrapper(true, mockOnClose, mockInstallmentOption));
      expect(screen.getByText('seQura')).toBeInTheDocument();
      expect(screen.getByText('Fracciona tu pago')).toBeInTheDocument();
      expect(screen.getByText(/Fracciona tu pago solo con un coste fijo por cuota/)).toBeInTheDocument();
      expect(screen.getByText(/Ahora solo pagas la primera cuota/)).toBeInTheDocument();
      expect(screen.getByText(/El resto de pagos se cargarán automáticamente a tu tarjeta/)).toBeInTheDocument();
      expect(screen.getByText(/Además en el importe mostrado ya se incluye/i)).toBeInTheDocument();
    });

    it('should display correct fee information', () => {      
      render(installmentModalWrapper(true, mockOnClose, mockInstallmentOption));
      expect(screen.getByText(/Fracciona tu pago solo con un coste fijo por cuota/)).toBeInTheDocument();
      expect(screen.getByText('3,00 €')).toBeInTheDocument();
    });

    it('should display correct first installment amount', () => {
      render(installmentModalWrapper(true, mockOnClose, mockInstallmentOption));
      expect(screen.getByText(/Ahora solo pagas la primera cuota/)).toBeInTheDocument();
      expect(screen.getAllByText('69,66 €')).toHaveLength(2);
    });

    it('should display correct remaining installments count', () => {
      render(installmentModalWrapper(true, mockOnClose, mockInstallmentOption));
      expect(screen.getByText(/El resto de pagos se cargarán automáticamente a tu tarjeta/)).toBeInTheDocument();
      expect(screen.getAllByText('69,66 €')).toHaveLength(2);
    });

    it('should display disclaimer text', () => {
      render(installmentModalWrapper(true, mockOnClose, mockInstallmentOption));
      expect(
        screen.getByText(/Además en el importe mostrado ya se incluye la cuota única mensual de 3,00 €/)
      ).toBeInTheDocument();
    });
  });

  describe('Close Interactions', () => {
    it('should call onClose when close button is clicked', () => {
      render(installmentModalWrapper(true, mockOnClose, mockInstallmentOption));

      const closeButton = screen.getByLabelText('Cerrar');
      fireEvent.click(closeButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when "Entendido" button is clicked', () => {
      render(installmentModalWrapper(true, mockOnClose, mockInstallmentOption));

      const button = screen.getByText('Entendido');
      fireEvent.click(button);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when Escape key is pressed', () => {
      render(installmentModalWrapper(true, mockOnClose, mockInstallmentOption));

      fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should not call onClose when other keys are pressed', () => {
      render(installmentModalWrapper(true, mockOnClose, mockInstallmentOption));
      fireEvent.keyDown(document, { key: 'Enter', code: 'Enter' });
      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA label on close button', () => {
      render(installmentModalWrapper(true, mockOnClose, mockInstallmentOption));
      const closeButton = screen.getByLabelText('Cerrar');
      expect(closeButton).toBeInTheDocument();
    });
  });
});