import moment = require('moment');
import { toBase64 } from '../utils/base64';

/***
 * [TODO] la fecha cual va?
 *
 * https://www.dicomlibrary.com/dicom/dicom-tags/
 * http://dicom.nema.org/dicom/2013/output/chtml/part05/sect_6.2.html
 */

export function encode(prestacion, modalidad: string) {
    const patientID = String(prestacion.paciente.id);

    // Ver de cambiar al estadoActual.createdBy
    const profesional = prestacion.solicitud.profesional;
    const profesionalID = String(profesional.id);
    const profesionalName = `${profesional.apellido}, ${profesional.nombre}`;

    const fecha = prestacion.ejecucion.fecha;

    const json = {
        '00080005': {
            vr: 'CS',
            Value: [
                'ISO_IR 192'
            ]
        },
        '00100020': {
            vr: 'LO',
            Value: [
                patientID
            ]
        },
        '00100021': {
            vr: 'LO',
            Value: [
                'ANDES'
            ]
        },
        '00321032': {
            vr: 'PN',
            Value: [
                {
                    Alphabetic: profesionalName
                }
            ]
        },
        '00080050': {
            vr: 'SH',
            Value: [
                toBase64(prestacion.solicitud.tipoPrestacion.conceptId)
            ]
        },
        '00400100': {
            vr: 'SQ',
            Value: [
                {
                    '00080060': {
                        vr: 'CS',
                        Value: [
                            modalidad
                        ]
                    },
                    '00400001': {
                        vr: 'AE',
                        Value: [
                            'DCM4CHEE'
                        ]
                    },
                    '00400002': {
                        vr: 'DA',
                        Value: [
                            moment(fecha).format('YYYYMMDD')
                        ]
                    },
                    '00400003': {
                        vr: 'TM',
                        Value: [
                            moment(fecha).format('HHMMSS')
                        ]
                    },
                    '00400020': {
                        vr: 'CS',
                        Value: [
                            'SCHEDULED'
                        ]
                    },
                    '00400006': {
                        vr: 'PN',
                        Value: [
                            profesionalName
                        ]
                    },
                    '0040000B': {
                        vr: 'SQ',
                        Value: [
                            {
                                '00401101': {
                                    vr: 'SQ',
                                    Value: [
                                        {
                                            '00080119': {
                                                vr: 'UC',
                                                Value: [
                                                    profesionalID
                                                ]
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
            ]
        },
        '00401001': {
            vr: 'SH',
            Value: [
                String(prestacion.id)
            ]
        },
        '00321060': {
            vr: 'LO',
            Value: [
                prestacion.solicitud.tipoPrestacion.term
            ]
        }
    };

}
