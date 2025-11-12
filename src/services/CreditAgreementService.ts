export class CreditAgreementService {
  constructor(private baseUrl: string) {}

  async fetchInstallments(totalWithTax: number): Promise<InstallmentOption[]> {
    const url = `${this.baseUrl}/credit_agreements?totalWithTax=${totalWithTax}`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching credit agreements:', error);
      throw error;
    }
  }
}