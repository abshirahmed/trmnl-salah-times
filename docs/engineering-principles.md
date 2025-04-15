# Engineering Principles

This document outlines the engineering principles and best practices followed in the TRMNL Salah Times project. These principles guide our development process and help maintain code quality, consistency, and maintainability.

## Code Organization

### Modular Structure

We organize our codebase into a modular structure where each feature or component is self-contained:

1. **Handlers**: Each Lambda handler is organized as a self-contained module with its own:
   - Implementation file (`index.ts`)
   - Validation schema (`schema.ts`)
   - Documentation (`README.md`)

2. **Services**: Business logic is separated into service modules that:
   - Focus on a single responsibility
   - Can be reused across different handlers
   - Are properly typed and documented

3. **Utilities**: Common utilities are centralized and shared across the application

This structure provides several benefits:
- **Cohesion**: All files related to a specific feature are grouped together
- **Discoverability**: Easy to find all components of a feature
- **Modularity**: Each handler is a self-contained unit
- **Maintainability**: Changes to a feature only require modifying files in one location

## Code Quality

### TypeScript Best Practices

1. **Strong Typing**: We use TypeScript's type system extensively to catch errors at compile time
2. **Interface-First Design**: Define interfaces before implementation to ensure clear contracts
3. **Avoid `any` Type**: Use specific types or generics instead of `any` to maintain type safety
4. **Readonly Properties**: Use readonly for properties that shouldn't change after initialization

### Clean Code Principles

1. **Meaningful Names**: Use descriptive names for variables, functions, and classes
2. **Single Responsibility**: Each function or class should have only one reason to change
3. **Small Functions**: Keep functions small and focused on a single task
4. **DRY (Don't Repeat Yourself)**: Avoid code duplication through proper abstraction
5. **KISS (Keep It Simple, Stupid)**: Prefer simple solutions over complex ones
6. **Comments**: Use comments to explain "why" not "what" (the code should be self-explanatory)

## Error Handling

1. **Consistent Error Handling**: Use a consistent approach to error handling across the application
2. **Proper Logging**: Log errors with appropriate context for debugging
3. **User-Friendly Error Messages**: Provide clear error messages for API responses
4. **Fail Fast**: Validate inputs early to catch errors before they propagate

## Testing

1. **Test-Driven Development**: Write tests before or alongside implementation
2. **Unit Testing**: Test individual units of code in isolation
3. **Integration Testing**: Test interactions between components
4. **Test Coverage**: Aim for high test coverage, especially for critical paths
5. **Meaningful Tests**: Tests should verify behavior, not implementation details

## Documentation

1. **Code Documentation**: Document public APIs, complex logic, and non-obvious behavior
2. **README Files**: Each module should have a README explaining its purpose and usage
3. **Architecture Documentation**: Maintain high-level documentation of the system architecture
4. **Keep Documentation Updated**: Update documentation when code changes

## Version Control

1. **Small, Focused Commits**: Make small, focused commits that address a single concern
2. **Descriptive Commit Messages**: Write clear commit messages that explain the change
3. **Feature Branches**: Develop new features in dedicated branches
4. **Pull Requests**: Use pull requests for code review before merging
5. **CI/CD**: Leverage continuous integration and deployment for automated testing and deployment

## Code Review

1. **Constructive Feedback**: Provide constructive feedback during code reviews
2. **Focus on Quality**: Review for code quality, not just functionality
3. **Check for Edge Cases**: Consider edge cases and error scenarios
4. **Verify Tests**: Ensure appropriate tests are included with changes

## Security

1. **Input Validation**: Validate all inputs to prevent injection attacks
2. **Least Privilege**: Follow the principle of least privilege for permissions
3. **Environment Variables**: Use environment variables for sensitive configuration
4. **Dependency Management**: Keep dependencies updated to avoid security vulnerabilities

## Performance

1. **Optimize for Common Cases**: Focus optimization efforts on common use cases
2. **Measure First**: Measure performance before optimizing
3. **Consider Serverless Constraints**: Be mindful of cold starts and execution time limits
4. **Efficient Database Queries**: Write efficient database queries to minimize costs

## Maintenance

1. **Remove Unused Code**: Regularly remove unused code to keep the codebase clean
2. **Refactor Gradually**: Refactor code gradually to improve quality without disrupting development
3. **Technical Debt**: Address technical debt regularly, not just when it becomes a problem
4. **Keep Dependencies Updated**: Regularly update dependencies to get bug fixes and security patches

By following these principles, we aim to create a codebase that is maintainable, reliable, and easy to understand for all team members.

## Related Documentation

- [Project Structure](./PROJECT_STRUCTURE.md) - Overview of the codebase organization
- [AI Agent Guide](./AI_AGENT_GUIDE.md) - Instructions for AI agents working with this codebase
- [Resource Integration Examples](./RESOURCE_INTEGRATION_EXAMPLES.md) - Examples for referencing files and resources
- [Technical Architecture](./prayer-times-plugin/technical/architecture.md) - Detailed information about the system architecture
- [Main README](../README.md) - Project overview and setup instructions
