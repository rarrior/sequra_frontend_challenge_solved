export class EventsService {
  constructor(private baseUrl: string) {}

  async trackEvent(payload: EventPayload): Promise<void> {
    const url = `${this.baseUrl}/events`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        console.error('Failed to track event:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error tracking event:', error);
      // Don't throw - tracking errors shouldn't break the widget
    }
  }
}