# n8n-nodes-tawkto

This is an [n8n](https://n8n.io/) community node package for [Tawk.to](https://www.tawk.to/) — a popular free live chat platform.

It provides a **Trigger Node** that starts workflows when Tawk.to events occur (via webhooks), and a **Regular Node** for interacting with the Tawk.to REST API.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

**npm package name:** `n8n-nodes-tawkto`

## Nodes

### Tawk.to Trigger

Starts a workflow when a Tawk.to event occurs. Uses webhooks — no polling required.

**Supported events:**
- **Chat Started** — Triggered when the first message in a chat is sent
- **Chat Ended** — Triggered when a conversation concludes
- **Chat Transcript Created** — Full transcript sent after a chat ends (after ~3 minutes of inactivity)
- **Ticket Created** — Triggered when a new support ticket is generated

**Setup:**
1. Add the **Tawk.to Trigger** node to your workflow
2. Select which events should trigger the workflow
3. Activate the workflow — this generates a Webhook URL
4. Copy the Webhook URL and paste it in your Tawk.to dashboard: **Administration > Settings > Webhooks**
5. (Optional) Add the **Tawk.to Webhook API** credential with your webhook secret to enable HMAC-SHA1 signature verification

### Tawk.to

Interact with the Tawk.to REST API.

> **Note:** The Tawk.to REST API is currently in private beta. You need to request access through the [Tawk.to developer portal](https://developer.tawk.to/). Approval is typically granted within 24 hours.

**Supported resources and operations:**
- **Agent** — Get Current Agent
- **Property** — List Properties
- **Ticket** — List Tickets (with filters for status, date range)

## Credentials

### Tawk.to Webhook API

Used for HMAC-SHA1 signature verification on incoming webhooks (optional but recommended).

- **Webhook Secret** — Found in your Tawk.to dashboard under Administration > Settings > Webhooks

### Tawk.to API

Used for REST API operations (required for the Tawk.to regular node).

- **API Key** — Your Tawk.to REST API key (requires beta access approval)

Authentication uses HTTP Basic Auth with the API key as the username and an empty password.

## Resources

- [Tawk.to Webhook Documentation](https://developer.tawk.to/webhooks/)
- [Tawk.to REST API Documentation](https://developer.tawk.to/rest-api/)
- [Tawk.to JavaScript API Documentation](https://developer.tawk.to/jsapi/)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

[MIT](LICENSE.md)
