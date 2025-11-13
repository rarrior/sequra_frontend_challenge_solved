import { CreditAgreementService } from '../../src/services/CreditAgreementService';
import { mockInstallments } from '../../__mocks__/InstallmentsMock';


const mockFetchResolvedValueOnceOk = () => {
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => mockInstallments,
  });
}; 

describe('CreditAgreementService', () => {
  let creditAgreementService: CreditAgreementService;
  const baseUrl = 'http://localhost:8080';

  beforeEach(() => {
    creditAgreementService = new CreditAgreementService(baseUrl);
    jest.clearAllMocks();
  });

  describe('fetchInstallments', () => {
    it('should successfully fetch installments', async () => {
      mockFetchResolvedValueOnceOk();

      const result = await creditAgreementService.fetchInstallments(39999);

      expect(global.fetch).toHaveBeenCalledWith(
        `${baseUrl}/credit_agreements?totalWithTax=39999`
      );
      expect(result).toEqual(mockInstallments);
    });

    it('should construct correct URL with different price values', async () => {
      mockFetchResolvedValueOnceOk();

      await creditAgreementService.fetchInstallments(199900);

      expect(global.fetch).toHaveBeenCalledWith(
        `${baseUrl}/credit_agreements?totalWithTax=199900`
      );
    });

    it('should handle large price values', async () => {
      mockFetchResolvedValueOnceOk();

      await creditAgreementService.fetchInstallments(999999);

      expect(global.fetch).toHaveBeenCalledWith(
        `${baseUrl}/credit_agreements?totalWithTax=999999`
      );
    });

    it('should throw error for HTTP 404 response', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(
        creditAgreementService.fetchInstallments(39999)
      ).rejects.toThrow('HTTP error! status: 404');

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error fetching credit agreements:',
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });

    it('should throw error for HTTP 500 response', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(
        creditAgreementService.fetchInstallments(39999)
      ).rejects.toThrow('HTTP error! status: 500');

      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });

    it('should throw error for HTTP 401 response', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 401,
      });

      await expect(
        creditAgreementService.fetchInstallments(39999)
      ).rejects.toThrow('HTTP error! status: 401');

      consoleErrorSpy.mockRestore();
    });

    it('should throw error for network failures', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const networkError = new Error('Network error');

      (global.fetch as jest.Mock).mockRejectedValueOnce(networkError);

      await expect(
        creditAgreementService.fetchInstallments(39999)
      ).rejects.toThrow('Network error');

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error fetching credit agreements:',
        networkError
      );

      consoleErrorSpy.mockRestore();
    });

    it('should handle timeout errors', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const timeoutError = new Error('Request timeout');

      (global.fetch as jest.Mock).mockRejectedValueOnce(timeoutError);

      await expect(
        creditAgreementService.fetchInstallments(39999)
      ).rejects.toThrow('Request timeout');

      consoleErrorSpy.mockRestore();
    });

    it('should handle JSON parsing correctly', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockInstallments,
      });

      const result = await creditAgreementService.fetchInstallments(39999);

      expect(result).toEqual(mockInstallments);
      expect(result[0].instalment_count).toBe(3);
      expect(result[0].instalment_fee.string).toBe('3,00 €');
    });

    it('should use the correct base URL', async () => {
      const customBaseUrl = 'https://api.example.com';
      const customService = new CreditAgreementService(customBaseUrl);

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      await customService.fetchInstallments(50000);

      expect(global.fetch).toHaveBeenCalledWith(
        `${customBaseUrl}/credit_agreements?totalWithTax=50000`
      );
    });

    it('should log errors to console before throwing', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const testError = new Error('Test error');

      (global.fetch as jest.Mock).mockRejectedValueOnce(testError);

      await expect(
        creditAgreementService.fetchInstallments(39999)
      ).rejects.toThrow('Test error');

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error fetching credit agreements:',
        testError
      );

      consoleErrorSpy.mockRestore();
    });

  });
});