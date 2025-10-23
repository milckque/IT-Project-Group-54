# Code Practices
This document outlines the coding practices and conventions followed in this project to ensure code quality, maintainability, and collaboration efficiency.

## General
- Write clean, readable, and well-documented code.
- Follow consistent naming conventions.
- Use meaningful variable and function names.
- Keep functions and components small and focused on a single task.

## Directories and File Structure
- Organize code into meaningful directories based on functionality (e.g., components, utils, types).
- Use clear and descriptive names for files and directories.
- Keep related files together (e.g., component files and their styles).
- Separate concerns by dividing code into modules (e.g., UI components, data fetching, state management).

```
/purchase-partners
  /public
  /src
    /assets
    /backend
      /controllers
      /routes
      /utils
    /components
    /hooks
    /pages
    /types
    /utils
    App.tsx
    main.tsx
    supabaseClient.ts
    vite-env.d.ts
  index.html
```

## Language and Frameworks
- Use camelCase for variable and function names.
- Use PascalCase for component and class names.
- Use UPPER_SNAKE_CASE for constants.
- Prefer functional components and React hooks for state management.
- Avoid `any` if possible; use specific types or interfaces.

## Git Practices
- Write clear and concise commit messages.
- Use feature branches for new features and bug fixes.
- Can merge directly into main - communicate with team members before doing so.

## Testing
- All testing will be done manually (Jest is a pain)