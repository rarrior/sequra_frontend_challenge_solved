import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import InstallmentWidget from '../src/components/InstallmentWidget';
import { http, HttpResponse } from 'msw';
import { generateInstallments } from '../__mocks__/InstallmentsMock';

const meta: Meta<typeof InstallmentWidget> = {
  title: 'seQura/InstallmentWidget',
  component: InstallmentWidget,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'SeQura installment payment widget that displays financing options for products.',
      },
    },
    // Default MSW handlers for all stories
    msw: {
      handlers: [
        http.get('http://localhost:8080/credit_agreements', ({ request }) => {
          try {
            const url = new URL(request.url);
            const priceParam = url.searchParams.get('totalWithTax');
            const price = priceParam ? parseInt(priceParam) : 39999;

            console.log('🎭 MSW: Intercepted credit_agreements request for price:', price);

            return HttpResponse.json(generateInstallments(price));
          }
          catch (error) {
            console.error('❌ MSW: Error processing credit_agreements request:', error);
            return HttpResponse.json({ error: 'Invalid request' }, { status: 400 });
          }
        }),
        http.post('http://localhost:8080/events', async ({ request }) => {
          const body = await request.json();
          console.log('📊 MSW: Event tracked:', body);

          return HttpResponse.json({});
        }),
      ],
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story, { parameters }) => {
      const { price, skipParentDecorator } = parameters;
      // Skip this decorator for specific stories
      if (skipParentDecorator) {
        return <Story />;
      }
      return (
        <div>
          <div style={{ marginBottom: '10px', padding: '15px', background: '#eef6ffff', borderRadius: '8px', 
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px', display: 'flex', gap: '10px' }}>
              <div style={{ flex: '1 0 auto' }}>Precio:</div> 
              <div id="demo-price" style={{ color: '#00306fff'}}>{(price || price ===0) && !isNaN(price) ? (price / 100).toFixed(2).replace('.', ',') + ' €' : price}</div>
            </div>
          </div>
          <div style={{ width: '400px' }}>
            <Story />
          </div>
        </div>
      );
    },
  ],
  argTypes: {
    apiBaseUrl: {
      control: 'text',
      description: 'Base URL for the SeQura API',
    },
    priceSelector: {
      control: 'text',
      description: 'CSS selector for the price element to observe',
    },
    onLoad: {
      action: 'loaded',
      description: 'Callback when widget loads successfully',
    },
    onError: {
      action: 'error',
      description: 'Callback when an error occurs',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    apiBaseUrl: 'http://localhost:8080',
    priceSelector: '#demo-price',
    onLoad: () => console.log('✅ Widget loaded!'),
    onError: (error) => console.error('❌ Widget error:', error),
  },
  parameters: {
    price: 39999, // 399.99 €
    docs: {
      description: {
        story: 'Default widget configuration with a price of 399.99 €',
      },
    },
  }
};

// Different price points
export const LowPrice: Story = {
  args: {
    apiBaseUrl: 'http://localhost:8080',
    priceSelector: '#demo-price',
    onLoad: () => console.log('✅ Widget loaded!'),
    onError: (error) => console.error('❌ Widget error:', error),
  },
  parameters: {
    price: 9999, // 99.99 €
    docs: {
      description: {
        story: 'Widget with a lower price point (99.99 €)',
      },
    },
  },
};

export const HighPrice: Story = {
  args: {
    apiBaseUrl: 'http://localhost:8080',
    priceSelector: '#demo-price',
    onLoad: () => console.log('✅ Widget loaded!'),
    onError: (error) => console.error('❌ Widget error:', error),
  },
  parameters: {
    price: 99999, // 999.99 €
    docs: {
      description: {
        story: 'Widget with a high price point (999.99 €)',
      },
    },
  },
};

// Negative price error
export const NegativeValuePriceError: Story = {
  args: {
    apiBaseUrl: 'http://localhost:8080',
    priceSelector: '#demo-price',
    onLoad: () => console.log('✅ Widget loaded!'),
    onError: (error) => console.error('❌ Widget error:', error),
  },
  parameters: {
    price: -2000,
    docs: {
      description: {
        story: 'Widget with an invalid negative price to demonstrate error handling.',
      },
    },
  },
};

// Zero price error
export const ZeroValuePriceError: Story = {
  args: {
    apiBaseUrl: 'http://localhost:8080',
    priceSelector: '#demo-price',
    onLoad: () => console.log('✅ Widget loaded!'),
    onError: (error) => console.error('❌ Widget error:', error),
  },
  parameters: {
    price: 0,
    docs: {
      description: {
        story: 'Widget with an invalid zero price to demonstrate error handling.',
      },
    },
  },
};

// Invalid price error
export const InvalidValuePriceError: Story = {
  args: {
    apiBaseUrl: 'http://localhost:8080',
    priceSelector: '#demo-price',
    onLoad: () => console.log('✅ Widget loaded!'),
    onError: (error) => console.error('❌ Widget error:', error),
  },
  parameters: {
    price: 'invalid-price',
    docs: {
      description: {
        story: 'Widget with an invalid price to demonstrate error handling.',
      },
    },
  },
};


// With price observer
export const WithPriceObserver: Story = {
  args: {
    apiBaseUrl: 'http://localhost:8080',
    priceSelector: '#demo-price',
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ width: '400px', padding: '20px' }}>
          <div style={{ marginBottom: '10px', padding: '15px', background: '#eef6ffff', borderRadius: '8px', 
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
              Demo Price Control:
            </label>
            <div id="demo-price" style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
              99,99 €
            </div>
            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
              <button onClick={() => {
                const el = document.getElementById('demo-price');
                if (el) el.textContent = '99,99 €';
              }} style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: '#0167d5ff', color: 'white', border: 'none', borderRadius: '4px' }}>
                99,99 €
              </button>
              <button onClick={() => {
                const el = document.getElementById('demo-price');
                if (el) el.textContent = '399,99 €';
              }} style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: '#0167d5ff', color: 'white', border: 'none', borderRadius: '4px' }}>
                399,99 €
              </button>
              <button onClick={() => {
                const el = document.getElementById('demo-price');
                if (el) el.textContent = '600,00 €';
              }} style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: '#0167d5ff', color: 'white', border: 'none', borderRadius: '4px' }}>
                600,00 €
              </button>
              <button onClick={() => {
                const el = document.getElementById('demo-price');
                if (el) el.textContent = '1599,99 €';
              }} style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: '#0167d5ff', color: 'white', border: 'none', borderRadius: '4px' }}>
                1599,99 €
              </button>
            </div>
          </div>
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    skipParentDecorator: true, // Custom parameter to skip parent decorator
    docs: {
      description: {
        story: 'Widget that automatically updates when the observed price element changes. Click the price buttons to see it in action.',
      },
    },
  },
};

// Price value without decimals
export const PriceWithoutDecimals: Story = {
  args: {
    apiBaseUrl: 'http://localhost:8080',
    priceSelector: '#demo-price',
  },
  decorators: [
    (Story) => {
      return (
        <div>
          <div style={{ marginBottom: '10px', padding: '15px', background: '#eef6ffff', borderRadius: '8px', 
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px', display: 'flex', gap: '10px' }}>
              <div style={{ flex: '1 0 auto' }}>Precio:</div> 
              <div id="demo-price" style={{ color: '#00306fff'}}>2000 €</div>
            </div>
          </div>
          <div style={{ width: '400px' }}>
            <Story />
          </div>
        </div>
      );
    },
  ],
  parameters: {
    skipParentDecorator: true, // Custom parameter to skip parent decorator
    docs: {
      description: {
        story: 'Widget that shows a price without decimals.',
      },
    },
  },
};