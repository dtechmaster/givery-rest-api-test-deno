# Recipe REST API

A simple REST API for recipe management built with Deno.

## Stack
- **Server**: Deno (TypeScript) using `Deno.serve`.
- **Testing**: Node.js with Mocha, Chai, and Chai-HTTP.
- **Config**: YAML for environment variables.

## Endpoints
- `POST /recipes`: Create a recipe.
- `GET /recipes`: List all recipes.
- `GET /recipes/:id`: Get a specific recipe.
- `PATCH /recipes/:id`: Update a recipe.
- `DELETE /recipes/:id`: Remove a recipe.

## Testing
To test the API (local or production):
1. Configure `env.yml` with the target `BASE_URL`.
2. Run `npm install` (Node.js required).
3. Run `npx mocha test_api.js`.
