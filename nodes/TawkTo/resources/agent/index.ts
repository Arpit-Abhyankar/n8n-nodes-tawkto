import type { INodeProperties } from 'n8n-workflow';

const showOnlyForAgent = {
	resource: ['agent'],
};

export const agentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForAgent,
		},
		options: [
			{
				name: 'Get Current Agent',
				value: 'me',
				action: 'Get the current agent',
				description: 'Get details of the currently authenticated agent',
				routing: {
					request: {
						method: 'POST',
						url: '/agent.me',
					},
				},
			},
		],
		default: 'me',
	},
];

export const agentFields: INodeProperties[] = [];
