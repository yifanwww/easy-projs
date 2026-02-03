# Copilot Instructions for easy-projs

## CSS/SCSS File Extensions

- **Prefer `.css` file extension** for styling by default
- **Use `.scss` file extension only when it's better to use SCSS to organize the code**
  - Examples of when SCSS is preferable:
    - Using SCSS variables, mixins, or functions for code reusability
    - Nesting selectors for better code organization
    - Using SCSS functions like `darken()`, `lighten()`, etc.
    - When the stylesheet is complex and benefits from SCSS features
  - Keep stylesheets in `.css` if they're simple or don't leverage SCSS capabilities

