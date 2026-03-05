import { makeUrl } from './config';
import {
    Organization,
    ContactPoint,
    Address,
} from 'fhir/r4';

import {
    AndesOrganization,
    AndesContactoOrg,
    AndesDireccionOrg
} from '../types/andes/organization.types';
import { mapAndesRankingToFhirRank } from '../utils/rankingMapping';

/**
 * Encode an ANDES Organization to FHIR Organization
 */
export function encode(organization: AndesOrganization | null | undefined): Organization | null {
    const data = organization;
    if (!data) return null;

    // Identificadores
    const identificadores: any[] = [];

    if (data.codigo?.sisa) {
        identificadores.push({
            system: 'https://andes.gob.ar/sisa',
            value: data.codigo.sisa
        });
    }
    if (data.codigo?.cuie) {
        identificadores.push({
            system: 'https://andes.gob.ar/cuie',
            value: data.codigo.cuie
        });
    }
    if (data.codigo?.remediar) {
        identificadores.push({
            system: 'https://andes.gob.ar/remediar',
            value: data.codigo.remediar
        });
    }
    if (data.codigo?.sips) {
        identificadores.push({
            system: 'https://andes.gob.ar/sips',
            value: data.codigo.sips
        });
    }

    identificadores.push({
        system: makeUrl('Organization'),
        value: data._id ?? data.id
    });

    // Contactos → telecom
    const contactos: ContactPoint[] = (data.contacto ?? [])
        .map((item: AndesContactoOrg): ContactPoint => {
            const cp: ContactPoint = {
                value: item.valor,
                rank: mapAndesRankingToFhirRank(item.ranking)
            };
            switch (item.tipo) {
                case 'fijo':
                case 'celular':
                    cp.system = 'phone';
                    break;
                case 'email':
                    cp.system = 'email';
                    break;
            }
            return cp;
        });

    // Dirección → address
    const direcciones: Address[] = [];

    if (data.direccion) {
        const dir: AndesDireccionOrg = data.direccion;

        direcciones.push({
            postalCode: dir.codigoPostal ?? '',
            line: [dir.valor],
            city: dir.ubicacion?.localidad?.nombre ?? '',
            state: dir.ubicacion?.provincia?.nombre ?? '',
            country: dir.ubicacion?.pais?.nombre ?? ''
        });
    }

    // Organización FHIR
    const organizacionFHIR: Organization = {
        resourceType: 'Organization',
        id: data._id ?? data.id,
        identifier: identificadores,
        active: data.activo ?? undefined,
        name: data.nombre ?? undefined,
        type: data.tipoEstablecimiento
            ? [{
                text: data.tipoEstablecimiento.nombre
            }]
            : undefined
    };

    if (contactos.length > 0) {
        organizacionFHIR.telecom = contactos;
    }

    if (direcciones.length > 0) {
        organizacionFHIR.address = direcciones;
    }

    return organizacionFHIR;
}
