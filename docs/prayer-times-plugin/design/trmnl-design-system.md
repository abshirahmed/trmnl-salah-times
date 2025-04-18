# TRMNL Design System Documentation

## Overview

TRMNL is a design system optimized for 1-bit rendering (black and white only displays). It creates the illusion of grayscale through carefully designed dither patterns and provides a comprehensive set of components and utilities for building consistent interfaces.

The system is designed with a minimalist aesthetic that embraces the constraints of 1-bit displays rather than fighting against them. This approach results in clean, highly legible interfaces that maintain visual hierarchy and user experience despite the limited color palette. The system's name "TRMNL" evokes terminal interfaces and vintage computing, while its implementation leverages modern web technologies.

The design system is structured to promote:
- **Consistency** across interfaces through standardized components
- **Accessibility** with high contrast and clear visual hierarchy
- **Performance** by embracing technical constraints as design features
- **Scalability** through modular components that can be combined in various ways
- **Developer experience** with intuitive class naming and documentation

## 1. Utilities

The utilities section provides the fundamental building blocks of the design system. These low-level tools handle visual treatments, spacing, and sizing that serve as the foundation for more complex components.

### Background
- Creates the illusion of grayscale using dither patterns
- Uses `bg-{color}` utility classes
- Available values: black, gray-1 through gray-7, and white
- **Additional info**: The dither patterns are carefully calibrated to create perceptual grayscale when viewed from a distance, similar to how newspaper images work. Each pattern is optimized for legibility and consistent visual weight.
- **Best practice**: Use lighter gray values (gray-5 through gray-7) for larger areas to reduce visual density and reserve darker grays for emphasis and focus areas.

### Border
- Creates grayscale borders using dither patterns
- Horizontal borders: `border--h-{n}` (n from 1-7)
- Vertical borders: `border--v-{n}` (n from 1-7)
- **Additional info**: Unlike traditional borders that use solid colors, TRMNL's borders use alternating patterns of black and white pixels to create the illusion of varying intensities.
- **Best practice**: Use lighter borders (1-3) for subtle separation and darker borders (5-7) for primary content divisions. Combine horizontal and vertical borders to create grid-like structures.

### Spacing
- Controls margins and padding with fixed sizes
- Margin utilities: `m--{size}`, `mt--{size}`, `mr--{size}`, `mb--{size}`, `ml--{size}`, `mx--{size}`, `my--{size}`
- Padding utilities: `p--{size}`, `pt--{size}`, `pr--{size}`, `pb--{size}`, `pl--{size}`, `px--{size}`, `py--{size}`
- **Additional info**: The spacing system uses a consistent scale that maintains proper visual rhythm across interfaces. The naming convention follows the familiar pattern of direction-size.
- **Best practice**: Use consistent spacing values throughout your interface to maintain rhythm. Prefer the pre-defined spacing values over custom ones to ensure consistency across components.

### Gap
- Provides consistent spacing between elements using CSS gap property
- Standard gaps: `gap--xsmall`, `gap`, `gap--medium`, `gap--large`, `gap--xlarge`, `gap--xxlarge`
- Distribution modifiers: `gap--space-between`
- Custom values: `gap--[Npx]`
- **Additional info**: The gap system is particularly useful for grid and flex layouts, providing a modern alternative to margins for spacing between elements.
- **Best practice**: Use `gap--space-between` when you need elements to span the full width of a container with equal spacing. For most other cases, use the standard gap values to maintain design consistency.

### Size
- Controls width and height dimensions
- Fixed sizes: `w/h--{size}` with values from 0 to 96
- Responsive sizes: `w/h--full`, `w/h--auto`
- **Additional info**: The size system provides both precise pixel values and fluid responsive options. The numeric values correspond to a specific pixel dimension, creating a consistent sizing scale.
- **Best practice**: Use fixed sizes for elements that should maintain consistent dimensions across different contexts. Use responsive sizes for elements that should adapt to their container or content.

