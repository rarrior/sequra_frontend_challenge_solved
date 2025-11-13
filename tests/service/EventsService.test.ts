import { EventsService } from '../../src/services/EventsService';

describe('EventsService', () => {
  let eventsService: EventsService;
  const baseUrl = 'http://localhost:8080';

  beforeEach(() => {
    eventsService = new EventsService(baseUrl);
    jest.clearAllMocks();
  });

  describe('trackEvent', () => {
    it('should successfully track an event', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      await eventsService.trackEvent({
        context: 'checkoutWidget',
        type: 'widgetLoaded',
        price: 10000,
      });

      expect(global.fetch).toHaveBeenCalledWith(
        `${baseUrl}/events`,
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            context: 'checkoutWidget',
            type: 'widgetLoaded',
            price: 10000,
          }),
        })
      );
    });

    it('should handle HTTP error responses without throwing', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      // Should not throw
      await expect(
        eventsService.trackEvent({
          context: 'checkoutWidget',
          type: 'widgetError',
          error: 'Test error',
        })
      ).resolves.not.toThrow();

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to track event:',
        500,
        'Internal Server Error'
      );

      consoleErrorSpy.mockRestore();
    });

    it('should handle network errors without throwing', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error('Network error')
      );

      // Should not throw
      await expect(
        eventsService.trackEvent({
          context: 'checkoutWidget',
          type: 'widgetError',
          error: 'Test error',
        })
      ).resolves.not.toThrow();

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error tracking event:',
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });

    it('should handle 404 error response', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      await eventsService.trackEvent({
        context: 'checkoutWidget',
        type: 'modalOpened',
      });

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to track event:',
        404,
        'Not Found'
      );

      consoleErrorSpy.mockRestore();
    });

    it('should track events with different contexts', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      await eventsService.trackEvent({
        context: 'customContext',
        type: 'customEvent',
        customData: 'test',
      });

      expect(global.fetch).toHaveBeenCalledWith(
        `${baseUrl}/events`,
        expect.objectContaining({
          body: JSON.stringify({
            context: 'customContext',
            type: 'customEvent',
            customData: 'test',
          }),
        })
      );
    });
  });
});