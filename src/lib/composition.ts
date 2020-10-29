
import * as moment from 'moment';
import { makeUrl } from './config';

function getReference(url) {
    return {
        reference: url
    };
}

export function encode(ID, patientReference, custodianReference, deviceReference, medicationStatementReference, ImmunizationReferences, AllergyIntoleranceReferences, ConditionReferences) {
    const now = moment();
    let Immunization: any = [];
    let conditions: any = [];
    let medications: any = [];
    let allergyIntolerance = [];

    if (ImmunizationReferences.length > 0) {
        Immunization = [{
            title: 'Vacunas',
            text: {
                status: 'generated',
                div: '<div xmlns="http:\/\/www.w3.org\/1999\/xhtml">producto que contiene solamente antígeno de virus de la influenza (producto medicinal)<\/div>'
            },
            code: {
                coding: [
                    {
                        system: 'http:\/\/loinc.org',
                        display: 'Immunization record',
                        code: '60484-3'
                    }
                ]
            },
            entry: ImmunizationReferences.map(getReference)
        }];
    }
    if (medicationStatementReference.length > 0) {
        medications = [{
            title: 'Medicamentos',
            text: {
                status: 'generated',
                div: '<div xmlns="http:\/\/www.w3.org\/1999\/xhtml">Registro de medicamentos<\/div>'
            },
            code: {
                coding: [
                    {
                        system: 'http:\/\/loinc.org',
                        display: 'Medication use',
                        code: '10160-0'
                    }
                ]
            },
            entry: medicationStatementReference.map(getReference),
        }];
    }
    if (AllergyIntoleranceReferences.length > 0) {
        allergyIntolerance = [{
            title: 'Alergias o Intolerancias',
            text: {
                status: 'generated',
                div: '<div xmlns="http:\/\/www.w3.org\/1999\/xhtml">Registro de Alergias<\/div>'
            },
            code: {
                coding: [
                    {
                        system: 'http:\/\/loinc.org',
                        display: 'Allergies and/or adverse reactions',
                        code: '48765-2'
                    }
                ]
            },
            entry: AllergyIntoleranceReferences.map(getReference),
        }]
    }
    if (ConditionReferences.length > 0) {
        conditions = [{
            code: {
                coding: [
                    {
                        system: 'http:\/\/loinc.org',
                        display: 'Problem list',
                        code: '11450-4'
                    }
                ]
            },
            entry: ConditionReferences.map(getReference),
            title: 'Problemas activos',
            text: {
                status: 'generated',
                div: '<div xmlns="http:\/\/www.w3.org\/1999\/xhtml">Lista de problemas activos (trastornos)<\/div>'
            }
        }];
    }

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
                reference: deviceReference
            }
        ],
        confidentiality: 'N',
        type: {
            coding: [
                {
                    system: 'http:\/\/loinc.org',
                    display: 'Patient Summary',
                    code: '60591-5'
                }
            ]
        },
        title: 'Resumen del paciente al ' + now.format('DD/MM/YYYY, HH:mm'),
        identifier: {
            system: makeUrl('Composition'),
            value: ID
        },
        date: now,
        // meta: {
        //     profile: [
        //         'http:\/\/hl7.org\/fhir\/uv\/ips\/StructureDefinition\/composition-uv-ips'
        //     ]
        // },
        text: {
            status: 'generated',
            div: '<div xmlns=\"http://www.w3.org/1999/xhtml\">IPS Neuquen</div>'
        },
        custodian: {
            reference: custodianReference
        },
        attester: [
            {
                mode: 'legal',
                time: now,
                party: {
                    reference: custodianReference
                }
            }
        ],
        status: 'final'
    };
}
