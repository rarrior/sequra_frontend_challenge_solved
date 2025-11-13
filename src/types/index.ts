// ============================================================================
// TYPES
// ============================================================================

// Components Props
export interface InstallmentWidgetProps {
  apiBaseUrl: string;
  priceSelector?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  language?: string;
}

export interface WidgetConfig extends InstallmentWidgetProps {
  containerId?: string;
}

export interface InstallmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedOption: InstallmentOption | null;
}

// Data Structures
export interface InstallmentOption {
  instalment_count: number;
  apr: { value: number; string: string };
  total_with_tax: { value: number; string: string };
  cost_of_credit: { value: number; string: string };
  cost_of_credit_pct: { value: number; string: string };
  grand_total: { value: number; string: string };
  max_financed_amount: { value: number; string: string };
  instalment_amount: { value: number; string: string };
  instalment_fee: { value: number; string: string };
  instalment_total: { value: number; string: string };
}

export interface EventPayload {
  context: string;
  type: string;
  [key: string]: any;
}