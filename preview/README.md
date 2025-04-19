# TRMNL Template Preview System

This directory contains the preview system for the TRMNL Salah Times templates. It allows you to view and test all template variations (full, half-horizontal, half-vertical, and quadrant) in a browser with mock data.

## Files

- `preview.html` - The base preview template with placeholders
- `inject-templates.mjs` - Script that injects templates from src/templates into the preview
- `index.html` - The generated preview file (don't edit directly)

## How to Use

1. **View the Preview**
   - Open `index.html` in your browser to see all template variations
   - Use the tabs at the top to switch between different views:
     - Full View (800x480)
     - Half Horizontal (400x480)
     - Half Vertical (800x240)
     - Quadrant (400x240)
     - All Views (shows all variations at once)

2. **Development Workflow**
   ```bash
   # After making changes to any template in src/templates/
   node preview/inject-templates.mjs
   # Then refresh your browser to see the changes
   ```

3. **Mock Data**
   The preview uses mock prayer times data to simulate the actual plugin environment. The mock data includes:
   - Current time and date
   - Prayer times for all prayers
   - Next prayer information
   - Islamic date
   - Calculation method details

## Template Structure

Templates are stored in `src/templates/` with the following structure:
```
src/templates/
├── full/
│   └── index.ts         # Full view template (800x480)
├── half-horizontal/
│   └── index.ts         # Half horizontal template (400x480)
├── half-vertical/
│   └── index.ts         # Half vertical template (800x240)
└── quadrant/
    └── index.ts         # Quadrant template (400x240)
```

## Preview Features

- Real-time template rendering with Liquid templating
- TRMNL framework CSS and JS integration
- Responsive layout with proper dimensions
- Visual indicators for template dimensions
- Dark background to simulate TRMNL display
- Support for all TRMNL CSS classes and components

## Troubleshooting

If the preview isn't working as expected:

1. Make sure all template files exist in `src/templates/`
2. Check that template files export their templates correctly:
   ```typescript
   export const fullTemplate = `...`;
   ```
3. Run `node preview/inject-templates.mjs` to regenerate the preview
4. Clear your browser cache if changes aren't showing up

## Notes

- Don't edit `index.html` directly as it's automatically generated
- Always edit templates in `src/templates/` directory
- The preview system uses the latest TRMNL framework CSS and JS from CDN 