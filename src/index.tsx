import React from 'react';
import ReactDOM from 'react-dom';
import InstallmentWidget from './components/InstallmentWidget';

import type { WidgetConfig } from './types';

const SeQuraWidget = {
  render(config: WidgetConfig): void {
    console.log('🎯 SeQuraWidget.render() called');
    
    const containerId = config.containerId || 'sequra-installments';
    const container = document.getElementById(containerId);
    
    if (!container) {
      console.error(`❌ Container "${containerId}" not found`);
      throw new Error(`Container element with id "${containerId}" not found.`);
    }

    console.log('✅ Container found:', container);

    if (!config.apiBaseUrl) {
      throw new Error('apiBaseUrl is required');
    }

    try {
      ReactDOM.render(
        <React.StrictMode>
          <InstallmentWidget {...config} />
        </React.StrictMode>,
        container
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

  destroy(containerId = 'sequra-installments'): void {
    const container = document.getElementById(containerId);
    if (container) {
      ReactDOM.unmountComponentAtNode(container);
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
