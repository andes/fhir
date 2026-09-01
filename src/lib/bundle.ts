import { makeUrl } from './config';

export function encode(ID: any, resources: any) {
    return {
        resourceType: 'Bundle',
        id: ID,
        meta: {
            lastUpdated: new Date().toISOString()
        },
        language: 'es-AR',
        entry: resources,
        type: 'document',
        identifier: {
            system: makeUrl('Bundle'),
            value: ID
        }
    };
}
