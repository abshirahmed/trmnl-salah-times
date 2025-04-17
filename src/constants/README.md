# TRMNL Salah Prayer Times Plugin Templates

This directory contains the template constants for the Salah Prayer Times plugin, designed according to TRMNL's design system guidelines.

## Template Constants

The templates are now embedded directly in the code as constants in `templateConstants.ts`, which provides several benefits:

1. **No filesystem access required** - Templates are available in all environments
2. **Better testability** - Constants can be imported and used in tests
3. **Improved organization** - All templates are in one place
4. **Type safety** - TypeScript provides type checking for templates

## Template Structure

| Constant | Description |
|----------|-------------|
| `TEMPLATES.full` | Full-screen view - provides comprehensive prayer time information |
| `TEMPLATES.halfVertical` | Half-screen vertical view - compact layout for vertical half-screen |
| `TEMPLATES.halfHorizontal` | Half-screen horizontal view - compact layout for horizontal half-screen |
| `TEMPLATES.quadrant` | Quadrant view - ultra-compact layout for when space is limited |

## TRMNL Design System Implementation

These templates follow TRMNL's design system best practices for e-ink displays:

1. **Proper Component Usage**
   - Using `item` components for each prayer time entry
   - Proper implementation of `layout` containers with correct modifiers
   - Standardized `title_bar` implementation

2. **Typography Hierarchy**
   - `title` for main headings
   - `label` for prayer names and secondary information
   - `value` with `value--tnums` for numeric displays

3. **Highlighting and Emphasis**
   - Using `item--highlight` to emphasize the next prayer
   - `label--highlight` for important information
   - `label--underline` for the Hijri date

4. **Adaptive Layout**
   - Different layouts based on available screen space
   - Responsive column structure in half-view
   - Ultra-compact design for quadrant view

## Usage in Tests

The `TEMPLATE_IDENTIFIERS` constants can be used in tests to verify that the correct templates are being used:

```typescript
import { TEMPLATE_IDENTIFIERS } from '@/constants/templateConstants';

// In your test
expect(response.body).toContain(TEMPLATE_IDENTIFIERS.FULL_TEMPLATE_COMMENT);
```

## Notes on E-ink Optimization

- **High Contrast**: Using black text on white background for optimal readability
- **Minimal Graphics**: No unnecessary images or graphics
- **Clear Typography**: Using appropriate text sizes and styles
- **Structured Layout**: Logical organization of information with proper spacing
- **Responsive Design**: Different templates for different screen sizes

## Example Preview

When properly implemented, the templates should render similar to:

```
┌────────────────────────────────────────────────┐
│                   SALAH TIMES                   │
│                                                 │
│   Fajr     ──────────────────── 04:26 AM       │
│                                                 │
│   Sunrise  ──────────────────── 05:59 AM       │
│                                                 │
│   Dhuhr    ──────────────────── 12:15 PM       │
│                                                 │
│   Asr      ──────────────────── 03:42 PM   ◄── │ (Highlighted - next prayer)
│                                                 │
│   Maghrib  ──────────────────── 06:31 PM       │
│                                                 │
│   Isha     ──────────────────── 08:01 PM       │
│                                                 │
│           Next: Asr in 1h 23m                   │
│                                                 │
│             14 Shawwal 1446 AH                  │
│                                                 │
├────────────────────────────────────────────────┤
│ ■ Salah Times                      London, UK   │
└────────────────────────────────────────────────┘
```