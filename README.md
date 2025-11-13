# SeQura Installment Payment Widget

A production-ready, embeddable widget that allows e-commerce merchants to display flexible payment installment options to their customers. Built with React, TypeScript, and modern web development best practices.

## Table of Contents

- [Features](#features)
- [Setup and Installation](#setup-and-installation)
- [Running the Solution](#running-the-solution)
- [Usage](#usage)
- [Technical Architecture](#technical-architecture)
- [Technical Choices and Trade-offs](#technical-choices-and-trade-offs)
- [Testing](#testing)
- [AI Tools Usage](#ai-tools-usage)

---

## Features

- **Dynamic Price Tracking**: Automatically observes and responds to price changes on the merchant's page using MutationObserver
- **Multi-language Support**: Built-in internationalization (i18n) with Spanish and English translations
- **Responsive Design**: Mobile-first approach with a clean, modern UI
- **Modal Detail View**: Comprehensive breakdown of installment costs and terms
- **Event Tracking**: Analytics integration for user interactions
- **Loading States**: Skeleton loaders for better UX during data fetches
- **Error Handling**: Graceful error states with user-friendly messages
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation support
- **Production-Ready**: Optimized bundle with tree-shaking, minification, and performance monitoring

---

## Setup and Installation

### Prerequisites

- **Node.js**: >= 18.x
- **npm**: >= 9.x (comes with Node.js)

### Installation Steps

1. **Unzip the file or clone from the repository the project** (if not already done):
   
   Clone the repo
   ```bash
   git clone git@github.com:rarrior/sequra_frontend_challenge_solved.git
   cd sequra_frontend_challenge_solved
   ```
   
   Unzip the file
   ```bash
   unzip sequra_frontend_challenge_solved.zip
   cd sequra_frontend_challenge_solved
   ```

2. **Install widget dependencies**:
   ```bash
   npm install
   ```

3. **Install API server dependencies**:
   ```bash
   cd api
   npm install
   cd ..
   ```

---

## Running the Solution

### Development Mode (Recommended for Testing)

Run the widget in development mode with hot-reloading:

```bash
# Terminal 1: Start the API server
npm run start:api

# Terminal 2: Start the development server
npm run dev
```

The application will automatically open at `http://localhost:3000` with the widget integrated into a demo product page.

### Production Build + Demo

Build and serve the production-optimized widget:

```bash
npm run demo:prod
```
Open your browser at `http://localhost:3000` that will show the integration of the widget built for production with the merchant-site

This command:
1. Builds the production bundle
2. Starts the API server
3. Serves the static files with the bundled widget

### Individual Commands

```bash
# Build production bundle
npm run build

# Run tests
npm run test

# Run tests with coverage report
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Type checking
npm run type-check

# Linting
npm run lint

# Start Storybook (component documentation)
npm run storybook

# Build Storybook for deployment
npm run build-storybook
```

---

## Usage

### Integrating into a Merchant Site

Add the widget to any e-commerce product page:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Your Product Page</title>
</head>
<body>
  <!-- Your product markup -->
  <div class="product-price">299.99</div>

  <!-- Widget container -->
  <div id="sequra-installments"></div>

  <!-- Include the widget script -->
  <script src="https://your-cdn.com/sequra-widget.min.js"></script>

  <!-- Initialize the widget -->
  <script>
    SeQuraWidget.render({
      apiBaseUrl: 'http://localhost:8080',
      priceSelector: '.product-price',
      containerId: 'sequra-installments',
      language: 'es', // 'es' or 'en'
      onLoad: () => console.log('Widget loaded'),
      onError: (error) => console.error('Widget error:', error)
    });
  </script>
</body>
</html>
```

### Configuration Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `apiBaseUrl` | string | Yes | Base URL for the SeQura API |
| `priceSelector` | string | No | CSS selector for the price element to observe |
| `containerId` | string | No | ID of the container element (default: 'sequra-installments') |
| `language` | string | No | UI language: 'es' or 'en' (default: 'es') |
| `onLoad` | function | No | Callback when widget loads successfully |
| `onError` | function | No | Callback when an error occurs |

### API Methods

```javascript
// Change language dynamically
SeQuraWidget.changeLanguage('en');

// Unmount the widget
SeQuraWidget.destroy();

// Get version
console.log(SeQuraWidget.version);
```

---

## Technical Architecture

### Project Structure

```
sequra_frontend_challenge_solved/
├── src/
│   ├── components/           # React components
│   │   ├── InstallmentWidget.tsx
│   │   ├── InstallmentWidget.styled.ts
│   │   ├── InstallmentModal.tsx
│   │   └── InstallmentModal.styled.ts
│   ├── services/            # Business logic
│   │   ├── CreditAgreementService.ts
│   │   └── EventsService.ts
│   ├── i18n/                # Internationalization
│   │   ├── config.ts
│   │   └── locales/
│   │       ├── es.json
│   │       └── en.json
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   └── index.tsx            # Entry point
├── tests/                   # Unit tests
│   ├── components/
│   └── service/
├── stories/                 # Storybook stories
├── api/                     # Mock API server
├── merchant-site/           # Demo integration
└── dist/                    # Production build output
```

### Technology Stack

- **React 18**: Modern UI library with hooks
- **TypeScript**: Type safety and improved developer experience
- **styled-components**: CSS-in-JS for component styling
- **i18next**: Internationalization framework
- **Webpack 5**: Module bundling with code splitting
- **Jest + React Testing Library**: Unit testing
- **Storybook**: Component documentation and development
- **Express**: Mock API server for development

### Architecture Patterns

1. **Service Layer Pattern**: Business logic separated into reusable services
   - `CreditAgreementService`: Handles API communication for installment data
   - `EventsService`: Manages analytics event tracking

2. **Compound Components**: Widget and Modal work together but remain independently testable

3. **Observer Pattern**: MutationObserver watches for price changes in real-time

4. **UMD Build**: Universal Module Definition for maximum compatibility (can be used as global, AMD, or CommonJS)

---

## Technical Choices and Trade-offs

### 1. React + TypeScript

**Choice**: Used React 18 with TypeScript in strict mode

**Reasoning**:
- React provides efficient DOM updates and a component-based architecture
- TypeScript catches errors at compile-time and improves code maintainability
- Excellent ecosystem and community support

**Trade-offs**:
- Larger bundle size compared to vanilla JS (mitigated with tree-shaking and code splitting)
- Learning curve for TypeScript (but worth it for long-term maintainability)

### 2. styled-components

**Choice**: CSS-in-JS with styled-components

**Reasoning**:
- Scoped styles prevent CSS conflicts with merchant sites
- Dynamic styling based on props
- Type-safe styling with TypeScript
- No build step required for CSS

**Trade-offs**:
- Runtime CSS generation adds slight overhead
- ~40KB to bundle size (acceptable for the benefits)
- **Alternative considered**: CSS Modules (would require less bundle size but more build complexity)

### 3. MutationObserver for Price Tracking

**Choice**: Used native MutationObserver API to watch price changes

**Reasoning**:
- No polling needed (more efficient)
- Reacts immediately to DOM changes
- Works with any e-commerce platform regardless of framework

**Trade-offs**:
- Requires correct selector to be provided by merchant
- May trigger multiple times if price element updates frequently
- **Assumption**: Price element is rendered on initial page load

### 4. i18next for Internationalization

**Choice**: Implemented multi-language support with i18next

**Reasoning**:
- Industry standard for React i18n
- Easy to add new languages
- Runtime language switching
- Namespace support for scalability

**Trade-offs**:
- Adds ~20KB to bundle
- **Alternative considered**: Custom solution (would save bundle size but reinvent the wheel)

### 5. Webpack Instead of Vite/Rollup

**Choice**: Used Webpack 5 for bundling

**Reasoning**:
- Mature ecosystem with extensive plugin support
- Great for complex build configurations
- UMD output works well with Webpack

**Trade-offs**:
- Slower build times compared to Vite
- More configuration required
- **Future consideration**: Migrate to Vite for faster development builds

---

## Testing

### Test Coverage

The project maintains >70% code coverage across all metrics:

```bash
npm run test:coverage
```

Coverage includes:
- Component rendering and interactions
- Service layer (API calls, event tracking)
- Error states and edge cases
- Multi-language switching
- Price change detection

### Testing Strategy

1. **Unit Tests**: Individual component and service tests
2. **Integration Tests**: Component + service interaction tests
3. **Accessibility Tests**: ARIA attributes and semantic HTML
4. **Visual Testing**: Storybook for component variations

### Example Test Scenarios

- Widget loads with valid price
- Widget handles API errors gracefully
- Price changes trigger refetch
- Modal opens and closes correctly
- Language switching updates all text
- Invalid price shows error state
- Loading states display correctly

---

## AI Tools Usage

### How AI was Integrated into the Development Process

I used **Claude (Anthropic)** extensively throughout this project to accelerate development while maintaining high code quality. Here's how:

#### 1. Initial Architecture Planning
- **Task**: Discussed project structure and architecture patterns
- **Outcome**: Decided on service layer pattern, component structure, build configuration and distribution 

#### 2. TypeScript Type Definitions
- **Task**: Generated comprehensive type definitions from API responses
- **Outcome**: Created type-safe interfaces for all data structures

#### 3. Test Writing
- **Task**: Generated test cases and test structure
- **Outcome**: Comprehensive test coverage with various edge cases

#### 4. Internationalization Setup
- **Task**: Set up i18next configuration and translation keys
- **Outcome**: Well-organized translation structure with proper namespacing

#### 5. Documentation
- **Task**: Generated README sections
- **Outcome**: Well-documented and comprehensive README

#### 6. Storybook Stories
- **Task**: Created comprehensive Storybook stories with various states
- **Outcome**: Well-documented component library with edge cases

---

## Project Metadata

- **Author**: Raul Arriola Gomez
- **Version**: 1.0.0
- **License**: MIT
- **Node Version**: >= 18.x

---

## Support

For issues, questions, or contributions, please contact the development team or open an issue in the repository.