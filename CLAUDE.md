# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn start          # Dev server at http://localhost:3000
yarn build          # Production build
yarn lint           # ESLint (airbnb config)
yarn test           # Jest tests (--passWithNoTests)
```

## Architecture

**Munin** is a React SPA for tracking writers and books. It communicates with [Yggdrasil](https://github.com/Ojvind/yggdrasil), a GraphQL API (Apollo Server + Node.js + MongoDB).

### Entry point & providers (`src/index.jsx`)

The root wraps the app in four providers in order:
1. `ApolloProvider` — GraphQL client with an auth link (`x-token` header from `localStorage`) and an error link that fires a `auth-error` DOM event on expired sessions
2. `AuthProvider` (`Session/AuthContext`) — JWT token state; listens for `auth-error` to clear the token
3. `ThemeContextProvider` — light/dark context
4. `ThemeProvider` — applies MUI theme from `src/styles/theme.js`

### Routing (`src/App/index.jsx`)

React Router v6. All routes except `/signin` are wrapped in `PrivateRoute` which checks `useAuth().token`. Routes:
- `/writers` → Writer list + detail
- `/libri` → Book list + detail
- `/writer/:id/:name/:surname` → Writer detail page
- `/book/:bookId/:title` → Book detail page

### Feature structure

Each domain (`Writer`, `Book`) follows the same pattern:
- `index.jsx` — container: fetches data with `useQuery`, renders list + create modal
- `[Entity]List/` — desktop table (MUI DataGrid via `EntityList`) + mobile card view (switches at 600px)
- `[Entity]ListItemDetail/` — view/edit detail panel with inline edit toggle
- `queries.js` / `mutations.js` / `fragments.js` — all GraphQL operations

### Shared components (`src/Shared/`)

- `EntityList` — generic wrapper around MUI DataGrid with cursor-based pagination via `FetchMore`
- `RichTextEditor` — Tiptap-based WYSIWYG; HTML output is sanitized with DOMPurify before rendering
- `useImageUpload` hook — requests a presigned S3 URL from the API (`generateUploadUrl` mutation), then PUTs directly to S3; stores only the filename in the DB

### Styling

SCSS + MUI. Global variables are in `src/styles/variables/` and imported via `src/styles/importer.scss`. The MUI theme (`src/styles/theme.js`) mirrors the same palette. See `src/styles/THEME.md` for the full design token reference.

### i18n

`react-i18next`. Locale files: `src/locales/{en,sv,it}.json`. Use the `useTranslation()` hook and `t()` for all user-facing strings.

### Environment variables

| Variable | Purpose |
|---|---|
| `REACT_APP_API_URL` | GraphQL endpoint (e.g. `http://localhost:8000/graphql`) |
| `REACT_APP_IMAGES_URL` | Base URL for serving uploaded images (e.g. `http://localhost:9000/images`) |
