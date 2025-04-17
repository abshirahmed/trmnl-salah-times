# Project Guidelines for Junie

## Project Overview

TRMNL Salah Times is a serverless application that displays Islamic prayer times, next prayer countdowns, and Hijri date information on TRMNL e-ink devices in an elegant, distraction-free format. The plugin is built with AWS Serverless architecture using TypeScript and connects to the Aladhan Prayer Times API to provide accurate prayer times worldwide.

### Key Features

- Display 5 daily prayer times plus sunrise
- Automatically identify and highlight the next prayer
- Show countdown until next prayer
- Display current Hijri (Islamic) date
- Support for worldwide locations
- Multiple prayer calculation methods
- Responsive templates for full-screen, half-screen, and quadrant layouts
- Complete OAuth installation flow for TRMNL plugins
- User configuration interface for location and preferences
- Clean uninstallation flow to remove user data when plugin is uninstalled

## Project Structure

The project follows a modular architecture with clear separation of concerns:

```
trmnl-salah-times/
├── .github/                     # GitHub configuration and workflows
├── docs/                        # Documentation
│   ├── prayer-times-plugin/     # Feature-specific documentation
│   ├── wiki/                    # User documentation
│   └── images/                  # Documentation images
├── src/                         # Source code
│   ├── clients/                 # API clients for external services
│   ├── controllers/             # Application logic controllers
│   ├── handlers/                # Lambda function handlers
│   ├── services/                # Business logic services
│   ├── templates/               # UI templates for different view sizes
│   └── utils/                   # Utility functions
├── tests/                       # Test files
│   ├── e2e/                     # End-to-end tests
│   └── unit/                    # Unit tests
├── serverless.yml               # Serverless Framework configuration
└── package.json                 # Dependencies and scripts
```

### Key Components

- **Handlers**: Process incoming requests, validate input, delegate to controllers/services
- **Controllers**: Orchestrate application logic and coordinate between handlers and services
- **Services**: Implement business logic and interact with external APIs/databases
- **Templates**: Define the UI for different view sizes (full, half, quadrant)

## Testing Guidelines

When working with this project, Junie should:

1. **Run tests to verify changes**: The project has comprehensive test coverage, and any changes should be verified by running the relevant tests.

2. **Test command**: Use `yarn test` to run all tests, or `yarn test:unit` for unit tests and `yarn test:e2e` for end-to-end tests.

3. **Test specific components**: To test specific components, use `yarn test path/to/test/file` or `yarn test:unit path/to/test/file`.

4. **Test edge cases**: Pay special attention to timezone edge cases, prayer time edge cases, and date boundary conditions.

5. **Verify test coverage**: Ensure that any new code has appropriate test coverage.

## Building the Project

Before submitting changes, Junie should:

1. **Build the project**: Use `yarn build` to compile TypeScript to JavaScript.

2. **Check for type errors**: Ensure there are no TypeScript errors by running `yarn type-check`.

3. **Lint the code**: Run `yarn lint` to check for code style issues.

## Code Style Guidelines

The project follows these code style principles:

1. **TypeScript Best Practices**:
   - Use strong typing with interfaces, type definitions, and enums
   - Use Zod for runtime validation
   - Avoid using the `any` type
   - Use readonly properties for immutable data

2. **Clean Code Principles**:
   - Use meaningful names that reflect purpose
   - Follow single responsibility principle
   - Keep functions small and focused
   - Don't repeat yourself (DRY)
   - Keep it simple (KISS)
   - Document complex logic with comments

3. **Error Handling**:
   - Use standardized error handling with consistent formats
   - Implement graceful degradation with fallback values
   - Validate all inputs with schema validation

4. **Documentation**:
   - Add JSDoc comments for functions
   - Document interfaces and types
   - Explain complex logic
   - Update README files for modules

## Modular Structure Philosophy

When making changes, Junie should respect the project's modular structure:

1. **Cohesion**: Keep related files together in their respective directories
2. **Discoverability**: Follow established naming conventions
3. **Modularity**: Maintain proper separation of concerns
4. **Maintainability**: Changes to a feature should only require modifying files in one location

## Related Documentation

For more detailed information, Junie can refer to:

- **README.md**: Project overview and setup instructions
- **docs/AI_AGENT_GUIDE.md**: Guide for AI agents working with this codebase
- **docs/PROJECT_STRUCTURE.md**: Overview of the codebase organization
- **docs/engineering-principles.md**: Guidelines for code quality and development practices
- **docs/prayer-times-plugin/technical/architecture.md**: Technical architecture details
