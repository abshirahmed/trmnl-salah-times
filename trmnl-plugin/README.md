# TRMNL Salah Prayer Times Plugin Templates

This directory contains optimized HTML/Liquid templates for the Salah Prayer Times plugin, designed according to TRMNL's design system guidelines.

## Template Files

| Filename | Description |
|----------|-------------|
| `markup.html` | Full-screen view - provides comprehensive prayer time information |
| `half-view-markup.html` | Half-screen view - compact layout for horizontal or vertical half-screen |
| `quadrant-view-markup.html` | Quadrant view - ultra-compact layout for when space is limited |

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

## Usage in TRMNL

To use these templates in your TRMNL plugin:

1. Create a Private Plugin in your TRMNL account
2. Set up the API polling to your AWS API Gateway endpoint
3. Copy the content of the appropriate template from this directory
4. Paste into the Markup Editor in your TRMNL account
5. Test across different view sizes to ensure proper rendering

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