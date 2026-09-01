
/* eslint-disable @typescript-eslint/no-explicit-any */

import { makeUrl } from './config';

function getReference(url: any) {
    return {
        reference: url
    };
}

export function encode(ID: any, patientReference: any, custodianReference: any, deviceReference: any, medicationStatementReference: any, ImmunizationReferences: any, AllergyIntoleranceReferences: any, ConditionReferences: any) {
    const now = new Date();
    const nowIso = now.toISOString();
    let Immunization: any = [];
    let conditions: any = [];
    let medications: any = [];
    let allergyIntolerance = [];

    Immunization = [{
        title: 'Vacunas',
        text: {
            status: 'generated',
            div: '<div xmlns="http://www.w3.org/1999/xhtml">Sección referida a la vacunación del paciente </div>'
        },
        code: {
            coding: [
                {
                    system: 'http://loinc.org',
                    display: 'Immunization record',
                    code: '60484-3'
                }
            ]
        },
        entry: ImmunizationReferences ? ImmunizationReferences.map(getReference) : []
    }];

    medications = [{
        title: 'Medicamentos',
        text: {
            status: 'generated',
            div: '<div xmlns="http://www.w3.org/1999/xhtml">Registro de medicamentos</div>'
        },
        code: {
            coding: [
                {
                    system: 'http://loinc.org',
                    display: 'Medication use',
                    code: '10160-0'
                }
            ]
        },
        entry: medicationStatementReference ? medicationStatementReference.map(getReference) : [],
    }];

    allergyIntolerance = [{
        title: 'Alergias o Intolerancias',
        text: {
            status: 'generated',
            div: '<div xmlns="http://www.w3.org/1999/xhtml">Registro de Alergias</div>'
        },
        code: {
            coding: [
                {
                    system: 'http://loinc.org',
                    display: 'Allergies and/or adverse reactions',
                    code: '48765-2'
                }
            ]
        },
        entry: AllergyIntoleranceReferences ? AllergyIntoleranceReferences.map(getReference) : [],
    }];

    conditions = [{
        code: {
            coding: [
                {
                    system: 'http://loinc.org',
                    display: 'Problem list',
                    code: '11450-4'
                }
            ]
        },
        entry: ConditionReferences ? ConditionReferences.map(getReference) : [],
        title: 'Problemas activos',
        text: {
            status: 'generated',
            div: '<div xmlns="http://www.w3.org/1999/xhtml">Lista de problemas activos (trastornos)</div>'
        }
    }];

    return {
        id: ID,
        subject: {
            reference: patientReference
        },
        section: [
            ...conditions,
            ...medications,
            ...Immunization,
            ...allergyIntolerance

        ],
        resourceType: 'Composition',
        author: [
            {
                identifier: {
                    system: 'https://federador.msal.gob.ar/uri',
                    value: deviceReference
                }
            }
        ],
        confidentiality: 'N',
        type: {
            coding: [
                {
                    system: 'http://loinc.org',
                    display: 'Patient Summary',
                    code: '60591-5'
                }
            ]
        },
        title: 'Resumen del paciente al ' + now.toLocaleDateString('es-AR') + ', ' + now.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
        identifier: {
            system: makeUrl('Composition'),
            value: ID
        },
        date: nowIso,
        // meta: {
        //     profile: [
        //         'http:\/\/hl7.org\/fhir\/uv\/ips\/StructureDefinition\/composition-uv-ips'
        //     ]
        // },
        text: {
            status: 'generated',
            div: '<div xmlns="http://www.w3.org/1999/xhtml">IPS Neuquen</div>'
        },
        custodian: {
            identifier: {
                system: 'https://federador.msal.gob.ar/uri',
                value: custodianReference
            }
        },
        attester: [
            {
                mode: 'legal',
                time: nowIso,
                party: {
                    reference: custodianReference
                }
            }
        ],
        status: 'final'
    };
}
