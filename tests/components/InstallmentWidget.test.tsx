import React from 'react';
import { render, screen, waitFor, fireEvent, within } from '@testing-library/react';
// import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import InstallmentWidget from '../../src/components/InstallmentWidget';
import { setTestLanguage } from '../setupTests';

import { mockInstallments, generateInstallments } from '../../__mocks__/InstallmentsMock';

// Helper to setup fetch mock
const setupFetchMock = (installments = mockInstallments) => {
  (global.fetch as jest.Mock).mockImplementation((url: string) => {
    if (url.includes('/credit_agreements')) {
      return Promise.resolve({
        ok: true,
        json: async () => installments,
      });
    }
    if (url.includes('/events')) {
      return Promise.resolve({
        ok: true,
        json: async () => ({}),
      });
    }
    return Promise.reject(new Error('Unknown endpoint'));
  });
};

const installmentWidgetWrapper = (price: number | null = null, onLoad?: () => void, onError?: () => void) => (
  <div>
    <div>
      <div style={{ flex: '1 0 auto' }}>Precio:</div>
      <div id="demo-price">{price !== null ? (price / 100).toFixed(2) + ' €' : 'N/A'}</div>
    </div>
    <InstallmentWidget
      apiBaseUrl="http://localhost:8080"
      priceSelector="#demo-price"
      onLoad={onLoad}
      onError={onError}
    />
  </div>
);

