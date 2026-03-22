import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	Icon,
	INodeProperties,
} from 'n8n-workflow';

export class TawkToApi implements ICredentialType {
	name = 'tawkToApi';

	displayName = 'Tawk.to API';

	icon: Icon = 'file:../icons/tawkto.svg';

	documentationUrl = 'https://developer.tawk.to/rest-api/';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description:
				'Your Tawk.to REST API key. Request access at the Tawk.to developer portal (requires approval, typically within 24 hours).',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization:
					'={{"Basic " + Buffer.from($credentials.apiKey + ":").toString("base64")}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.tawk.to/v1',
			url: '/agent.me',
			method: 'POST',
		},
	};
}
