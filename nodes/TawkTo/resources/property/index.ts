import type { INodeProperties } from 'n8n-workflow';

const showOnlyForProperty = {
	resource: ['property'],
};

export const propertyOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForProperty,
		},
		options: [
			{
				name: 'List Properties',
				value: 'list',
				action: 'List all properties',
				description: 'List all properties associated with your account',
				routing: {
					request: {
						method: 'POST',
						url: '/property.list',
					},
				},
			},
		],
		default: 'list',
	},
];

export const propertyFields: INodeProperties[] = [];
