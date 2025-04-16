# Engineering Principles

This document outlines the engineering principles and best practices followed in the TRMNL Salah Times project. These principles guide our development process and help maintain code quality, consistency, and maintainability.

## Code Organization

### Modular Structure

We organize our codebase into a modular structure where each feature or component is self-contained:

1. **Handlers**: Each Lambda handler is organized as a self-contained module with its own:
   - Implementation file (`index.ts`)
   - Validation schema (`schema.ts`)
   - Documentation (`README.md`)
   - Unit and integration tests

2. **Services**: Business logic is separated into service modules that:
   - Focus on a single responsibility
   - Can be reused across different handlers
   - Are properly typed with TypeScript
   - Include comprehensive error handling
   - Have dedicated type definition files

3. **Controllers**: Business logic orchestration layer that:
   - Coordinates between handlers and services
   - Handles data transformation
   - Manages error handling and logging
   - Provides a clean API for handlers

4. **Utilities**: Common utilities are centralized and shared across the application:
   - Date and time handling with timezone support
   - Logging with proper context
   - Error handling with standardized formats
   - Middleware for AWS Lambda functions

This structure provides several benefits:
- **Cohesion**: All files related to a specific feature are grouped together
- **Discoverability**: Easy to find all components of a feature
- **Modularity**: Each component is a self-contained unit
- **Maintainability**: Changes to a feature only require modifying files in one location
- **Testability**: Components can be tested in isolation

## Code Quality

### TypeScript Best Practices

1. **Strong Typing**: We use TypeScript's type system extensively:
   - Interfaces for API requests and responses
   - Type definitions for external API responses
   - Enums for fixed sets of values
   - Generics for reusable components
2. **Zod Schema Validation**: Use Zod for runtime validation of:
   - API request parameters
   - Configuration objects
   - External API responses
3. **Avoid `any` Type**: Use specific types or generics instead of `any`
4. **Readonly Properties**: Use readonly for immutable data

### Clean Code Principles

1. **Meaningful Names**: Use descriptive names that reflect purpose
2. **Single Responsibility**: Each function or class has one purpose
3. **Small Functions**: Keep functions focused and manageable
4. **DRY (Don't Repeat Yourself)**: Abstract common functionality
5. **KISS (Keep It Simple, Stupid)**: Prefer simple solutions
6. **Comments**: Document complex logic and business rules

## Error Handling

1. **Standardized Error Handling**:
   - Consistent error response format
   - Error types for different scenarios
   - Proper error logging with context
2. **Graceful Degradation**:
   - Fallback values for missing data
   - Default settings when user preferences unavailable
   - Timezone fallback to UTC
3. **Input Validation**:
   - Schema validation for all inputs
   - Parameter sanitization
   - Type checking at runtime

## Testing

1. **Comprehensive Test Coverage**:
   - Unit tests for business logic
   - Integration tests for API endpoints
   - Schema validation tests
   - Time handling tests across timezones
2. **Test Organization**:
   - Tests mirror source code structure
   - Shared test utilities and fixtures
   - Clear test descriptions
3. **Edge Cases**:
   - Test timezone edge cases
   - Handle prayer time edge cases
   - Test date boundary conditions

## Documentation

1. **Code Documentation**:
   - JSDoc comments for functions
   - Interface and type documentation
   - Complex logic explanation
2. **README Files**:
   - Module-level documentation
   - Setup and configuration guides
   - API documentation
3. **Wiki Documentation**:
   - User settings guide
   - Calculation methods explanation
   - Time format documentation

## Version Control

1. **Git Best Practices**:
   - Meaningful commit messages
   - Feature branches
   - Pull request reviews
2. **CI/CD Pipeline**:
   - Automated testing
   - Linting and type checking
   - Serverless deployment
3. **Environment Management**:
   - Separate development and production
   - Environment variable management
   - Secret handling

## Security

1. **Input Validation**:
   - Parameter validation
   - Query string sanitization
   - Type checking
2. **API Security**:
   - TRMNL OAuth integration
   - Token validation
   - Rate limiting
3. **Data Protection**:
   - Secure user settings storage
   - Environment variable encryption
   - Minimal data collection

## Performance

1. **Lambda Optimization**:
   - Cold start optimization
   - Memory allocation tuning
   - Response time monitoring
2. **Caching Strategy**:
   - Prayer times caching
   - User settings caching
   - API response caching
3. **Resource Usage**:
   - Efficient database queries
   - Minimal API calls
   - Optimized calculations

## Maintenance

1. **Code Quality**:
   - Regular dependency updates
   - Technical debt management
   - Code cleanup
2. **Monitoring**:
   - Error tracking
   - Performance monitoring
   - Usage analytics
3. **Documentation**:
   - Keep documentation updated
   - Document breaking changes
   - Maintain changelog

## Related Documentation

- [Main README](../README.md) - Project overview and setup instructions
- [Prayer Times Handler](../src/handlers/prayer-times-handler/README.md) - Prayer times API documentation
- [Services Documentation](../src/services/README.md) - Service layer documentation
- [Settings Guide](../docs/wiki/settings.md) - User settings documentation