### Image
- Applies dithering techniques for 1-bit rendering
- Usage: `image-dither` class
- **Additional info**: The image dithering process converts standard grayscale or color images into optimized black and white patterns that preserve visual information while working within the constraints of 1-bit displays.
- **Best practice**: Use high contrast images with clear subjects for best results. Avoid images with fine details that might be lost in the dithering process. Test images at different sizes as dithering effectiveness can vary based on image dimensions.

## 2. Base

The Base section provides structural components that form the foundation of layouts and interface organization. These components define the macro-level structure of your application, controlling how content is arranged and presented.

### View
- Provides container structure for displaying content
- Use `view view--full` for full-width view
- Also available: `view--half_horizontal`, `view--half_vertical`, `view--quadrant`
- Optional title bar for context
- Screen container modifier: `screen--no-bleed`
- **Additional info**: The View component acts as the primary container for your content, creating a consistent framing system. The different size variants allow for flexible layout compositions, especially when combined with Mashup layouts.
- **Best practice**: Start your interface design by deciding on the appropriate View size, then build your content structure within it. Always consider how your View might be composed with others in a Mashup layout.

### Layout
- Flexible containers for organizing content horizontally or vertically
- Base structure:
    - Row layout: `layout layout--row`
    - Column layout: `layout layout--col`
- Alignment modifiers: `layout--left`, `layout--center-x`, `layout--right`, `layout--top`, `layout--center-y`, `layout--bottom`, `layout--center`
- Stretch modifiers: `layout--stretch`, `layout--stretch-x`, `layout--stretch-y`
- Child element stretch: `stretch`, `stretch-x`, `stretch-y`
- **Additional info**: The Layout system uses Flexbox principles but with a simplified API that focuses on the most common layout needs. This system is ideal for one-dimensional layouts (either row or column).
- **Best practice**: Choose the appropriate base direction first (row or column), then apply alignment modifiers. Use stretch modifiers when you want children to fill available space. For more complex two-dimensional layouts, consider using Grid or Columns instead.

### Title Bar
- Consistent header for terminal-like interfaces
- Contains icon, title, and optional instance label
- Basic usage: `title_bar` class with `image`, `title`, and optional `instance` elements
- **Additional info**: The Title Bar component provides users with context about the current view and maintains a consistent navigation pattern. The instance label is particularly useful for differentiating between multiple instances of the same plugin or view.
- **Best practice**: Keep titles concise and descriptive. Use the instance label to provide additional context about the environment or configuration of the current view (e.g., "Production", "Testing", "User Dashboard").

### Columns
- Simple way to create balanced column layouts
- Basic structure: `columns` container with `column` children
- **Additional info**: The Columns system provides a simpler alternative to the Grid system when you need basic column layouts with equal widths. It automatically handles spacing and responsive behavior.
- **Best practice**: Use Columns when you need a straightforward multi-column layout with equal widths. For more complex layouts with varying column widths or specific positioning, use the Grid system instead.

### Mashup
- Grid-based containers for assembling multiple plugin views
- Layout options:
    - `mashup--1Lx1R`: 1 left, 1 right
    - `mashup--1Tx1B`: 1 top, 1 bottom
    - `mashup--1Lx2R`: 1 left, 2 right
    - `mashup--2Lx1R`: 2 left, 1 right
    - `mashup--2Tx1B`: 2 top, 1 bottom
    - `mashup--1Tx2B`: 1 top, 2 bottom
    - `mashup--2x2`: 2 x 2 grid
- **Additional info**: The Mashup system is designed for composing multiple plugin views into a unified interface. Each layout option provides a different arrangement of views, allowing for flexible composition of content.
- **Best practice**: Choose your Mashup layout based on the relationship between the views. Use left-right layouts (`1Lx1R`) for complementary content, top-bottom layouts (`1Tx1B`) for sequential information, and grid layouts (`2x2`) for dashboard-like presentations of related data.

### Grid
- Flexible system for column-based and row-based layouts
- Define grid:
    - Column count: `grid--cols-{number}`
    - Column spans: `col--span-{number}`
