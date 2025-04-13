# Design Mockup: TRMNL Salah Times Plugin

This document provides a visual representation of how the Salah Prayer Times plugin will appear on TRMNL's e-ink display.

## Full Screen View

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

## Half Screen View (Horizontal)

```
┌────────────────────────────────────────────────┐
│                   SALAH TIMES                   │
│                                                 │
│  Fajr    ── 04:26 AM   │  Dhuhr   ── 12:15 PM  │
│  Sunrise ── 05:59 AM   │  Asr     ── 03:42 PM ◄│
│  Maghrib ── 06:31 PM   │  Isha    ── 08:01 PM  │
│                                                 │
│         Next: Asr in 1h 23m                     │
│          14 Shawwal 1446 AH                     │
├────────────────────────────────────────────────┤
│ ■ Salah Times                      London, UK   │
└────────────────────────────────────────────────┘
```

## Quarter Screen View (Quadrant)

```
┌────────────────────────┐
│     SALAH TIMES        │
│                        │
│  Fajr    ── 04:26 AM   │
│  Dhuhr   ── 12:15 PM   │
│  Asr     ── 03:42 PM ◄ │
│  Maghrib ── 06:31 PM   │
│  Isha    ── 08:01 PM   │
│                        │
│  Next: Asr in 1h 23m   │
├────────────────────────┤
│ ■ Salah  London, UK    │
└────────────────────────┘
```

## Design Notes

1. **Typography**
   - Prayer names: Regular weight
   - Prayer times: Bold, monospaced for alignment
   - Next prayer indicator: Bold with highlight

2. **Visual Hierarchy**
   - Next prayer is highlighted with a subtle background
   - Countdown is emphasized with larger text
   - Hijri date is given secondary emphasis

3. **Layout Adaptability**
   - Designs adjust gracefully to different view sizes
   - Content prioritization changes with available space
   - Essential information remains visible at all sizes

4. **E-ink Optimizations**
   - High contrast black and white design
   - Minimal use of graphics
   - No animations or transitions
   - Clean spacing to avoid visual clutter

5. **Accessibility Considerations**
   - Large, readable font sizes
   - Clear labeling and contrast
   - Structured information hierarchy
   - Consistent spatial organization
