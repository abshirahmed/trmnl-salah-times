# AI Agent Guide for TRMNL Salah Times

This guide is designed to help AI agents (and human developers) effectively work with the TRMNL Salah Times codebase. It provides instructions, best practices, and examples for interacting with the project.

TRMNL Salah Times is a serverless application that displays Islamic prayer times, next prayer countdowns, and Hijri date information on TRMNL e-ink devices in an elegant, distraction-free format.

## Purpose of This Guide

- Provide clear instructions for AI agents to understand and navigate the codebase
- Establish consistent patterns for code generation and modification
- Ensure AI assistance aligns with the project's engineering principles
- Reduce onboarding time for new developers (human or AI)

## How AI Agents Should Approach Tasks

### 1. Understand the Project Context

Before making any changes:

- Review the [Project Structure](./PROJECT_STRUCTURE.md) to understand the codebase organization
- Familiarize yourself with the [Engineering Principles](./ENGINEERING_PRINCIPLES.md)
- Identify which part of the application your task relates to (handlers, services, controllers, etc.)

### 2. Follow the Established Patterns

The codebase follows consistent patterns:

- **Handlers**: Process incoming requests, validate input, delegate to controllers/services
- **Controllers**: Orchestrate application logic and coordinate between handlers and services
- **Services**: Implement business logic and interact with external APIs/databases
- **Templates**: Define the UI for different view sizes (full, half, quadrant)

### 3. Respect the Modular Structure

Each feature is organized as a self-contained module:

- Keep related files together in their respective directories
- Follow the established naming conventions
- Maintain proper separation of concerns

### 4. Prioritize Type Safety

TypeScript is used extensively:

- Define interfaces before implementation
- Use strong typing and avoid `any` type
- Leverage Zod schemas for input validation

### 5. Implement Proper Error Handling and Logging

- Use the logger utility for consistent logging
- Implement appropriate error handling
- Return meaningful error messages

## Best Practices for Prompt Engineering

When requesting AI assistance with this codebase, structure your prompts effectively:

### 1. Specify Goals Clearly

✅ **Good Example**:
```
Create a new handler for fetching Hijri date information that follows the same pattern as the prayer-times-handler.
```

❌ **Poor Example**:
```
Add Hijri date functionality.
```

### 2. Provide Necessary Context

✅ **Good Example**:
```
Update the prayer times calculation in src/services/prayer-times/calculatePrayerTimes.ts to support the new calculation method 15 (University of Islamic Sciences, Karachi).
```

❌ **Poor Example**:
```
Add support for the Karachi calculation method.
```

### 3. Reference Specific Files and Patterns

✅ **Good Example**:
```
Create a new utility function in src/utils/dateUtils.ts for formatting Hijri dates similar to the existing formatTime12h function.
```

❌ **Poor Example**:
```
Create a function to format Hijri dates.
```

### 4. Set Clear Expectations

✅ **Good Example**:
```
Implement unit tests for the new getUserSettings function following the pattern in tests/unit/services/user-settings/getUserSettings.test.ts.
```

❌ **Poor Example**:
```
Test the new function.
```

## Example Prompts for Common Tasks

### Code Generation

```
Generate a new handler called 'hijri-date-handler' that fetches the current Hijri date based on a location. Follow the pattern in src/handlers/prayer-times-handler/ with:
1. An index.ts file with the handler implementation
2. A schema.ts file for input validation
3. A README.md file documenting the handler
```

### Documentation

```
Create documentation for the new hijri-date-handler in the style of the existing handler documentation, explaining its purpose, parameters, and response format.
```

### Refactoring

```
Refactor the processTemplate function in src/controllers/plugin-markup/processTemplate.ts to use a more maintainable approach for template variable replacement. Consider using a mapping object instead of multiple string replacements.
```

### Bug Fixing

```
The prayer times calculation is incorrect when crossing the International Date Line. Review the calculatePrayerTimes function in src/services/prayer-times/calculatePrayerTimes.ts and fix the issue, ensuring proper timezone handling.
```

### Feature Implementation

```
Implement a new feature to allow users to receive prayer time notifications. This will require:
1. Adding a new field to the user_settings table
2. Updating the settings management interface
3. Creating a notification service
4. Adding a scheduled Lambda function to send notifications
```

## Related Documentation

- [Project Structure](./PROJECT_STRUCTURE.md) - Overview of the codebase organization
- [Engineering Principles](./engineering-principles.md) - Guidelines for code quality and development practices
- [Resource Integration Examples](./RESOURCE_INTEGRATION_EXAMPLES.md) - Examples for referencing files and resources
- [Technical Architecture](./prayer-times-plugin/technical/architecture.md) - Detailed information about the system architecture

## Conclusion

By following this guide, AI agents can provide more effective assistance with the TRMNL Salah Times codebase, ensuring that contributions align with the project's structure, patterns, and principles.

Refer to the [main README.md](../README.md) for an overview of the entire project and setup instructions.
