# Contributing to n8n-nodes-tawkto

Thanks for your interest in contributing! This guide will help you get set up and submit your first pull request.

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm (comes with Node.js)
- A [Tawk.to](https://www.tawk.to/) account (free) for testing webhooks
- (Optional) [Tawk.to REST API access](https://developer.tawk.to/) for testing the regular node — requires beta approval (~24 hours)

## Getting Started

1. **Fork** this repository and clone your fork:

   ```bash
   git clone https://github.com/<your-username>/n8n-nodes-tawkto.git
   cd n8n-nodes-tawkto
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

   This starts a local n8n instance at `http://localhost:5678` with your nodes auto-loaded. File changes are watched and rebuilt automatically.

4. **Open n8n** in your browser at [http://localhost:5678](http://localhost:5678). You should see the **Tawk.to Trigger** and **Tawk.to** nodes in the node panel.

## Testing Your Changes

### Testing the Trigger Node

1. Create a workflow with the **Tawk.to Trigger** node
2. Select one or more events (e.g. "Chat Started")
3. Click **"Test this trigger"** in the node panel
4. In a separate terminal, send a test webhook:

   ```bash
   curl -X POST http://localhost:5678/webhook-test/<YOUR-WEBHOOK-UUID>/webhook \
     -H "Content-Type: application/json" \
     -d '{
       "event": "chat:start",
       "time": "2026-01-01T00:00:00.000Z",
       "property": { "id": "test-prop", "name": "Test Site" },
       "visitor": { "name": "Test User", "email": "test@example.com" },
       "chat": { "id": "test-chat-001" }
     }'
   ```

5. The node output panel should display the received data.

### Testing the Regular Node

Requires [Tawk.to REST API access](https://developer.tawk.to/) (beta).

1. Create a workflow with the **Tawk.to** node
2. Add your API credentials (API key with HTTP Basic Auth)
3. Select a resource and operation (e.g. Agent → Get Current Agent)
4. Execute the node

### Testing with Real Tawk.to Webhooks

For end-to-end testing with actual Tawk.to events:

1. Start your dev server: `npm run dev`
2. Expose your local server: `ngrok http 5678`
3. Copy the ngrok URL and add it as a webhook in your Tawk.to dashboard (Administration > Settings > Webhooks)
4. Start a chat on your Tawk.to widget to trigger events

## Code Quality

Before submitting a PR, make sure your code passes linting and builds:

```bash
npm run lint        # Check for lint errors
npm run lint:fix    # Auto-fix what's possible
npm run build       # Ensure TypeScript compiles cleanly
```

## Submitting a Pull Request

1. Create a new branch from `main`:

   ```bash
   git checkout -b feat/your-feature-name
   ```

2. Make your changes and commit with a clear message:

   ```bash
   git commit -m "feat: add description of your change"
   ```

   Follow [Conventional Commits](https://www.conventionalcommits.org/) style:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation changes
   - `refactor:` for code changes that don't add features or fix bugs

3. Push your branch and open a PR against `main`.

4. Fill in the PR template and describe what your change does and how to test it.

5. Wait for CI checks to pass and a maintainer to review.

## Important Constraints

- **Zero runtime dependencies** — This is required for n8n community node verification. Only `n8n-workflow` is allowed as a `peerDependency`. Use Node.js built-in modules (like `crypto`) instead of npm packages.
- **TypeScript strict mode** — All code must compile with `strict: true`.
- **n8n lint rules** — Follow the n8n community node ESLint rules (enforced by `npm run lint`).

## Project Structure

```
credentials/          # n8n credential type definitions
nodes/
  TawkTo/             # Regular node (REST API, declarative style)
    resources/        # Resource definitions (agent, property, ticket)
  TawkToTrigger/      # Trigger node (webhooks, programmatic style)
icons/                # Node icons (SVG)
.github/workflows/    # CI and publish workflows
```

## Questions?

Open an [issue](https://github.com/arpitabhyankar/n8n-nodes-tawkto/issues) or start a [discussion](https://github.com/arpitabhyankar/n8n-nodes-tawkto/discussions) if you're unsure about anything.
