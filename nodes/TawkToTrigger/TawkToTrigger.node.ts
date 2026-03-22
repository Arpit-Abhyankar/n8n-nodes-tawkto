import { createHmac, timingSafeEqual } from 'crypto';
import type {
	IDataObject,
	IHookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
} from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';

export class TawkToTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Tawk.to Trigger',
		name: 'tawkToTrigger',
		icon: 'file:../../icons/tawkto.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["events"].join(", ")}}',
		description: 'Starts the workflow when a Tawk.to event occurs',
		defaults: {
			name: 'Tawk.to Trigger',
		},
		usableAsTool: true,
		inputs: [],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'tawkToWebhookApi',
				required: false,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName:
					'To set up this trigger, copy the Webhook URL (shown above after activating the workflow) and paste it in your Tawk.to dashboard under Administration > Settings > Webhooks.',
				name: 'notice',
				type: 'notice',
				default: '',
			},
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				required: true,
				default: [],
				options: [
					{
						name: 'Chat Ended',
						value: 'chat:end',
					},
					{
						name: 'Chat Started',
						value: 'chat:start',
					},
					{
						name: 'Chat Transcript Created',
						value: 'transcript:created',
					},
					{
						name: 'Ticket Created',
						value: 'ticket:create',
					},
				],
				description: 'The events to listen to',
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				return true;
			},
			async create(this: IHookFunctions): Promise<boolean> {
				return true;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const req = this.getRequestObject();
		const body = this.getBodyData() as IDataObject;
		const headers = this.getHeaderData() as IDataObject;

		// HMAC-SHA1 signature verification (optional — only if credentials are configured)
		try {
			const credentials = await this.getCredentials('tawkToWebhookApi');
			if (credentials?.webhookSecret) {
				const signature = headers['x-tawk-signature'] as string | undefined;
				if (!signature) {
					return {
						webhookResponse: 'Signature missing',
					};
				}

				// Compute HMAC-SHA1 over the raw request body
				const rawBody =
					(req as unknown as { rawBody?: Buffer }).rawBody ??
					Buffer.from(JSON.stringify(body));
				const expectedSignature = createHmac(
					'sha1',
					credentials.webhookSecret as string,
				)
					.update(rawBody)
					.digest('base64');

				// Timing-safe comparison to prevent timing attacks
				const sigBuffer = Buffer.from(signature);
				const expectedBuffer = Buffer.from(expectedSignature);
				if (
					sigBuffer.length !== expectedBuffer.length ||
					!timingSafeEqual(sigBuffer, expectedBuffer)
				) {
					return {
						webhookResponse: 'Invalid signature',
					};
				}
			}
		} catch {
			// No credentials configured — skip HMAC verification
		}

		// Filter by selected events
		const events = this.getNodeParameter('events', []) as string[];
		const eventType = (body.event as string) || '';

		if (events.length > 0 && !events.includes(eventType)) {
			return {
				webhookResponse: 'OK',
			};
		}

		return {
			workflowData: [this.helpers.returnJsonArray(body)],
		};
	}
}
