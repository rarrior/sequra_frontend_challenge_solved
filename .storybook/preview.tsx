import React, { useEffect } from 'react';
import type { Preview } from '@storybook/react';
import { initialize, mswLoader } from 'msw-storybook-addon';
import i18n from '../src/i18n/config';

initialize();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['seQura', ['InstallmentWidget', ['Default', '*'], 'InstallmentModal']],
        locales: 'en-US',
      }
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#f5f5f5',
        },
        {
          name: 'white',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#333333',
        },
      ],
    },
  },
  loaders: [mswLoader], // 👈 Add the MSW loader to all stories
  globalTypes: {
    locale: {
      name: 'Language',
      description: 'Internationalization locale',
      defaultValue: 'es',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'es', title: 'Español', right: '🇪🇸' },
          { value: 'en', title: 'English', right: '🇬🇧' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const { locale } = context.globals;
      useEffect(() => {
        i18n.changeLanguage(locale);
      }, [locale]);
      return <Story />;
    },
  ],
};

export default preview;