describe('InstallmentWidget', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setupFetchMock();
  });

  describe('Initial Render and Loading', () => {
    it('should render loading state initially', () => {
      (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => { }));

      render(installmentWidgetWrapper(39999));

      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('should fetch and display installment options', async () => {
      render(installmentWidgetWrapper(39999));

      await waitFor(() => {
        expect(screen.getByText('Págalo en')).toBeInTheDocument();
      });
      expect(screen.getByText('Fracciona tu pago')).toBeInTheDocument();
    });

    it('should call onLoad callback after successful fetch', async () => {
      const onLoad = jest.fn();

      render(installmentWidgetWrapper(39999, onLoad));

      await waitFor(() => {
        expect(onLoad).toHaveBeenCalled();
      });
    });

    it('should make API request with correct price parameter', async () => {
      setupFetchMock(generateInstallments(199900));

      render(installmentWidgetWrapper(199900));

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          expect.stringContaining('totalWithTax=199900')
        );
      });
    });
  });

  describe('Error Handling', () => {
    it('should display error message when fetch fails', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const onLoad = jest.fn();
      const onError = jest.fn();

      render(installmentWidgetWrapper(39999, onLoad, onError));

      await waitFor(() => {
        expect(screen.getByText('Error')).toBeInTheDocument();
        expect(
          screen.getByText('No se pudieron cargar las opciones de financiación')
        ).toBeInTheDocument();
      });

      expect(onError).toHaveBeenCalled();
    });

    it('should handle HTTP error responses', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      render(installmentWidgetWrapper(39999));

      await waitFor(() => {
        expect(
          screen.getByText('No se pudieron cargar las opciones de financiación')
        ).toBeInTheDocument();
      });
    });

    it('should show an error with zero price', async () => {
      render(installmentWidgetWrapper(0));

      await waitFor(() => {
        expect(
          screen.getByText('Precio inválido para calcular las cuotas')
        ).toBeInTheDocument();
      });
    });

    it('should show an error with negative price', async () => {
      render(installmentWidgetWrapper(-20000));

      await waitFor(() => {
        expect(
          screen.getByText('Precio inválido para calcular las cuotas')
        ).toBeInTheDocument();
      });
    });

    it('should handle missing price selector gracefully', async () => {
      const consoleWarn = jest.spyOn(console, 'warn').mockImplementation();

      render(
        <InstallmentWidget
          apiBaseUrl="http://localhost:8080"
          priceSelector="#non-existent"
        />
      );

      await waitFor(() => {
        expect(consoleWarn).toHaveBeenCalledWith(
          expect.stringContaining('Price selector "#non-existent" not found')
        );
      });

      consoleWarn.mockRestore();
    });
  });

  describe('Dropdown Selection', () => {
    it('should display all installment options in dropdown', async () => {
      render(installmentWidgetWrapper(39999));

      await waitFor(() => {
        expect(screen.getByText('Págalo en')).toBeInTheDocument();
      });

      const select = screen.getByRole('combobox');
      expect(select).toBeInTheDocument();

      const options = within(select).getAllByRole('option');
      expect(options).toHaveLength(3);
    });

    it('should update summary when selecting different option', async () => {
      render(installmentWidgetWrapper(39999));

      await waitFor(() => {
        expect(screen.getByText('Págalo en')).toBeInTheDocument();
      });

      const select = screen.getByRole('combobox') as HTMLSelectElement;

      // Initially shows 3 months option (index 0)
      expect(select.value).toBe('0');
      expect(screen.getByText('3 cuotas de 136,33 €')).toBeInTheDocument();

      // Select 6 months option (index 1)
      fireEvent.change(select, { target: { value: '1' } });

      await waitFor(() => {
        expect(select.value).toBe('1');
        expect(screen.getByText('6 cuotas de 69,66 €')).toBeInTheDocument();
      });
    });

    it('should track event when changing installment selection', async () => {
      render(installmentWidgetWrapper(39999));

      await waitFor(() => {
        expect(screen.getByText('Págalo en')).toBeInTheDocument();
      });

      const select = screen.getByRole('combobox');
      fireEvent.change(select, { target: { value: '2' } });

      await waitFor(() => {
        const eventCalls = (global.fetch as jest.Mock).mock.calls.filter(
          call => call[0].includes('/events')
        );
        expect(eventCalls.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Modal Functionality', () => {
    it('should open modal when "Más info" button is clicked', async () => {
      render(installmentWidgetWrapper(39999));

      await waitFor(() => {
        expect(screen.getByText('Más info')).toBeInTheDocument();
      });

      const moreInfoButton = screen.getByText('Más info');
      fireEvent.click(moreInfoButton);

      await waitFor(() => {
        const modal = screen.getByRole('dialog');
        expect(modal).toBeInTheDocument();
      });
    });

    it('should close modal when close button is clicked', async () => {
      render(installmentWidgetWrapper(39999));

      await waitFor(() => {
        expect(screen.getByText('Más info')).toBeInTheDocument();
      });

      // Open modal
      fireEvent.click(screen.getByText('Más info'));

      await waitFor(() => {
        const modal = screen.getByRole('dialog');
        expect(modal).toBeInTheDocument();
      });

      // Close modal
      const closeButton = screen.getByLabelText('Cerrar');
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('should close modal when "Entendido" button is clicked', async () => {
      render(installmentWidgetWrapper(39999));

      await waitFor(() => {
        expect(screen.getByText('Más info')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('Más info'));

      await waitFor(() => {
        const modal = screen.getByRole('dialog');
        expect(modal).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('Entendido'));

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('should display correct installment details in modal', async () => {
      render(installmentWidgetWrapper(39999));

      await waitFor(() => {
        expect(screen.getByText('Más info')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('Más info'));

      await waitFor(() => {
        const modal = screen.getByRole('dialog');
        expect(modal).toBeInTheDocument();

        expect(within(modal).getByText('seQura')).toBeInTheDocument();
        expect(within(modal).getByText('Fracciona tu pago')).toBeInTheDocument();
        expect(within(modal).getByText(/Fracciona tu pago solo con un coste fijo por cuota/)).toBeInTheDocument();
        expect(within(modal).getByText(/Ahora solo pagas la primera cuota/)).toBeInTheDocument();
        expect(within(modal).getByText(/El resto de pagos se cargarán automáticamente a tu tarjeta/)).toBeInTheDocument();
        expect(within(modal).getByText(/Además en el importe mostrado ya se incluye/i)).toBeInTheDocument();
      });
    });
  });


  describe('Event Tracking', () => {
    it('should track widgetLoaded event', async () => {
      render(installmentWidgetWrapper(39999));

      await waitFor(() => {
        expect(screen.getByText('Págalo en')).toBeInTheDocument();
      });

      const eventCalls = (global.fetch as jest.Mock).mock.calls.filter(
        call => call[0].includes('/events')
      );
      expect(eventCalls.length).toBeGreaterThan(0);
    });

    it('should track modalOpened event', async () => {
      render(installmentWidgetWrapper(39999));

      await waitFor(() => {
        expect(screen.getByText('Más info')).toBeInTheDocument();
      });

      const initialEventCount = (global.fetch as jest.Mock).mock.calls.filter(
        call => call[0].includes('/events')
      ).length;

      fireEvent.click(screen.getByText('Más info'));

      await waitFor(() => {
        const newEventCount = (global.fetch as jest.Mock).mock.calls.filter(
          call => call[0].includes('/events')
        ).length;
        expect(newEventCount).toBeGreaterThan(initialEventCount);
      });
    });

    it('should not fail if event tracking fails', async () => {
      (global.fetch as jest.Mock).mockImplementation((url: string) => {
        if (url.includes('/credit_agreements')) {
          return Promise.resolve({
            ok: true,
            json: async () => mockInstallments,
          });
        }
        if (url.includes('/events')) {
          return Promise.reject(new Error('Event tracking failed'));
        }
        return Promise.reject(new Error('Unknown endpoint'));
      });

      render(installmentWidgetWrapper(39999));

      // Widget should still load despite event tracking failure
      await waitFor(() => {
        expect(screen.getByText('Págalo en')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', async () => {
      render(installmentWidgetWrapper(39999));

      await waitFor(() => {
        expect(screen.getByText('Págalo en')).toBeInTheDocument();
      });

      const select = screen.getByRole('combobox');
      expect(select).toHaveAccessibleName(/Selecciona el número de cuotas/i);
    });

    it('should support keyboard navigation in dropdown', async () => {
      const user = userEvent.setup();

      render(installmentWidgetWrapper(39999));

      await waitFor(() => {
        expect(screen.getByText('Págalo en')).toBeInTheDocument();
      });

      const select = screen.getByRole('combobox');

      // Focus and use keyboard
      await user.click(select);
      await user.keyboard('{ArrowDown}');

      expect(select).toHaveFocus();
    });
  });

  describe('Internationalization (i18n)', () => {

    describe('English Language', () => {
      beforeEach(async () => {
        await setTestLanguage('en');
      });

      it('should display widget in English', async () => {
        render(installmentWidgetWrapper(39999));

        await waitFor(() => {
          expect(screen.getByText('Pay in')).toBeInTheDocument();
        });
        expect(screen.getByText('Split your payment')).toBeInTheDocument();
        expect(screen.getByText('More info')).toBeInTheDocument();
      });

      it('should display dropdown options in English', async () => {
        render(installmentWidgetWrapper(39999));

        await waitFor(() => {
          expect(screen.getByText('Pay in')).toBeInTheDocument();
        });
        const select = screen.getByRole('combobox');
        expect(select).toHaveAccessibleName(/Select the number of installments/i);
        expect(screen.getByText('3 installments of 136,33 €')).toBeInTheDocument();
      });

      it('should display error messages in English', async () => {
        render(installmentWidgetWrapper(0));

        await waitFor(() => {
          expect(screen.getByText('Invalid price to calculate installments')).toBeInTheDocument();
        });
      });

      it('should display modal in English', async () => {
        render(installmentWidgetWrapper(39999));

        await waitFor(() => {
          expect(screen.getByText('More info')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('More info'));

        await waitFor(() => {
          const modal = screen.getByRole('dialog');
          expect(modal).toBeInTheDocument();
          expect(within(modal).getByText('Split your payment')).toBeInTheDocument();
          expect(within(modal).getByText(/Split your payment with just a fixed cost per installment/)).toBeInTheDocument();
          expect(within(modal).getByText(/Now you only pay the first installment/)).toBeInTheDocument();
          expect(within(modal).getByText('Got it')).toBeInTheDocument();
        });
      });

      it('should have proper ARIA label in English on close button', async () => {
        render(installmentWidgetWrapper(39999));

        await waitFor(() => {
          expect(screen.getByText('More info')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('More info'));

        await waitFor(() => {
          const closeButton = screen.getByLabelText('Close');
          expect(closeButton).toBeInTheDocument();
        });
      });
    });

    describe('Language Switching', () => {
      it('should switch from Spanish to English', async () => {
        render(installmentWidgetWrapper(39999));
        // Initially in Spanish
        await waitFor(() => {
          expect(screen.getByText('Págalo en')).toBeInTheDocument();
        });

        // Switch to English
        await setTestLanguage('en');
        // Should now be in English
        await waitFor(() => {
          expect(screen.queryByText('Págalo en')).not.toBeInTheDocument();
          expect(screen.getByText('Pay in')).toBeInTheDocument();
        });
      });

      it('should switch from English to Spanish', async () => {
        await setTestLanguage('en');
        render(installmentWidgetWrapper(39999));

        // Initially in English
        await waitFor(() => {
          expect(screen.getByText('Pay in')).toBeInTheDocument();
        });

        // Switch to Spanish
        await setTestLanguage('es');
        // Should now be in Spanish
        await waitFor(() => {
          expect(screen.queryByText('Pay in')).not.toBeInTheDocument();
          expect(screen.getByText('Págalo en')).toBeInTheDocument();
        });
      });
    });
  });

});