import { makeUrl } from './config';

/**
 *
 * @param registro Registro RUP a transformar a FHIR
 */


export function encode(patientReference, registro) {
    return {
        id : registro._id,
        category : [
            {
                coding : [
                    {
                        system : 'http://loinc.org',
                        display : 'Problem',
                        code : '75326-9'
                    }
                ]
            }
        ],
        subject : {
            reference : patientReference
        },
        onsetDateTime : registro.createdAt.getFullYear(), // [TODO] No va solo el año
        resourceType : 'Condition',
        // Por el momento ponemos 'confirmed'
        verificationStatus : {
            coding : [
                {
                    system : 'http://terminology.hl7.org//CodeSystem//condition-ver-status',
                    code : 'confirmed'
                }
            ]
        },
        code : {
            coding : [
                {
                    code : registro.concepto.conceptId,
                    system : 'http://snomed.info/sct',
                    display : registro.concepto.fsn
                }
            ]
        },
        recordedDate : registro.createdAt,
        meta : {
            profile : [
                'http://hl7.org/fhir/uv/ips/StructureDefinition/condition-uv-ips'
            ]
        },
        text : {
            status : 'generated',
            div: `<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Generated Narrative with Details</b></p><p><b>id</b>: Problema: </p><p>${registro.nombre}</p></div>`
        },
        severity : {  // [TODO] Sacar esto porque no lo tenemos todavía. No hay un campo de severidad.
            coding : [
                {
                    system : 'http://loinc.org',
                    display : 'Moderate',
                    code : 'LA6751-7'
                }
            ]
        },
        clinicalStatus : {
            coding : [
                {
                    system: 'http://terminology.hl7.org/CodeSystem/condition-clinical',
                    code: registro.valor.estado // [TODO]  Tenemos este dato.
                },
                {
                    system: 'http://terminology.hl7.org/CodeSystem/evolution',
                    // code: registro.valor.evolucion.replace('<p>','').replace('</p>','')  // [TODO]  Tenemos este dato.
                    code: registro.valor.evolucion  // [TODO]  Tenemos este dato.
                }
            ]
        }
    };
}

