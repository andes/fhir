/**
 * Encode de Medicamentos from ANDES to FHIR
 * @param {} medicationStatement
 */
// Muy incompleto hay que mejorarlo mucho todavía
export function encode(patientReference, medicationReference, prestacionMedicamento) {
    return {
        resourceType: 'MedicationStatement',
        id: prestacionMedicamento._id,  // El código de la prestación donde está el registro del contexto de porque está consumiendo el medicamento
        meta: {
            profile: [
                'http://hl7.org/fhir/uv/ips/StructureDefinition/medication-ips'
            ]
        },
        extension: null,
        identifier: '', // Business identifier, not a resource identifier
        status: prestacionMedicamento.valor.estado,
        subject: {
            reference: patientReference
        },
        medicationReference: {
            reference: medicationReference
        },
        context: null, // Encounter | Episode of care (podría ser el informe del encuentro o lo que definamos que brinda más información sobre el por qué)
        dosage: null,
        // dosage: [
        //     {
        //         route: {
        //             coding: [
        //                 {
        //                     system: 'http://snomed.info/sct',
        //                     display: prestacionMedicamento.valor.indicacion,
        //                     code: ''
        //                 }
        //             ]
        //         },
        //         timing: {
        //             repeat: {
        //                 count: 1,
        //                 periodUnit: 'd'
        //             }
        //         },
        //         doseAndRate: [
        //             {
        //                 type: {
        //                     coding: [
        //                         {
        //                             system: 'http://terminology.hl7.org/CodeSystem/dose-rate-type',
        //                             display: 'Ordered',
        //                             code: 'ordered'
        //                         }
        //                     ]
        //                 },
        //                 doseQuantity: {
        //                     code: '732981002',
        //                     value: 1,
        //                     system: 'http://snomed.info/sct',
        //                     unit: 'disparo (unidad de presentación)'
        //                 }
        //             }
        //         ]
        //     }
        // ],
        // effectivePeriod: {     // Esta parte se podría calcular entre la fecha de la prestación y la cant. de tiempo que se indica, pero hay problemas
        // en este registro ya que no siempre está la unidad de tiempo (dias, mes, etc) hay q ver si no es un bug.
        //     start: '2015-03'
        // },
        text: null
        // text: {
        //     status: 'generated',
        //     div: `<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Generated Narrative with Details</b></p><p><b>id</b>: IPS-examples-MedicationStatement-01</p><p><b>meta</b>: </p><p><b>text</b>: </p><p><b>identifier</b>: b75f92cb-61d4-469a-9387-df5ef70d25f0</p><p><b>status</b>: ACTIVE</p><p><b>medication</b>: <a href="#medication_IPS-examples-Medication-01">Generated Summary: id: IPS-examples-Medication-01; <span title="Codes: {http://snomed.info/sct 108774000}, {urn:oid:2.16.840.1.113883.2.4.4.1 99872}, {urn:oid:2.16.840.1.113883.2.4.4.7 2076667}">Anastrozole (product)</span></a></p><p><b>subject</b>: <a href="#patient_IPS-examples-Patient-01">Generated Summary: id: IPS-examples-Patient-01; 574687583; active; Martha DeLarosa ; ph: +31788700800(HOME); FEMALE; birthDate: 01/05/1972</a></p><p><b>effective</b>: 01/03/2015 --> (ongoing)</p><p><b>dosage</b>: </p></div>`
        // },
    };
}

