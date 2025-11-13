
import type { InstallmentOption } from '../src/types';

// Mock data
export const mockInstallments: InstallmentOption[] = [
  {
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
  },
  {
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
  },
  {
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
  },
];

export const mockInstallmentOption: InstallmentOption = {
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

// Mock installment options for different scenarios
export const mockInstallment3Months: InstallmentOption = {
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

export const mockInstallment6Months: InstallmentOption = {
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

export const mockInstallment12Months: InstallmentOption = {
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

export const mockHighPriceInstallment: InstallmentOption = {
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

// Helper function to generate installments for different prices
export const generateInstallments = (priceInCents: number): InstallmentOption[] => {
  return [3, 6, 12].map(months => {
    const fee = 300; // 3€ per installment
    const costOfCredit = fee * months;
    const grandTotal = priceInCents + costOfCredit;
    const instalmentAmount = Math.round(priceInCents / months);
    const instalmentTotal = instalmentAmount + fee;

    return {
      instalment_count: months,
      apr: { value: 10408, string: '104,08 %' },
      total_with_tax: {
        value: priceInCents,
        string: `${(priceInCents / 100).toFixed(2).replace('.', ',')} €`
      },
      cost_of_credit: {
        value: costOfCredit,
        string: `${(costOfCredit / 100).toFixed(2).replace('.', ',')} €`
      },
      cost_of_credit_pct: { value: 600, string: '6,00 %' },
      grand_total: {
        value: grandTotal,
        string: `${(grandTotal / 100).toFixed(2).replace('.', ',')} €`
      },
      max_financed_amount: { value: 200000, string: '2.000,00 €' },
      instalment_amount: {
        value: instalmentAmount,
        string: `${(instalmentAmount / 100).toFixed(2).replace('.', ',')} €`
      },
      instalment_fee: { value: fee, string: '3,00 €' },
      instalment_total: {
        value: instalmentTotal,
        string: `${(instalmentTotal / 100).toFixed(2).replace('.', ',')} €`
      },
    };
  });
};