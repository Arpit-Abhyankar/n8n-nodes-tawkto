# n8n-nodes-tawkto

## What This Is

An n8n community node package (`n8n-nodes-tawkto`) that integrates Tawk.to live chat with n8n workflows. Published as an independent npm package — NOT a PR to n8n's core repo (n8n auto-closes PRs for new built-in nodes).

## Architecture

### Nodes

- **TawkToTrigger** (`nodes/TawkToTrigger/`) — Programmatic style. Webhook-based trigger that fires on 4 Tawk.to events: `chat:start`, `chat:end`, `transcript:created`, `ticket:create`. Includes optional HMAC-SHA1 signature verification using Node.js built-in `crypto`. Users must manually paste the webhook URL in their Tawk.to dashboard (no programmatic webhook registration API exists).

- **TawkTo** (`nodes/TawkTo/`) — Declarative style. REST API node with 3 resources:
  - Agent → Get Current Agent (`POST /agent.me`)
  - Property → List Properties (`POST /property.list`)
  - Ticket → List Tickets (`POST /ticket.list`) with filters

  Tawk.to uses POST-based RPC style — all params go in request body, not query params.

### Credentials

- **TawkToWebhookApi** (`credentials/TawkToWebhookApi.credentials.ts`) — Stores HMAC-SHA1 webhook secret. No test request possible (webhook secrets can't be verified via API).
- **TawkToApi** (`credentials/TawkToApi.credentials.ts`) — REST API key with HTTP Basic Auth (key as username, empty password). Test request: `POST /agent.me`.

### Key Constraints

- **Zero runtime dependencies** — required for n8n verification. Only `n8n-workflow` as peerDependency.
- **REST API is in private beta** — users must request access at developer.tawk.to (~24hr approval).
- **HMAC signature uses base64 encoding** — Tawk.to signs with HMAC-SHA1 and the signature in `x-tawk-signature` header is base64-encoded.

## Tech Stack

- TypeScript (strict, ES2019, CommonJS)
- Build: `@n8n/node-cli` via `npm run build`
- Lint: `npm run lint` (ESLint 9 with n8n community node rules)
- CI/CD: GitHub Actions — lint+build on PR (`ci.yml`), publish to npm on version tag (`publish.yml`)

## Commands

```bash
npm run dev          # Start n8n with nodes loaded + hot reload
npm run build        # Compile TypeScript to dist/
npm run lint         # Check for errors
npm run lint:fix     # Auto-fix lint issues
npm run release      # Bump version, tag, push (triggers npm publish)
```

## Testing Locally

1. `npm run dev` — starts n8n with your nodes
2. For webhook testing: use `ngrok http 5678` to expose local n8n
3. Copy webhook URL → paste in Tawk.to dashboard (Administration > Settings > Webhooks)
4. Start a chat on your Tawk.to widget to trigger the workflow

## Publishing Workflow

1. `npm run release` — interactive version bump, changelog, commit, tag, push
2. GitHub Actions `publish.yml` triggers on version tag → publishes to npm with provenance
3. Requires npm trusted publisher setup (OIDC, no token needed) OR `NPM_TOKEN` secret

## Repo Conventions

- Package name: `n8n-nodes-tawkto`
- npm keyword: `n8n-community-node-package` (required for n8n discovery)
- All node/credential files registered in `package.json` under `n8n.nodes` and `n8n.credentials`
- Icons in `icons/` directory, referenced as `file:../../icons/tawkto.svg` from node files
- Codex metadata files (`.node.json`) sit adjacent to their `.node.ts` files
- MIT license

## Tawk.to API Reference

- Webhooks docs: https://developer.tawk.to/webhooks/
- REST API docs: https://developer.tawk.to/rest-api/
- REST base URL: `https://api.tawk.to/v1`
- JS API (client-side only, not used): https://developer.tawk.to/jsapi/
