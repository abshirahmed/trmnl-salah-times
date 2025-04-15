# Resource Integration Examples

This document provides examples of how to reference files, documentation, and data sources in prompts when working with AI agents on the TRMNL Salah Times project. It includes templates and tips for structuring resource-based prompts.

TRMNL Salah Times is a serverless application that displays Islamic prayer times, next prayer countdowns, and Hijri date information on TRMNL e-ink devices in an elegant, distraction-free format.

## Referencing Files in Prompts

When referencing files in prompts, be specific about the file path and the relevant sections. This helps the AI agent locate and understand the context quickly.

### Examples

#### Referencing a Specific File

✅ **Good Example**:
```
Please review the prayer times calculation logic in src/services/prayer-times/calculatePrayerTimes.ts and suggest improvements for handling edge cases around midnight.
```

❌ **Poor Example**:
```
Look at the prayer times calculation and fix the midnight issue.
```

#### Referencing Multiple Related Files

✅ **Good Example**:
```
I need to update the user settings functionality. The relevant files are:
1. src/services/user-settings/getUserSettings.ts
2. src/services/user-settings/saveUserSettings.ts
3. src/controllers/user-settings/generateManagementInterface.ts
4. src/handlers/save-settings-handler/index.ts
```

❌ **Poor Example**:
```
Help me update the user settings.
```

#### Referencing Code Patterns

✅ **Good Example**:
```
Create a new handler following the pattern in src/handlers/prayer-times-handler/ with index.ts, schema.ts, and README.md files.
```

❌ **Poor Example**:
```
Create a new handler like the others.
```

## Referencing Documentation

When referencing documentation, specify the exact document and section to provide proper context.

### Examples

#### Referencing Project Documentation

✅ **Good Example**:
```
According to the engineering principles in docs/engineering-principles.md under the "Code Quality" section, we should use strong typing. Please review this code for type safety issues.
```

❌ **Poor Example**:
```
Check if this code follows our principles.
```

#### Referencing External Documentation

✅ **Good Example**:
```
Implement the Umm al-Qura University calculation method as described in the Aladhan API documentation at https://aladhan.com/calculation-methods.
```

❌ **Poor Example**:
```
Add the Saudi Arabia calculation method.
```

## Referencing Data Sources

When working with data sources, provide clear information about the data structure and source.

### Examples

#### Referencing Database Schema

✅ **Good Example**:
```
Add a new field to the user_settings table as defined in src/clients/supabase/database.types.ts to store the user's preferred language.
```

❌ **Poor Example**:
```
Add language support to the database.
```

#### Referencing API Responses

✅ **Good Example**:
```
Parse the Aladhan API response as shown in src/services/prayer-times/types.ts to extract the Hijri date information.
```

❌ **Poor Example**:
```
Get the Hijri date from the API.
```

## Templates for Structuring Resource-Based Prompts

### Feature Implementation Template

```
# Feature: [Feature Name]

## Description
[Brief description of the feature]

## Relevant Files
- [File path 1]: [Description]
- [File path 2]: [Description]
- [File path 3]: [Description]

## Requirements
1. [Requirement 1]
2. [Requirement 2]
3. [Requirement 3]

## Implementation Guidelines
- Follow the pattern in [example file/pattern]
- Ensure [specific consideration]
- Test with [testing approach]
```

### Bug Fix Template

```
# Bug: [Bug Description]

## Issue
[Detailed description of the issue]

## Reproduction Steps
1. [Step 1]
2. [Step 2]
3. [Step 3]

## Relevant Files
- [File path 1]: [Description]
- [File path 2]: [Description]

## Expected Behavior
[Description of expected behavior]

## Current Behavior
[Description of current behavior]
```

### Code Review Template

```
# Code Review: [Component/Feature]

## Files to Review
- [File path 1]
- [File path 2]
- [File path 3]

## Review Focus
- [Specific aspect to focus on, e.g., type safety, error handling]
- [Another aspect to focus on]

## Engineering Principles to Consider
- [Relevant principle from docs/engineering-principles.md]
- [Another relevant principle]
```

## Tips for Ensuring Correct Context Usage

1. **Be Specific About File Paths**: Always use complete file paths relative to the project root.

2. **Provide Line Numbers When Relevant**: For large files, specify line numbers to focus attention.
   ```
   In src/services/prayer-times/calculatePrayerTimes.ts, lines 45-60, the next prayer calculation has an issue.
   ```

3. **Include Code Snippets for Context**: When discussing specific code, include relevant snippets.
   ```
   The following code in src/utils/dateUtils.ts has a timezone handling issue:

   ```typescript
   export const formatTime12h = (time24h: string): string => {
     // ... code snippet ...
   }
   ```

4. **Reference Related Documentation**: Link to relevant documentation for additional context.
   ```
   According to the architecture document (docs/prayer-times-plugin/technical/architecture.md), we should use the Supabase client for all database operations.
   ```

5. **Specify Data Structures**: When working with data, clearly define the expected structure.
   ```
   The user settings object should follow this structure as defined in src/clients/supabase/database.types.ts:

   ```typescript
   type UserSettings = {
     uuid: string;
     city: string;
     country: string;
     method: number;
     timeformat: string;
   }
   ```

6. **Provide Examples of Expected Output**: When requesting new functionality, show examples of expected output.
   ```
   The formatted prayer time should look like "5:30 AM" as shown in the existing templates.
   ```

By following these guidelines and templates, you can ensure that AI agents have the correct context and resources to effectively assist with the TRMNL Salah Times project.

## Related Documentation

- [AI Agent Guide](./AI_AGENT_GUIDE.md) - Instructions for AI agents working with this codebase
- [Project Structure](./PROJECT_STRUCTURE.md) - Overview of the codebase organization
- [Engineering Principles](./engineering-principles.md) - Guidelines for code quality and development practices
- [Technical Architecture](./prayer-times-plugin/technical/architecture.md) - Detailed information about the system architecture
- [Main README](../README.md) - Project overview and setup instructions
