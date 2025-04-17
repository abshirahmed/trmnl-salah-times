# TRMNL Design System Framework: Complete Documentation for AI Template Building

## Introduction

The TRMNL design system is a comprehensive framework for creating visually consistent, high-quality templates and plugins for the TRMNL e-ink display. This document provides all the necessary information for an AI agent to understand and build templates using the TRMNL design system.

TRMNL is an e-ink display solution designed to serve as a distraction-free companion for focused productivity. It features an 800x480 pixel, black and white, 1-bit grayscale display, which requires specific design considerations. This document details the components, design patterns, and implementation guidelines for creating effective TRMNL templates.

## Technical Specifications

- **Display**: 800x480 pixels, black and white, 1-bit grayscale e-ink display
- **Template Format**: HTML with Liquid templating language support
- **Components Library**: Pre-built CSS classes and JavaScript utilities
- **Framework Location**: [https://usetrmnl.com/framework](https://usetrmnl.com/framework)

## Getting Started

### Required Files

To begin building a TRMNL template, include these files in your HTML:

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://usetrmnl.com/css/latest/plugins.css">
    <script src="https://usetrmnl.com/js/latest/plugins.js"></script>
    
    <!-- Optional: Include Inter font for consistent typography -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;350;375;400;450;600;700&display=swap" rel="stylesheet">
  </head>
  <body class="environment trmnl">
    <div class="screen">
      <!-- Your template content goes here -->
    </div>
  </body>
</html>
```

### Basic Template Structure

A basic TRMNL template follows this structure:

```html
<div class="screen">
  <div class="view view--full">
    <div class="layout">
      <div class="columns">
        <div class="column">
          <!-- Main content goes here -->
        </div>
      </div>
    </div>

    <div class="title_bar">
      <img class="image" src="https://usetrmnl.com/images/plugins/trmnl--render.svg" />
      <span class="title">Plugin Title</span>
      <span class="instance">Instance Title</span>
    </div>
  </div>
</div>
```

## Framework Components

The TRMNL design system is organized into several categories of components:

### 1. Utilities

Components for styling and layout controls:

#### Background

Grayscale dithered patterns optimized for 1-bit rendering.

```html
<!-- Available background classes -->
<div class="background--white"></div>
<div class="background--light"></div>
<div class="background--medium"></div>
<div class="background--dark"></div>
<div class="background--black"></div>

<!-- Applied to a component -->
<div class="item background--light">
  <div class="content">Item with light background</div>
</div>
```

#### Border

Apply border patterns that create the illusion of different border intensities.

```html
<!-- Border all sides -->
<div class="border"></div>

<!-- Border specific sides -->
<div class="border-top"></div>
<div class="border-right"></div>
<div class="border-bottom"></div>
<div class="border-left"></div>

<!-- Border color variants -->
<div class="border border--light"></div>
<div class="border border--medium"></div>
<div class="border border--dark"></div>

<!-- Border radius -->
<div class="border radius"></div>
<div class="border radius--small"></div>
```

#### Spacing

Control element spacing with fixed margin and padding values.

```html
<!-- Margin on all sides -->
<div class="margin"></div>
<div class="margin--small"></div>
<div class="margin--large"></div>

<!-- Margin on specific sides -->
<div class="margin-top"></div>
<div class="margin-right"></div>
<div class="margin-bottom"></div>
<div class="margin-left"></div>

<!-- Padding on all sides -->
<div class="padding"></div>
<div class="padding--small"></div>
<div class="padding--large"></div>

<!-- Padding on specific sides -->
<div class="padding-top"></div>
<div class="padding-right"></div>
<div class="padding-bottom"></div>
<div class="padding-left"></div>
```

#### Gap

Set precise spacing between elements with predefined gap values.

```html
<!-- Applied to container elements like columns, flex, grid -->
<div class="columns gap"></div>
<div class="columns gap--small"></div>
<div class="columns gap--large"></div>

<!-- Example with flex container -->
<div class="flex flex--column gap">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

#### Size

Define exact width and height dimensions for elements.

```html
<!-- Width classes -->
<div class="width--auto"></div>
<div class="width--full"></div>
<div class="width--half"></div>
<div class="width--third"></div>
<div class="width--quarter"></div>

<!-- Width in pixels -->
<div class="width--25"></div>
<div class="width--50"></div>
<div class="width--100"></div>
<div class="width--200"></div>

<!-- Height classes -->
<div class="height--auto"></div>
<div class="height--full"></div>
<div class="height--half"></div>

<!-- Height in pixels -->
<div class="height--25"></div>
<div class="height--50"></div>
<div class="height--100"></div>
<div class="height--200"></div>
```

#### Image

Optimize images using dithering techniques for 1-bit rendering.

```html
<!-- Basic image with automatic dithering -->
<img class="image" src="image-url.jpg" />

<!-- Image sizes -->
<img class="image image--small" src="image-url.jpg" />
<img class="image image--medium" src="image-url.jpg" />
<img class="image image--large" src="image-url.jpg" />

<!-- Image with custom dimensions -->
<img class="image width--100 height--100" src="image-url.jpg" />

<!-- Image with border radius -->
<img class="image radius" src="image-url.jpg" />
```

### 2. Base Components

Primary structural elements:

#### View

Show your plugin in different sizes with Mashup view containers.

```html
<!-- Full-size view (entire display) -->
<div class="view view--full">
  <!-- Content -->
</div>

<!-- Half-height view -->
<div class="view view--half-vertical">
  <!-- Content -->
</div>

<!-- Half-width view -->
<div class="view view--half-horizontal">
  <!-- Content -->
</div>

<!-- Quarter-sized (quadrant) view -->
<div class="view view--quadrant">
  <!-- Content -->
</div>
```

#### Layout

Primary container for organizing plugin content.

```html
<!-- Basic layout -->
<div class="layout">
  <!-- Content -->
</div>

<!-- Layout with padding -->
<div class="layout padding">
  <!-- Content -->
</div>

<!-- Layout with background -->
<div class="layout background--light">
  <!-- Content -->
</div>

<!-- Scrollable layout (for content that exceeds view height) -->
<div class="layout layout--scroll">
  <!-- Content -->
</div>
```

#### Title Bar

Standardized title bar with plugin information and instance details.

```html
<!-- Basic title bar -->
<div class="title_bar">
  <img class="image" src="icon-url.svg" />
  <span class="title">Plugin Title</span>
  <span class="instance">Instance Title</span>
</div>

<!-- Title bar with only plugin name -->
<div class="title_bar">
  <span class="title">Plugin Title</span>
</div>

<!-- Title bar with custom action -->
<div class="title_bar">
  <span class="title">Plugin Title</span>
  <button class="action">Refresh</button>
</div>
```

#### Columns

Implement zero-config column layouts for content organization.

```html
<!-- Two equal columns -->
<div class="columns">
  <div class="column">
    <!-- Left column content -->
  </div>
  <div class="column">
    <!-- Right column content -->
  </div>
</div>

<!-- Three columns -->
<div class="columns columns--3">
  <div class="column">Column 1</div>
  <div class="column">Column 2</div>
  <div class="column">Column 3</div>
</div>

<!-- Unequal columns (1/3 + 2/3) -->
<div class="columns">
  <div class="column column--1-3">
    <!-- Smaller column content -->
  </div>
  <div class="column column--2-3">
    <!-- Larger column content -->
  </div>
</div>

<!-- Columns with gap -->
<div class="columns gap">
  <div class="column">Column 1</div>
  <div class="column">Column 2</div>
</div>
```

#### Mashup

Assemble multiple plugin views into a single interface.

```html
<!-- Basic mashup with multiple views -->
<div class="mashup">
  <div class="view view--half-horizontal">
    <!-- First view content -->
  </div>
  <div class="view view--half-horizontal">
    <!-- Second view content -->
  </div>
</div>

<!-- Complex layout with different sized views -->
<div class="mashup">
  <div class="view view--half-horizontal">
    <!-- Left half view -->
  </div>
  <div class="view view--quadrant">
    <!-- Top right quadrant -->
  </div>
  <div class="view view--quadrant">
    <!-- Bottom right quadrant -->
  </div>
</div>
```

#### Grid

Create grid layouts with predefined column structures.

```html
<!-- Basic 2x2 grid -->
<div class="grid grid--2">
  <div class="grid__item">Item 1</div>
  <div class="grid__item">Item 2</div>
  <div class="grid__item">Item 3</div>
  <div class="grid__item">Item 4</div>
</div>

<!-- 3-column grid -->
<div class="grid grid--3">
  <div class="grid__item">Item 1</div>
  <div class="grid__item">Item 2</div>
  <div class="grid__item">Item 3</div>
</div>

<!-- Grid with gap -->
<div class="grid grid--2 gap">
  <div class="grid__item">Item 1</div>
  <div class="grid__item">Item 2</div>
  <div class="grid__item">Item 3</div>
  <div class="grid__item">Item 4</div>
</div>
```

#### Flex

Arrange elements with flexible layouts and alignment options.

```html
<!-- Row flex container (default) -->
<div class="flex">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Column flex container -->
<div class="flex flex--column">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Flex alignment -->
<div class="flex flex--justify-center">
  <div>Centered items</div>
</div>

<div class="flex flex--justify-between">
  <div>Left</div>
  <div>Right</div>
</div>

<div class="flex flex--align-center">
  <div>Vertically centered</div>
</div>

<!-- Combining alignments -->
<div class="flex flex--justify-center flex--align-center">
  <div>Perfectly centered</div>
</div>
```

### 3. Typography

Text styling components:

#### Text

Control text alignment and formatting.

```html
<!-- Text alignment -->
<div class="text--left">Left-aligned text</div>
<div class="text--center">Center-aligned text</div>
<div class="text--right">Right-aligned text</div>

<!-- Text weight -->
<div class="text--light">Light weight text</div>
<div class="text--normal">Normal weight text</div>
<div class="text--bold">Bold weight text</div>

<!-- Text styles -->
<div class="text--uppercase">UPPERCASE TEXT</div>
<div class="text--monospace">Monospace text</div>

<!-- Text size -->
<div class="text--small">Small text</div>
<div class="text--large">Large text</div>
```

#### Title

Style headings with consistent typography.

```html
<!-- Basic title -->
<span class="title">Main Title</span>

<!-- Title sizes -->
<span class="title title--small">Small Title</span>
<span class="title title--medium">Medium Title</span>
<span class="title title--large">Large Title</span>

<!-- Title with alignment -->
<span class="title text--center">Centered Title</span>

<!-- Underlined title -->
<span class="title title--underline">Underlined Title</span>
```

#### Value

Display data values with consistent formatting.

```html
<!-- Basic value -->
<span class="value">42</span>

<!-- Value sizes -->
<span class="value value--small">42</span>
<span class="value value--large">42</span>
<span class="value value--xlarge">42</span>

<!-- Value with unit -->
<span class="value">42<span class="value__unit">%</span></span>

<!-- Currency value -->
<span class="value">$42.50</span>

<!-- Styled value -->
<span class="value value--positive">+15%</span>
<span class="value value--negative">-10%</span>
```

#### Label

Create clear labels for unified content identification.

```html
<!-- Basic label -->
<span class="label">Category</span>

<!-- Label variations -->
<span class="label label--small">Small label</span>
<span class="label label--pill">Pill label</span>
<span class="label label--tag">Tag label</span>

<!-- Label with underline -->
<span class="label label--underline">Underlined label</span>

<!-- Labels with background -->
<span class="label background--light">Light background</span>
<span class="label background--dark">Dark background</span>
```

#### Description

Format descriptive text with standardized styles.

```html
<!-- Basic description -->
<span class="description">This is a description text that provides additional context.</span>

<!-- Description variations -->
<span class="description description--small">Smaller description text</span>
<span class="description description--large">Larger description text</span>

<!-- Indented description -->
<span class="description description--indent">Indented description</span>

<!-- Description with alignment -->
<span class="description text--center">Centered description</span>
```

#### Clamp

Manage text overflow with single and multi-line truncation.

```html
<!-- Single line clamp with ellipsis -->
<div class="clamp">
  This is a very long text that will be truncated after one line with an ellipsis.
</div>

<!-- Multi-line clamp (2 lines) -->
<div class="clamp clamp--2">
  This text will be clamped after two lines. Any additional content beyond the
  second line will be cut off and replaced with an ellipsis.
</div>

<!-- Multi-line clamp (3 lines) -->
<div class="clamp clamp--3">
  This text can span up to three lines before being truncated with an ellipsis.
  Perfect for longer descriptions or content that needs more space without taking
  up too much room on the display.
</div>
```

### 4. Components

UI elements for content presentation:

#### Item

Build standardized list items and content blocks.

```html
<!-- Basic item -->
<div class="item">
  <div class="content">
    <span class="title">Item Title</span>
    <span class="description">Item description</span>
  </div>
</div>

<!-- Item with leading icon -->
<div class="item">
  <div class="icon">
    <img class="image" src="icon-url.svg" />
  </div>
  <div class="content">
    <span class="title">Item with Icon</span>
    <span class="description">Description text</span>
  </div>
</div>

<!-- Item with action -->
<div class="item">
  <div class="content">
    <span class="title">Item with Action</span>
  </div>
  <div class="action">
    <button>View</button>
  </div>
</div>

<!-- Item with label and value -->
<div class="item">
  <div class="content">
    <span class="label">Temperature</span>
    <span class="value">72°F</span>
  </div>
</div>

<!-- Bordered item -->
<div class="item border">
  <div class="content">
    <span class="title">Bordered Item</span>
  </div>
</div>
```

#### Table

Create data tables optimized for 1-bit display.

```html
<!-- Basic table -->
<div class="table">
  <div class="table__header">
    <div class="table__row">
      <div class="table__cell table__cell--header">Name</div>
      <div class="table__cell table__cell--header">Value</div>
      <div class="table__cell table__cell--header">Status</div>
    </div>
  </div>
  <div class="table__body">
    <div class="table__row">
      <div class="table__cell">Item 1</div>
      <div class="table__cell">42</div>
      <div class="table__cell">Active</div>
    </div>
    <div class="table__row">
      <div class="table__cell">Item 2</div>
      <div class="table__cell">18</div>
      <div class="table__cell">Inactive</div>
    </div>
  </div>
</div>

<!-- Table with cell alignment -->
<div class="table">
  <div class="table__header">
    <div class="table__row">
      <div class="table__cell table__cell--header">Name</div>
      <div class="table__cell table__cell--header text--right">Value</div>
    </div>
  </div>
  <div class="table__body">
    <div class="table__row">
      <div class="table__cell">Item 1</div>
      <div class="table__cell text--right">42</div>
    </div>
  </div>
</div>

<!-- Compact table -->
<div class="table table--compact">
  <!-- Table content -->
</div>

<!-- Table with striped rows -->
<div class="table table--striped">
  <!-- Table content -->
</div>
```

#### Chart

Visualize data optimized for 1-bit rendering.

```html
<!-- Basic chart using Highcharts -->
<script src="https://code.highcharts.com/highcharts.js"></script>
<div id="chart-container" class="chart"></div>
<script>
Highcharts.chart('chart-container', {
  chart: {
    type: 'line',
    backgroundColor: 'transparent',
    style: {
      fontFamily: 'Inter, sans-serif'
    }
  },
  title: {
    text: 'Monthly Data',
    style: {
      fontWeight: '600',
      fontSize: '16px',
      color: '#000'
    }
  },
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    lineColor: '#000',
    tickColor: '#000',
    labels: {
      style: {
        color: '#000'
      }
    }
  },
  yAxis: {
    title: {
      text: null
    },
    gridLineColor: '#ccc',
    lineColor: '#000',
    tickColor: '#000',
    labels: {
      style: {
        color: '#000'
      }
    }
  },
  legend: {
    enabled: false
  },
  plotOptions: {
    line: {
      color: '#000',
      lineWidth: 2,
      marker: {
        fillColor: '#fff',
        lineWidth: 2,
        lineColor: '#000'
      }
    }
  },
  series: [{
    name: 'Value',
    data: [29, 42, 35, 48, 51]
  }]
});
</script>

<!-- Bar chart -->
<script>
Highcharts.chart('bar-chart-container', {
  chart: {
    type: 'bar',
    backgroundColor: 'transparent'
  },
  // Additional configuration...
  series: [{
    name: 'Value',
    data: [10, 20, 30, 40, 50]
  }]
});
</script>
```

### 5. Modulations

Components for special content handling:

#### Overflow

Handle content overflow in fixed-size containers.

```html
<!-- Basic overflow with scrolling -->
<div class="overflow">
  <div class="content">
    <!-- Long content that will overflow -->
  </div>
</div>

<!-- Overflow with fade effect -->
<div class="overflow overflow--fade">
  <div class="content">
    <!-- Long content with fading edges -->
  </div>
</div>

<!-- Horizontal overflow -->
<div class="overflow overflow--horizontal">
  <div class="content">
    <!-- Horizontally scrollable content -->
  </div>
</div>

<!-- Fixed height overflow -->
<div class="overflow height--200">
  <div class="content">
    <!-- Content in a 200px tall container -->
  </div>
</div>
```

#### Format Value

Format numbers and values with consistent styling.

```html
<!-- Basic formatted value -->
<span class="format-value">1234</span> <!-- displays as: 1,234 -->

<!-- Currency formatting -->
<span class="format-value format-value--currency">1234</span> <!-- displays as: $1,234.00 -->

<!-- Percentage formatting -->
<span class="format-value format-value--percent">0.75</span> <!-- displays as: 75% -->

<!-- Decimal precision -->
<span class="format-value format-value--decimal-2">123.456</span> <!-- displays as: 123.46 -->

<!-- Compact notation -->
<span class="format-value format-value--compact">1234567</span> <!-- displays as: 1.2M -->
```

#### Fit Value

Automatically resize numbers and values to fit within their containers.

```html
<!-- Basic fit value -->
<div class="fit-value">
  <span>1234567890</span>
</div>

<!-- Fit value with min/max size -->
<div class="fit-value" data-min-size="16" data-max-size="64">
  <span>1234</span>
</div>

<!-- Fit value with units -->
<div class="fit-value">
  <span>42</span>
  <span class="fit-value__unit">km/h</span>
</div>

<!-- Fit value in a fixed width container -->
<div class="fit-value width--100">
  <span>9876</span>
</div>
```

## View Layouts

TRMNL templates support multiple view layouts:

1. **Full view** (`view--full`): Uses the entire display
2. **Half vertical** (`view--half-vertical`): Half-height view
3. **Half horizontal** (`view--half-horizontal`): Half-width view
4. **Quadrant** (`view--quadrant`): Quarter-sized view

Example of a half-vertical view:

```html
<div class="view view--half-vertical">
  <!-- Content for half-vertical view -->
</div>
```

## Templating with Liquid

TRMNL uses the Liquid templating language (by Shopify) to make templates dynamic. Use `{{ variable }}` syntax to interpolate values.

### Example with Liquid Templates

```html
<div class="item">
  <div class="content">
    <span class="title title--small">{{ event.title }}</span>
    <span class="description">{{ event.description }}</span>
    <span class="label">{{ event.start_time }}</span>
  </div>
</div>
```

### Conditional Logic

```html
{% if events.size > 0 %}
  {% for event in events %}
    <div class="item">
      <!-- event content -->
    </div>
  {% endfor %}
{% else %}
  <span class="title title--small">No events scheduled.</span>
{% endif %}
```

## Data Visualization

### Charts and Graphs

For data visualization, TRMNL supports third-party libraries like Highcharts, styled to work well with the e-ink display:

```html
<script src="https://code.highcharts.com/highcharts.js"></script>
<div class="layout">
  <div id="container"></div>
</div>
<script>
Highcharts.chart("container", {
  // Chart configuration
  title: {
    text: "Chart demo"
  },
  // More configuration...
});
</script>
```

For detailed chart styling optimized for the e-ink display, refer to: [/framework/chart](https://usetrmnl.com/framework/chart)

## E-Ink Display Considerations

When designing for the TRMNL e-ink display, keep in mind:

1. **Black and white only**: No color, just 1-bit grayscale
2. **Dithering for images**: Use the Image component to properly dither images
3. **Text readability**: Ensure sufficient contrast and appropriate font sizes
4. **Refresh rate limitations**: E-ink has slower refresh rates than traditional displays
5. **Battery optimization**: Minimize unnecessary refreshes to extend battery life

## Common UI Patterns

### List Items

```html
<div class="item">
  <div class="content">
    <span class="title title--small">Item Title</span>
    <span class="description">Item description text here</span>
    <span class="label">Additional information</span>
  </div>
</div>
```

### Data Tables

```html
<div class="table">
  <div class="table__header">
    <div class="table__row">
      <div class="table__cell table__cell--header">Header 1</div>
      <div class="table__cell table__cell--header">Header 2</div>
    </div>
  </div>
  <div class="table__body">
    <div class="table__row">
      <div class="table__cell">Cell 1</div>
      <div class="table__cell">Cell 2</div>
    </div>
    <!-- Additional rows -->
  </div>
</div>
```

### Markdown Content

```html
<div class="markdown">
  <span class="title">Section Title</span>
  <div class="content content--center">Centered content here</div>
  <span class="label label--underline">Footer text</span>
</div>
```

## Best Practices

1. **Minimalism**: Focus on essential information to avoid cluttering the display
2. **Consistent spacing**: Use the spacing and gap components for uniform layout
3. **Text hierarchy**: Employ proper typography components to establish clear hierarchy
4. **Optimized images**: Always use the image component to properly render images
5. **Responsive layouts**: Test on the actual display dimensions (800x480px)
6. **Content overflow**: Use clamp and overflow components to handle content gracefully

## Advanced Features

### Plugin Development API

For more advanced template functionality, TRMNL provides a Developer Edition that unlocks the full API capabilities:

- Use custom HTML markup for complex interfaces
- Implement WebHook or polling mechanisms for dynamic data retrieval
- Create custom screens in under 5 minutes

### Self-Hosting Options

TRMNL supports a "Bring Your Own Server" (BYOS) approach, with multiple reference implementations:

- Terminus (Ruby, Official)
- Laravel (PHP, Community)
- Next.js (JavaScript, Community)
- Phoenix (Elixir, Official)
- Django (Python, Community)

## Testing Your Templates

Before deploying, test your template in the following ways:

1. Use the live previewer in the TRMNL account interface
2. Test responsiveness at the exact 800x480px dimensions
3. Check text readability at different distances
4. Verify proper image dithering and contrast
5. Test dynamic content with various data conditions

## Complete Example Template

Here's a complete example of a weather dashboard template:

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://usetrmnl.com/css/latest/plugins.css">
    <script src="https://usetrmnl.com/js/latest/plugins.js"></script>
  </head>
  <body class="environment trmnl">
    <div class="screen">
      <div class="view view--full">
        <div class="layout">
          <div class="columns">
            <div class="column">
              <div class="markdown">
                <span class="title">Weather Dashboard</span>
                
                <div class="item">
                  <div class="content">
                    <span class="title title--large">{{ current_temp }}°</span>
                    <span class="description">{{ weather_condition }}</span>
                    <span class="label">{{ location }}</span>
                  </div>
                </div>
                
                <div class="table">
                  <div class="table__header">
                    <div class="table__row">
                      <div class="table__cell table__cell--header">Day</div>
                      <div class="table__cell table__cell--header">High</div>
                      <div class="table__cell table__cell--header">Low</div>
                      <div class="table__cell table__cell--header">Condition</div>
                    </div>
                  </div>
                  <div class="table__body">
                    {% for day in forecast %}
                    <div class="table__row">
                      <div class="table__cell">{{ day.name }}</div>
                      <div class="table__cell">{{ day.high }}°</div>
                      <div class="table__cell">{{ day.low }}°</div>
                      <div class="table__cell">{{ day.condition }}</div>
                    </div>
                    {% endfor %}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="title_bar">
          <img class="image" src="https://usetrmnl.com/images/plugins/weather-icon.svg" />
          <span class="title">Weather Dashboard</span>
          <span class="instance">{{ location }}</span>
        </div>
      </div>
    </div>
  </body>
</html>
```

## Conclusion

The TRMNL design system provides a comprehensive framework for creating visually consistent and functional templates for e-ink displays. By following the guidelines and utilizing the provided components, AI agents can efficiently build templates that deliver an optimal user experience while respecting the unique characteristics of e-ink technology.

For more detailed information on specific components or advanced features, refer to the official documentation at [https://usetrmnl.com/framework](https://usetrmnl.com/framework) and [https://docs.usetrmnl.com](https://docs.usetrmnl.com).