- Column layouts: `col` with positioning (`col--start`, `col--center`, `col--end`)
- Row layouts: `row` with positioning (`row--start`, `row--center`, `row--end`)
- **Additional info**: The Grid system implements a modern CSS Grid layout with a simplified API. It supports both explicit column definitions and flexible column spans, allowing for complex layout arrangements.
- **Best practice**: Start by defining your grid structure with `grid--cols-{number}`, then use column spans to control how elements flow within the grid. For responsive designs, consider how your grid will adapt to different container sizes and adjust column counts accordingly.

### Flex
- Utility classes for creating flexible layouts using Flexbox
- Base structure:
    - Row direction: `flex flex--row`
    - Column direction: `flex flex--col`
- Alignment modifiers:
    - Row: `flex--left`, `flex--center-x`, `flex--right`, `flex--top`, `flex--center-y`, `flex--bottom`
    - Column: Same as row with appropriate directional effects
- Stretch modifiers: `flex--stretch`, `flex--stretch-x`, `flex--stretch-y`
- Individual item control: `stretch`, `stretch-x`, `stretch-y`, `no-shrink`
- **Additional info**: The Flex system provides direct access to Flexbox capabilities with a consistent naming convention. It's particularly useful for aligning items, distributing space, and creating adaptive layouts.
- **Best practice**: Use Flex for one-dimensional layouts where you need precise control over alignment and space distribution. The `no-shrink` utility is particularly valuable for preventing important elements from being compressed when space is limited.

## 3. Typography

The Typography section provides components for controlling text presentation, from basic alignment to specialized text handling. These components are designed to create clear visual hierarchy and ensure readability on 1-bit displays.

### Text
- Controls text alignment and grayscale shading
- Text shading: `text--black`, `text--gray-1` through `text--gray-7`, `text--white`
- Text alignment: `text--left`, `text--center`, `text--right`, `text--justify`
- **Additional info**: The Text system uses the same dithering techniques as backgrounds to create the illusion of grayscale text. This allows for subtle emphasis and de-emphasis of text content without relying on color.
- **Best practice**: Use darker shades for primary content and lighter shades for secondary information. Avoid using justified text (`text--justify`) for narrow columns as it can create uneven spacing between words.

### Title
- Consistent text headings with different size variants
- Default title: `title` class
- Small title: `title title--small`
- **Additional info**: Titles are designed to stand out from regular text with greater visual weight. They maintain legibility even at smaller sizes thanks to optimized letter spacing and font weight.
- **Best practice**: Use titles sparingly to mark major sections of your interface. For subsections, consider using the small title variant to maintain hierarchy while conserving vertical space.

### Value
- Displays numerical and textual values with consistent formatting
- Size variants:
    - `value--xxsmall`
    - `value--xsmall`
    - `value--small`
    - `value` (default)
    - `value--large`
    - `value--xlarge`
    - `value--xxlarge`
    - `value--xxxlarge`
- Numerical display: `value--tnums` for tabular numbers
- **Additional info**: The Value component is specifically optimized for displaying data, especially numerical information. The tabular numbers feature (`value--tnums`) ensures that numbers align properly when stacked vertically, as all digits have the same width.
- **Best practice**: Use larger size variants for KPIs and important metrics, and smaller sizes for supporting data. Always use tabular numbers (`value--tnums`) when displaying financial data or when numbers need to align vertically.

### Label
- Displays text labels with different visual treatments
- Default labels: `label`
- Variants: `label--outline`, `label--underline`, `label--gray-out`, `label--inverted`
- Size modifier: `label--small`
- **Additional info**: Labels provide contextual information and categorization. The different visual treatments allow for varying levels of emphasis while maintaining the 1-bit aesthetic.
- **Best practice**: Use the default label style for primary categories, outline for secondary information, underline for interactive elements, gray-out for disabled states, and inverted for high-contrast needs. The small modifier works well in space-constrained areas.

