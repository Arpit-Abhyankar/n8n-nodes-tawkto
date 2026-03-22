import type { ICredentialType, Icon, INodeProperties } from 'n8n-workflow';

export class TawkToWebhookApi implements ICredentialType {
	name = 'tawkToWebhookApi';

	displayName = 'Tawk.to Webhook API';

	icon: Icon = 'file:../icons/tawkto.svg';

	documentationUrl = 'https://developer.tawk.to/webhooks/';

	// The webhook secret cannot be verified via API call — it's used only for HMAC signature verification on incoming webhooks
	test = undefined;

	properties: INodeProperties[] = [
		{
			displayName: 'Webhook Secret',
			name: 'webhookSecret',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description:
				'The webhook secret from your Tawk.to dashboard (Administration > Settings > Webhooks). Used to verify that incoming webhooks are from Tawk.to via HMAC-SHA1 signature.',
		},
	];
}
