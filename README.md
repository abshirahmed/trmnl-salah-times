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
- 🔐 Complete OAuth installation flow for TRMNL plugins
- ⚙️ User configuration interface for location and preferences
- 🧹 Clean uninstallation flow to remove user data when plugin is uninstalled

## Architecture

The solution uses:

- **Frontend**: TRMNL Private Plugin with custom HTML/Liquid templates that follow TRMNL's design system
- **Backend**: AWS Serverless (Lambda + API Gateway) in eu-west-2 region
- **Database**: Supabase for storing user settings
- **Language**: TypeScript
- **Date Handling**: date-fns and date-fns-tz for timezone-aware date operations
- **Data Source**: [Aladhan Prayer Times API](https://aladhan.com/prayer-times-api)

## TRMNL Plugin Lifecycle

The plugin implements the complete TRMNL plugin lifecycle:

### Installation Flow

1. **Installation Request**: When a user installs the plugin, TRMNL sends a request to the installation endpoint with a token and callback URL.
2. **Token Exchange**: The server exchanges the token for an access token using the TRMNL OAuth endpoint.
3. **Redirect**: The server redirects the user back to TRMNL using the callback URL.
4. **Success Webhook**: TRMNL sends a success webhook to the server with the user's information.
5. **Plugin Configuration**: The user can configure their prayer times settings through the plugin management interface.
6. **Markup Generation**: The server provides the appropriate markup template based on the view size.

### Uninstallation Flow

1. **Uninstallation Webhook**: When a user uninstalls the plugin, TRMNL sends a webhook to the uninstallation endpoint with the user's UUID.
2. **Data Cleanup**: The server deletes the user's settings from the database.
3. **Confirmation**: The server returns a success response to TRMNL.

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
│   │   ├── installation-handler/  # Installation handler module
│   │   │   ├── index.ts          # Handler implementation
│   │   │   ├── schema.ts         # Validation schema
│   │   │   └── README.md         # Handler documentation
│   │   ├── installation-success-handler/  # Installation success handler module
│   │   │   ├── index.ts          # Handler implementation
│   │   │   ├── schema.ts         # Validation schema
│   │   │   └── README.md         # Handler documentation
│   │   ├── plugin-markup-handler/  # Plugin markup handler module
│   │   │   ├── index.ts          # Handler implementation
│   │   │   ├── schema.ts         # Validation schema
│   │   │   └── README.md         # Handler documentation
│   │   ├── plugin-management-handler/  # Plugin management handler module
│   │   │   ├── index.ts          # Handler implementation
│   │   │   ├── schema.ts         # Validation schema
│   │   │   └── README.md         # Handler documentation
│   │   ├── save-settings-handler/  # Save settings handler module
│   │   │   ├── index.ts          # Handler implementation
│   │   │   ├── schema.ts         # Validation schema
│   │   │   └── README.md         # Handler documentation
│   │   ├── uninstallation-handler/  # Uninstallation handler module
│   │   │   ├── index.ts          # Handler implementation
│   │   │   ├── schema.ts         # Validation schema
│   │   │   └── README.md         # Handler documentation
│   │   └── index.ts             # Re-export for backward compatibility
│   ├── services/                # Business logic
│   │   └── prayer-times/        # Prayer times service
│   ├── templates/                # Template files
│   │   └── trmnl-plugin/         # TRMNL plugin templates
│   │       ├── markup.html              # Full-screen plugin template
│   │       ├── half-view-markup.html    # Half-screen plugin template
│   │       ├── quadrant-view-markup.html # Quadrant plugin template
│   │       └── README.md                # Plugin-specific documentation
│   └── utils/                   # Utility functions
│       ├── dateUtils.ts                    # Date and time utilities using date-fns
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
4. Supabase Account
5. TRMNL Device with Developer Edition add-on

### TRMNL Plugin Setup

1. Create a new plugin in the TRMNL dashboard at https://usetrmnl.com/plugins/my/new
2. Configure the plugin with the following information:
   - **Name**: Salah Times
   - **Description**: Islamic prayer times & Hijri date for TRMNL
   - **Icon**: Upload a 40x40 PNG icon
   - **Installation URL**: `https://your-api-gateway-url/install`
   - **Installation Success Webhook URL**: `https://your-api-gateway-url/installation-success`
   - **Plugin Management URL**: `https://your-api-gateway-url/manage`
   - **Plugin Markup URL**: `https://your-api-gateway-url/plugin-markup`

3. Set up a Supabase project:
   - Create a new project in Supabase
   - Create a table called `user_settings` with the following schema:
     ```sql
     CREATE TABLE user_settings (
       id SERIAL PRIMARY KEY,
       uuid UUID NOT NULL UNIQUE,
       city TEXT NOT NULL,
       country TEXT NOT NULL,
       method INTEGER NOT NULL DEFAULT 2,
       "timeFormat" TEXT NOT NULL DEFAULT '24h',
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
       updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
     );
     ```
   - Get your Supabase URL and service key from the project settings

4. Set the environment variables for your TRMNL plugin and Supabase credentials:
   ```
   export TRMNL_CLIENT_ID=your-client-id
   export TRMNL_CLIENT_SECRET=your-client-secret
   export SUPABASE_URL=your-supabase-url
   export SUPABASE_SERVICE_KEY=your-supabase-service-key
   ```

5. Add the following secrets to your GitHub repository for CI/CD:
   - `AWS_ACCOUNT_ID`: Your AWS account ID
   - `TRMNL_CLIENT_ID`: Your TRMNL plugin client ID
   - `TRMNL_CLIENT_SECRET`: Your TRMNL plugin client secret
   - `SUPABASE_URL`: Your Supabase URL
   - `SUPABASE_SERVICE_KEY`: Your Supabase service key

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
