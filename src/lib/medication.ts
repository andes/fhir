/**
 * Encode de Medicamentos from ANDES to FHIR
 * @param {} medication
 */
export function encode(medication) {
    // Falta completar con más detalle
    return {
        resourceType: 'Medication',
        id: medication.concepto.conceptId, // Es el id del medicamento, en este caso usamos el código de snomed (ver si sería correcto)
        meta: {
            profile: [
                'http://hl7.org/fhir/uv/ips/StructureDefinition/medication-ips'
            ]
        },
        identifier: null, // Acá va el serial number del medicamento.
        code: {
            coding: [
                {
                    system: 'http://snomed.info/sct',
                    display: medication.concepto.term,
                    code: medication.concepto.conceptId
                }
            ],
            text: medication.concepto.fsn
        },
        status: medication.valor.estado,
        manufacturer: null,
        form: null,
        amount: null,
        ingredient: null,
        // ingredient: [ // ejemplo
        //     {
        //         code: {
        //             coding: [
        //                 {
        //                     system: "http://snomed.info/sct",
        //                     display: "salbutamol (sustancia)",
        //                     code: "372897005"
        //                 }
        //             ]
        //         },
        //         isActive: true,
        //         strength: {
        //             numerator: {
        //                 value: 200,
        //                 unit: "mcg"
        //             },
        //             denominator: {
        //                 value: 1,
        //                 unit: "disparo"
        //             }
        //         }
        //     }
        // ],
        // text: {
        //     status: "generated",
        //     div: `<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Generated Narrative with Details</b></p><p><b>id</b>: Medicación</p><p><b>meta</b>: </p><p><b>text</b>: </p><p><b>code</b>: ${medication.concepto.fsn}};</span></p></div>`
        // }
    };
}

