import React from 'react';
import InstallmentWidget from './components/InstallmentWidget';
import { createRoot, type Root } from 'react-dom/client';

import type { WidgetConfig } from './types';

const SeQuraWidget = {
  root: null as Root | null,

  render(config: WidgetConfig): void {
    console.log('🎯 SeQuraWidget.render() called');
    
    const containerId = config.containerId || 'sequra-installments';
    const container = document.getElementById(containerId);
    this.root = createRoot(container!);
    
    if (!container) {
      console.error(`❌ Container "${containerId}" not found`);
      throw new Error(`Container element with id "${containerId}" not found.`);
    }

    console.log('✅ Container found:', container);

    if (!config.apiBaseUrl) {
      throw new Error('apiBaseUrl is required');
    }

    try {
      this.root.render(
        <React.StrictMode>
          <InstallmentWidget {...config} />
        </React.StrictMode>
      );
      console.log('✅ Widget rendered successfully');
    } catch (error) {
      console.error('❌ Failed to render:', error);
      if (config.onError) {
        config.onError(error as Error);
      }
      throw error;
    }
  },

  destroy(): void {
    if (this.root) {
      this.root.unmount();
    }
  },

  version: '1.0.0',
};

if (typeof window !== 'undefined') {
  (window as any).SeQuraWidget = SeQuraWidget;
  console.log('✅ SeQuraWidget exposed to window. Version:', SeQuraWidget.version);
}

export default SeQuraWidget;
export { InstallmentWidget };
export type { WidgetConfig };
