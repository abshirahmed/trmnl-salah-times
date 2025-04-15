# User Rules for TypeScript/Node.js Development

This document outlines the user rules for development in TypeScript/Node.js projects. These rules are designed to maintain consistency, quality, and best practices across the codebase.

## 1. Architectural Rules

### Module Structure
- Follow the modular structure: handlers → controllers → services
- Keep each module self-contained with its own documentation
- Maintain clear separation of concerns
- Use consistent directory structure
- Document the "why" behind architectural decisions

### Code Organization
- Organize code into logical, well-defined directories
- Keep related functionality grouped together
- Use clear, descriptive naming that reflects purpose
- Follow established patterns across the codebase
- Maintain proper file structure within modules

## 2. Type Safety Rules

### TypeScript Implementation
- Define interfaces before implementation
- Use strong typing and avoid 'any'
- Leverage readonly properties for immutability
- Use appropriate validation schemas
- Maintain strict null checks

### Type Definitions
- Create comprehensive interfaces for all public APIs
- Document complex types and their relationships
- Use type guards and assertions appropriately
- Define proper return types for all functions
- Use generics when appropriate

## 3. Error Handling Rules

### Error Management
- Implement consistent error handling patterns
- Log errors with appropriate context
- Provide user-friendly error messages
- Validate inputs early
- Use proper error types and hierarchies

### Logging
- Use a consistent logging utility
- Include sufficient context in log messages
- Log at appropriate severity levels
- Maintain audit trails for important operations
- Protect sensitive information in logs

## 4. Testing Rules

### Test Implementation
- Write tests before or alongside implementation
- Test both unit and integration scenarios
- Aim for high test coverage
- Focus on behavior, not implementation
- Document test expectations

### Test Organization
- Keep tests close to the code they test
- Use descriptive test names
- Test edge cases and error conditions
- Mock external dependencies appropriately
- Maintain test data separately

## 5. Documentation Rules

### Code Documentation
- Document the "why" not just the "what"
- Keep documentation up-to-date with code
- Include comprehensive README files
- Document architectural decisions
- Explain complex logic and edge cases

### API Documentation
- Document all public APIs
- Include usage examples
- Specify parameter types and return values
- Document error conditions
- Keep API documentation current

## 6. Development Process Rules

### Version Control
- Make small, focused commits
- Use descriptive commit messages
- Develop in feature branches
- Follow code review practices
- Maintain CI/CD integration

### Code Review
- Review for code quality, not just functionality
- Check for edge cases and error scenarios
- Verify tests are included with changes
- Ensure documentation is updated
- Consider security implications

## 7. Code Quality Rules

### Clean Code Principles
- Follow clean code principles
- Use meaningful names
- Keep functions small and focused
- Avoid code duplication
- Keep solutions simple

### Code Style
- Follow established formatting rules
- Use consistent naming conventions
- Maintain proper indentation
- Keep line lengths reasonable
- Use appropriate comments

## 8. Security Rules

### Security Implementation
- Validate all inputs
- Follow least privilege principle
- Use environment variables for sensitive data
- Keep dependencies updated
- Implement proper authentication

### Data Protection
- Encrypt sensitive data
- Use secure communication protocols
- Implement proper access controls
- Follow data retention policies
- Protect user privacy

## 9. Performance Rules

### Optimization
- Optimize for common cases
- Measure before optimizing
- Consider runtime environment constraints
- Write efficient database queries
- Monitor resource usage

### Resource Management
- Minimize memory usage
- Optimize network calls
- Use appropriate caching
- Handle timeouts properly
- Monitor performance metrics

## 10. Maintenance Rules

### Code Maintenance
- Remove unused code regularly
- Refactor gradually
- Address technical debt
- Keep dependencies updated
- Monitor code quality metrics

### System Maintenance
- Document maintenance procedures
- Plan for system updates
- Monitor system health
- Maintain backup procedures
- Document recovery processes

## Implementation Guidelines

### When Adding New Features
1. Create appropriate directory structure
2. Define interfaces and types
3. Implement core functionality
4. Add tests
5. Update documentation

### When Modifying Existing Code
1. Review existing implementation
2. Plan changes carefully
3. Make incremental changes
4. Update tests
5. Update documentation

### When Fixing Bugs
1. Reproduce the issue
2. Identify root cause
3. Implement fix
4. Add regression tests
5. Document the fix

## Related Documentation

- [Engineering Principles](./engineering-principles.md) - Core engineering principles
- [Project Structure](./PROJECT_STRUCTURE.md) - Codebase organization
- [AI Agent Guide](./AI_AGENT_GUIDE.md) - Guidelines for AI assistance