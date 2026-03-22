import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { agentOperations, agentFields } from './resources/agent';
import { propertyOperations, propertyFields } from './resources/property';
import { ticketOperations, ticketFields } from './resources/ticket';

export class TawkTo implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Tawk.to',
		name: 'tawkTo',
		icon: 'file:../../icons/tawkto.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Tawk.to REST API',
		defaults: {
			name: 'Tawk.to',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'tawkToApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.tawk.to/v1',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Agent',
						value: 'agent',
					},
					{
						name: 'Property',
						value: 'property',
					},
					{
						name: 'Ticket',
						value: 'ticket',
					},
				],
				default: 'agent',
			},
			...agentOperations,
			...agentFields,
			...propertyOperations,
			...propertyFields,
			...ticketOperations,
			...ticketFields,
		],
	};
}
