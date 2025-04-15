# Project Structure

This document provides an overview of the TRMNL Salah Times project structure, explaining key directories and their purposes.

## Overview

TRMNL Salah Times is a serverless application built with TypeScript that provides Islamic prayer times on TRMNL e-ink devices. The plugin displays prayer times, next prayer countdowns, and Hijri date information in an elegant, distraction-free format optimized for TRMNL's e-ink displays. The application follows a modular architecture with clear separation of concerns.

## Directory Structure

```
trmnl-salah-times/
├── .github/                     # GitHub configuration
│   └── workflows/               # GitHub Actions workflows
├── docs/                        # Documentation
│   ├── prayer-times-plugin/     # Feature-specific documentation
│   ├── wiki/                    # User documentation
│   └── images/                  # Documentation images
├── src/                         # Source code
│   ├── clients/                 # API clients
│   ├── controllers/             # Application logic controllers
│   ├── handlers/                # Lambda function handlers
│   ├── services/                # Business logic services
│   ├── templates/               # UI templates
│   └── utils/                   # Utility functions
├── tests/                       # Test files
│   ├── e2e/                     # End-to-end tests
│   └── unit/                    # Unit tests
├── serverless.yml               # Serverless Framework configuration
└── package.json                 # Dependencies and scripts
```

## Key Directories and Their Purposes

### Source Code (`src/`)

#### Handlers (`src/handlers/`)

Lambda function handlers that serve as entry points for the application's API endpoints. Each handler is organized as a self-contained module with:

- `index.ts` - Main handler implementation
- `schema.ts` - Zod schema for input validation
- `README.md` - Documentation

Key handlers include:
- `prayer-times-handler` - Serves prayer times data
- `installation-handler` - Handles plugin installation
- `plugin-markup-handler` - Generates HTML markup for the plugin
- `plugin-management-handler` - Serves the settings interface
- `save-settings-handler` - Processes settings submissions
- `uninstallation-handler` - Handles plugin uninstallation

#### Controllers (`src/controllers/`)

Orchestrate the flow of data and operations between handlers and services:

- `prayer-times/` - Process prayer times data
- `plugin-markup/` - Generate HTML markup for different view sizes
- `user-settings/` - Generate management interfaces and process settings

#### Services (`src/services/`)

Implement business logic and interact with external APIs and databases:

- `prayer-times/` - Fetch and calculate prayer times
- `user-settings/` - Manage user preferences
- `trmnl/` - Interact with TRMNL APIs

#### Clients (`src/clients/`)

API clients for external services:

- `prayer-times/` - Client for Aladhan Prayer Times API
- `supabase/` - Client for Supabase database
- `trmnl/` - Client for TRMNL API

#### Templates (`src/templates/`)

UI templates for the TRMNL plugin:

- `trmnl-plugin/markup.html` - Full-screen view
- `trmnl-plugin/half-view-markup.html` - Half-screen vertical view
- `trmnl-plugin/half-horizontal-view-markup.html` - Half-screen horizontal view
- `trmnl-plugin/quadrant-view-markup.html` - Quadrant view

#### Utils (`src/utils/`)

Utility functions used throughout the application:

- `dateUtils.ts` - Date and time utilities
- `logger.ts` - Logging utility
- `middify.ts` - Lambda middleware utility

### Tests (`tests/`)

Contains unit and end-to-end tests for the application:

- `unit/` - Unit tests for individual components
- `e2e/` - End-to-end tests for API endpoints

### Documentation (`docs/`)

Project documentation organized by feature:

- `prayer-times-plugin/` - Feature-specific documentation
  - `requirements/` - Product requirements
  - `design/` - UI design documentation
  - `technical/` - Technical architecture
- `wiki/` - User documentation
- `images/` - Documentation images
- `engineering-principles.md` - Engineering principles and best practices

## Where to Find Important Resources

### Configuration

- `serverless.yml` - Serverless Framework configuration
- `package.json` - Dependencies and scripts

### API Endpoints

API endpoints are defined in `serverless.yml` under the `functions` section, with implementations in the corresponding handler directories.

### Database Schema

Database types are defined in `src/clients/supabase/database.types.ts`.

### Templates

UI templates are located in `src/templates/trmnl-plugin/` with different versions for various screen sizes.

## Modular Structure Philosophy

The project follows a modular structure where each feature is organized as a self-contained unit. This provides several benefits:

1. **Cohesion**: All files related to a specific feature are grouped together
2. **Discoverability**: Easy to find all components of a feature
3. **Modularity**: Each feature is a self-contained unit
4. **Maintainability**: Changes to a feature only require modifying files in one location

When adding new features or making changes, follow this modular approach to maintain the codebase's organization and clarity.

## Related Documentation

- [AI Agent Guide](./AI_AGENT_GUIDE.md) - Instructions for AI agents working with this codebase
- [Engineering Principles](./engineering-principles.md) - Guidelines for code quality and development practices
- [Resource Integration Examples](./RESOURCE_INTEGRATION_EXAMPLES.md) - Examples for referencing files and resources
- [Technical Architecture](./prayer-times-plugin/technical/architecture.md) - Detailed information about the system architecture
- [Main README](../README.md) - Project overview and setup instructions
