# TRMNL Salah Prayer Times Plugin

A beautiful, serverless Islamic prayer times plugin for TRMNL e-ink devices, designed according to TRMNL's design system guidelines.

## Overview

This project creates a custom plugin for [TRMNL](https://usetrmnl.com) e-ink display devices that shows Islamic prayer times (Salah), next prayer countdowns, and Hijri date information in an elegant, distraction-free format.

Built with AWS Serverless architecture using TypeScript, the plugin connects to the Aladhan Prayer Times API to provide accurate prayer times worldwide.

## Features

- 📅 Display 5 daily prayer times plus sunrise
- 🔄 Automatically identify and highlight the next prayer
- ⏱️ Show countdown until next prayer
- 🌙 Display current Hijri (Islamic) date
- 🌎 Support for worldwide locations
- 🧮 Multiple prayer calculation methods
- 🔌 Easy setup via TRMNL interface
- 📱 Responsive templates for full-screen, half-screen, and quadrant layouts

## Architecture

The solution uses:

- **Frontend**: TRMNL Private Plugin with custom HTML/Liquid templates that follow TRMNL's design system
- **Backend**: AWS Serverless (Lambda + API Gateway) in eu-west-2 region
- **Language**: TypeScript
- **Data Source**: [Aladhan Prayer Times API](https://aladhan.com/prayer-times-api)

## Project Structure

```
trmnl-salah-times/
├── .github/                     # GitHub configuration
│   └── workflows/               # GitHub Actions workflows
│       └── build-and-deploy.yml  # Build and Deploy workflow configuration
├── docs/                        # Documentation
│   ├── prayer-times-plugin/      # Prayer Times Plugin documentation
│   │   ├── requirements/         # Requirements documentation
│   │   ├── design/               # Design documentation
│   │   └── technical/            # Technical documentation
│   └── README.md                 # Documentation overview
├── src/                         # TypeScript source files
│   ├── clients/                 # API clients
│   ├── handlers/                # Lambda handlers
│   │   ├── prayer-times-handler/  # Prayer times handler module
│   │   │   ├── index.ts          # Handler implementation
│   │   │   ├── schema.ts         # Validation schema
│   │   │   └── README.md         # Handler documentation
│   │   └── index.ts             # Re-export for backward compatibility
│   ├── services/                # Business logic
│   │   └── prayer-times/        # Prayer times service
│   └── utils/                   # Utility functions
│       ├── calculateTimeUntilNextPrayer.ts  # Time calculation utility
│       ├── convertTo24Hour.ts              # Time format utility
│       ├── logger.ts                       # Logging utility
│       └── middify.ts                      # Lambda middleware utility
├── tests/                       # Test files
│   ├── e2e/                     # End-to-end tests
│   │   └── handlers/             # Handler E2E tests
│   └── unit/                    # Unit tests
│       ├── handlers/             # Handler unit tests
│       │   └── prayer-times-handler/  # Prayer times handler tests
│       │       ├── handler.test.ts  # Handler tests
│       │       └── schema.test.ts   # Schema tests
│       ├── services/             # Service unit tests
│       └── utils/                # Utility unit tests
├── trmnl-plugin/                # TRMNL plugin templates
│   ├── markup.html              # Full-screen plugin template
│   ├── half-view-markup.html    # Half-screen plugin template
│   ├── quadrant-view-markup.html # Quadrant plugin template
│   └── README.md                # Plugin-specific documentation
├── package.json                 # Dependencies and scripts
├── serverless.yml               # Serverless configuration
└── README.md                    # Project overview
```

### Folder Structure Philosophy

The project follows a modular structure where each handler is organized as a self-contained module:

- **Handler Modules**: Each handler has its own directory containing:
  - Implementation file (e.g., `index.ts`)
  - Validation schema (e.g., `schema.ts`)
  - Documentation (e.g., `README.md`)

- **Services**: Shared business logic that can be used by multiple handlers

This structure provides several benefits:

1. **Cohesion**: All files related to a specific feature are grouped together
2. **Discoverability**: Easy to find all components of a feature
3. **Modularity**: Each handler is a self-contained unit
4. **Maintainability**: Changes to a feature only require modifying files in one location

## Getting Started

### Prerequisites

1. Node.js 20.x or later
2. Serverless Framework CLI
3. AWS Account
4. TRMNL Device with Developer Edition add-on

### Backend Setup

1. Install dependencies:
   ```
   yarn install
   ```
2. Deploy to AWS:
   ```
   yarn serverless:deploy
   ```

   After deployment, you'll receive an API Gateway URL with the endpoint `/prayer-times` that you'll use in the TRMNL plugin setup.

### CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment via the "Build and Deploy" workflow:

- **Continuous Integration**: All branch pushes and PRs to main are automatically tested, linted, and type-checked
- **Continuous Deployment**: Successful builds on the main branch are automatically deployed to AWS (production stage)

To set up the CI/CD pipeline, you need to add the following secrets to your GitHub repository:

- `AWS_ACCESS_KEY_ID`: Your AWS access key ID
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key

### TRMNL Plugin Setup

1. Log in to your TRMNL account
2. Create a new Private Plugin
3. Configure it to poll your API Gateway endpoint (`{api-gateway-url}/prayer-times?city={city}&country={country}&method={method}`)
   - Required parameters: `city`, `country`
   - Optional parameter: `method` (calculation method, defaults to 2/ISNA)
4. Copy the appropriate template from `trmnl-plugin/` directory based on your desired layout:
   - `markup.html` for full-screen view
   - `half-view-markup.html` for half-screen view
   - `quadrant-view-markup.html` for quadrant view
5. Add to your TRMNL playlists

## TRMNL Design System Implementation

The plugin templates follow TRMNL's design system guidelines for optimal e-ink display:

- Using proper TRMNL components like `item`, `layout`, and `title_bar`
- Implementing appropriate typography hierarchy with `title`, `label`, and `value` classes
- Utilizing highlighting and emphasis for improved user experience
- Creating adaptive layouts for different screen sizes
- Optimizing for e-ink display with high contrast and minimal graphics

## Documentation

See the [Product Requirements Document](./docs/prayer-times-plugin/requirements/product-requirements.md) for detailed project requirements and specifications.

## License

MIT

## Acknowledgements

- [Aladhan Prayer Times API](https://aladhan.com/prayer-times-api) for providing the prayer time data
- [TRMNL](https://usetrmnl.com) for creating an innovative e-ink dashboard and excellent design system
