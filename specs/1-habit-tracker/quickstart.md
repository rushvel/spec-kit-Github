# Habit Tracker Quickstart Guide

## Prerequisites

- Node.js 18 or later
- npm 9 or later
- A modern web browser (Chrome, Firefox, Safari, or Edge)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Development Workflow

### Project Structure Overview

```text
src/
├── pages/              # Next.js pages
├── components/         # React components
├── styles/            # CSS Modules
├── lib/              # Core logic
└── types/            # TypeScript types
```

### Key Commands

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run test` - Run tests
- `npm run lint` - Run linting
- `npm run type-check` - Run TypeScript checks

### Development Guidelines

1. **Component Creation**
   - Place new components in appropriate subdirectory under `src/components/`
   - Create associated CSS Module (e.g., `MyComponent.module.css`)
   - Add tests in `tests/components/`

2. **State Management**
   - Use React Context for global state
   - Local state for component-specific data
   - LocalStorage wrapper in `lib/storage/`

3. **Styling**
   - Use CSS Modules exclusively
   - Follow BEM-like naming in components
   - Global styles in `styles/global.css`

4. **Testing**
   - Unit tests for utility functions
   - Component tests with React Testing Library
   - Run full test suite before commits

5. **Performance**
   - Keep bundle size within limits
   - Lazy load non-critical components
   - Monitor localStorage usage

### Local Storage

The app uses browser localStorage with these keys:
- `habits_v1`: Habit data
- `completions_v1`: Completion records
- `achievements_v1`: Achievement data
- `settings_v1`: User settings

To reset data during development:
```javascript
Object.keys(localStorage).forEach(key => {
  if (key.endsWith('_v1')) localStorage.removeItem(key);
});
```

### Debugging

1. **React Developer Tools**
   - Install Chrome/Firefox extension
   - Monitor component rendering
   - Inspect Context state

2. **Local Storage**
   - Use browser DevTools Application tab
   - Check storage quota usage
   - Clear data if needed

3. **Performance**
   - Use Chrome Lighthouse
   - Monitor bundle size with `npm run analyze`
   - Check React profiler for bottlenecks

## Deployment

1. Create production build:
```bash
npm run build
```

2. Test the build locally:
```bash
npm run start
```

3. Deploy `out/` directory to static hosting

## Contributing

1. Create feature branch from main
2. Follow code style guide
3. Ensure tests pass
4. Update documentation
5. Submit pull request

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version
   - Clear `.next/` directory
   - Remove node_modules and reinstall

2. **Local Storage Issues**
   - Check browser quota
   - Clear old data
   - Verify JSON parsing

3. **Performance Problems**
   - Check bundle analyzer
   - Verify lazy loading
   - Monitor React rendering

### Support

For issues:
1. Check existing GitHub issues
2. Run diagnostics: `npm run diagnostic`
3. Create new issue with details