### Description
- Standardized way to display descriptive text
- Basic usage: `description` class
- **Additional info**: The Description component is optimized for body text and longer explanations. It uses a balanced font size and line height to maximize readability for extended content.
- **Best practice**: Use description text for explanatory content that supports the main interface elements. Keep descriptions concise and consider using the Clamp component when space is limited.

### Clamp
- Truncates text content with ellipsis after specified lines
- Single line: `clamp--1`
- Multi-line: `clamp--{n}` (n from 1 to 35)
- **Additional info**: The Clamp system uses CSS line-clamp properties to control text overflow, ensuring consistent truncation across browsers. This is particularly useful for handling variable-length content in fixed-height containers.
- **Best practice**: Use single-line clamping for headings, titles, and labels. Use multi-line clamping for descriptions and body text. When choosing the number of lines, consider the context and available space in your layout.

## 4. Components

The Components section provides higher-level UI elements that combine multiple base elements and utilities to create complex, reusable interface patterns. These components are designed to handle common UI patterns while maintaining the 1-bit aesthetic.

### Item
- Flexible container for displaying content with optional metadata
- Variants:
    - With meta and index: `item` with `meta` containing `index` and `content`
    - With meta only: `item` with `meta` and `content`
    - Simple: `item` with `content` only
- **Additional info**: The Item component is a versatile building block for creating lists, feeds, and content collections. Its flexible structure accommodates various content types while maintaining consistent spacing and alignment.
- **Best practice**: Use the indexed variant for ordered lists where sequence matters. Use the meta-only variant when you need to attach metadata or icons to content without numbering. The simple variant works well for basic content that doesn't require additional context.

### Table
- Structured data presentation with consistent styling
- Default table: `table` class
- Size variant: `table--condensed`
- **Additional info**: The Table component is designed specifically for displaying structured data in rows and columns. Its styling ensures proper alignment of data within cells while maintaining the 1-bit aesthetic.
- **Best practice**: Use tables only for truly tabular data where relationships between rows and columns are important. For simpler lists, consider using the Item component instead. The condensed variant is particularly useful when displaying large datasets with limited vertical space.

### Chart
- Displays data visualizations optimized for 1-bit rendering
- Supports various chart types (line, gauge, etc.)
- Uses JavaScript libraries like Highcharts and Chartkick
- Requires disabling animation effects for proper rendering
- **Additional info**: The Chart system adapts standard visualization techniques to work within the constraints of 1-bit rendering. It uses patterns, line weights, and spacing to create clear distinctions between data series without relying on color.
- **Best practice**: Choose chart types that work well with limited visual differentiation—line charts, bar charts, and gauges are particularly effective. Avoid pie charts and complex visualizations that traditionally rely heavily on color for data separation. Always disable animation effects to ensure proper rendering in the 1-bit environment.

## 5. Modulations

The Modulations section provides advanced behavioral controls that dynamically adjust content presentation based on context. These features enhance the user experience by automatically handling common display challenges like overflow, formatting, and sizing.

### Overflow
- Handles layouts exceeding a height limit
- Basic usage: `data-list-limit="true"` attribute
- Configuration options:
    - `data-list-max-height`: Sets custom max height (in pixels)
    - `data-list-hidden-count="true"`: Displays count of hidden items
    - `data-list-max-columns`: Specifies maximum number of columns
- **Additional info**: The Overflow system automatically manages content that exceeds the available vertical space, providing a clean solution for variable-length content. Instead of traditional scrolling, which can be challenging in 1-bit interfaces, it intelligently truncates content with an indicator of hidden items.
- **Best practice**: Set an appropriate maximum height based on your layout context. Enable the hidden count feature when users need to know how much content is not visible. Use the multi-column feature for dense lists where horizontal space is available.

