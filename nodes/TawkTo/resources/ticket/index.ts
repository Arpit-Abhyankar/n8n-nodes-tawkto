import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTicket = {
	resource: ['ticket'],
};

export const ticketOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForTicket,
		},
		options: [
			{
				name: 'List Tickets',
				value: 'list',
				action: 'List tickets',
				description: 'List tickets for a property',
				routing: {
					request: {
						method: 'POST',
						url: '/ticket.list',
					},
				},
			},
		],
		default: 'list',
	},
];

export const ticketFields: INodeProperties[] = [
	{
		displayName: 'Property ID',
		name: 'propertyId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['ticket'],
				operation: ['list'],
			},
		},
		description: 'The ID of the property to list tickets for',
		routing: {
			send: {
				type: 'body',
				property: 'propertyId',
			},
		},
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['ticket'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Open', value: 'open' },
					{ name: 'Pending', value: 'pending' },
					{ name: 'Closed', value: 'closed' },
				],
				default: 'open',
				description: 'Filter tickets by status',
				routing: {
					send: {
						type: 'body',
						property: 'status',
					},
				},
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'Return tickets created after this date',
				routing: {
					send: {
						type: 'body',
						property: 'startDate',
					},
				},
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'Return tickets created before this date',
				routing: {
					send: {
						type: 'body',
						property: 'endDate',
					},
				},
			},
			{
				displayName: 'Limit',
				name: 'size',
				type: 'number',
				typeOptions: {
					minValue: 1,
					maxValue: 100,
				},
				default: 50,
				description: 'Max number of tickets to return',
				routing: {
					send: {
						type: 'body',
						property: 'size',
					},
				},
			},
		],
	},
];
