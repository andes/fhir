/**
 * Encode de Alergias e Intolerancias from ANDES to FHIR
 * @param {} AllergyIntolerance
 */
export function encode(patientReference, alergiaIntolerancia) {
    return {
            category: [
                "medication"
            ],
            criticality: 'high',
            patient: {
                reference: patientReference
            },
            id: alergiaIntolerancia._id,
            code: {
                coding: [
                    {
                        system: 'http://snomed.info/sct',
                        display: alergiaIntolerancia.concepto.term,
                        code: alergiaIntolerancia.concepto.conceptId,
                    }
                ]
            },
            meta: {
                profile: ['http://hl7.org/fhir/uv/ips/StructureDefinition/allergyintolerance-uv-ips']
            },
            text: {
                status: "generated",
                div: `<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Generated Narrative with Details</b></p><p><b>id</b>: Alergia </p><p><b>meta</b>: </p><p><b>text</b>: ${alergiaIntolerancia.concepto.semanticTag}</p></div>`
            },
            resourceType: 'AllergyIntolerance',
            type: 'allergy',
            onsetDateTime: alergiaIntolerancia.valor.fechaInicio
        
    };
}