### Format Value
- Formats numeric values to fit containers while maintaining readability
- Basic usage: `data-value-format="true"` attribute
- Supports currency symbols, abbreviations, and regional formats
- Regional formats: `data-value-locale` attribute (e.g., "en-US", "de-DE", "fr-FR")
- **Additional info**: The Format Value system automatically applies appropriate formatting to numbers based on their magnitude and available space. It maintains prefix symbols (like currency) while intelligently handling the numeric portion.
- **Best practice**: Always use this system when displaying financial data or large numbers. Set the appropriate locale attribute when targeting users from specific regions to ensure numbers are formatted according to their expectations. Combine with the Fit Value system for even better control over number display.

### Fit Value
- Adjusts font size, weight, and line height to fit containers
- Basic usage: `data-value-fit="true"` attribute
- For text content, specify `data-value-fit-max-height` (in pixels)
- **Additional info**: The Fit Value system dynamically adjusts text properties to ensure content fits within its container while remaining legible. This is particularly useful for displaying variable-length content in fixed-size containers or for creating responsive typographic treatments.
- **Best practice**: Use this system for hero elements like KPIs or important metrics where the value may vary widely but should always be prominently displayed. For text content, always specify a maximum height to prevent excessive shrinking that could impact readability.

## Key Design Principles

1. **Optimized for 1-bit rendering**: Uses dither patterns to create the illusion of grayscale on black and white displays. This approach embraces constraints as a design feature rather than a limitation, resulting in a distinctive aesthetic that balances minimalism with visual depth.

2. **Consistent spacing and typography**: Provides standardized components for maintaining visual hierarchy. The system uses careful spacing scales and typographic choices to create clear distinction between different content types while maintaining an overall harmonious appearance.

3. **Flexible layouts**: Multiple layout systems (Grid, Flex, Layout) for different needs. Each system is designed for specific layout challenges, from simple one-dimensional arrangements to complex responsive grids, giving developers the right tool for each situation.

4. **Responsive behaviors**: Automatic text fitting and overflow management. These intelligent adaptations ensure content remains legible and accessible across different viewport sizes and content lengths, maintaining design integrity without developer intervention.

5. **Modular composition**: Components can be combined and nested for complex interfaces. The system is built on a foundation of composable parts that work together seamlessly, allowing for complexity to emerge from simple building blocks.

6. **Performance-focused**: The 1-bit rendering approach inherently reduces rendering complexity and bandwidth requirements. This results in interfaces that load quickly and render efficiently, even on less powerful devices.

7. **Accessibility-driven**: High contrast and clear visual hierarchy make interfaces more accessible to users with visual impairments. The system's design choices naturally promote good accessibility practices by emphasizing clarity and distinction.

## Usage Notes & Best Practices

- **Start with structure**: Begin by deciding on the appropriate View and Layout components before adding content. This top-down approach ensures consistent organization across interfaces.

- **Embrace the aesthetic**: The 1-bit design is most effective when you work with its constraints rather than against them. Avoid trying to simulate complex color effects—instead, use patterns, spacing, and typography to create visual interest.

- **Test on target devices**: Always test your interfaces on actual 1-bit displays or accurate simulations to ensure dithering patterns create the intended visual effect.

- **Performance considerations**: When creating charts, ensure animations are disabled for proper rendering. Animation effects can cause incomplete captures when using TRMNL's screenshot rendering service.

- **Numerical data display**: For numeric displays, always use tabular numbers (`value--tnums`) when vertical alignment matters, particularly in financial data or statistics.

- **Content management**: Utilize overflow management and text fitting for variable-content areas. These features ensure your layouts remain stable regardless of content length.

- **Consistent spacing**: Maintain rhythm throughout your interfaces by using the standard spacing and gap utilities rather than custom values whenever possible.

- **Component composition**: Combine simpler components to build complex interfaces rather than creating custom one-off solutions. This promotes consistency and makes maintenance easier.

- **Typography hierarchy**: Establish a clear typographic hierarchy using the various text components. Generally, limit your interface to 3-4 levels of hierarchy to maintain clarity.

- **Progressive enhancement**: Consider how your interface degrades gracefully if certain JavaScript features aren't available. The core layout and typography components should function without JS dependencies.