
import * as Patient from '../lib/patient';
import * as Practitioner from '../lib/practitioner';


let paciente = {
    _id: '586e6e8427d3107fde10fb4c',
    documento: '42910660',
    estado: 'validado',
    nombre: 'HUGO AGUSTIN',
    apellido: 'PERIGA PONCE',
    sexo: 'masculino',
    genero: 'masculino',
    fechaNacimiento: new Date('2000-11-03T11:37:21.970-03:00'),
    estadoCivil: null,
    entidadesValidadoras: [
        'Sisa'
    ],
    claveBlocking: [
        'PRGPUGG',
        'PRGPNZ',
        'UGGSTN',
        '09806428436',
        '098064'
    ],
    financiador: [],
    relaciones: [
        {
            relacion: {
                nombre: 'hijo / a',
                opuesto: 'progenitor / a'
            },
            nombre: 'JOSEFINA EMILIA',
            apellido: 'PERINGA PONCE',
            documento: '53964567'
        }
    ],
    direccion: [
        {
            valor: 'SIN ESPECIFICAR MZ: 33',
            codigoPostal: '8300',
            ubicacion: {
                localidad: {
                    nombre: 'Neuquén',
                    _id: '57f538a472325875a199a82d'
                },
                provincia: {
                    nombre: 'Neuquén',
                    _id: '582074b2de27c98959a5e350'
                },
                pais: {
                    nombre: 'Argentina',
                    _id: '582074dcde27c98959a5e351'
                },
                _id: '58cf31d7d816ea2b7cfcedfe'
            },
            ranking: 1,
            _id: '58cf31d7d816ea2b7cfcedfd',
            activo: true
        }
    ],
    contacto: [
        {
            tipo: 'fijo',
            valor: '4462221',
            ranking: 1,
            _id: '58cf31d7d816ea2b7cfcee02',
            activo: true
        }
    ],
    identificadores: [
        {
            entidad: 'SIPS',
            valor: '450'
        },
        {
            entidad: '57e9670e52df311059bc8964'
        }
    ],
    carpetaEfectores: [],
    notas: [],
    updatedAt: '2018-07-11T11:37:21.970-03:00',
    activo: true
};

let profesional = {

    _id: '58f74fd3d03019f919e9fffd',
    nombre: 'DOCTOR PRUEBA',
    apellido: 'PERICO GOMEZ',
    tipoDocumento: 'DNIM',
    documento: '11111111',
    documentoVencimiento: '1900-01-01T00:00:00.000-03:00',
    cuit: '201111111112',
    fechaNacimiento: '1944-11-28T00:00:00.000-03:00',
    lugarNacimiento: 'GENERAL PUEYRREDON',
    nacionalidad: {
        codigo: '200',
        nombre: 'Argentina'
    },
    sexo: 'Masculino',
    notas: [
        ''
    ],
    formacionGrado: [
        {
            profesion: {
                codigo: 1.0,
                nombre: 'MEDICO',
                tipoDeFormacion: 'Grado Universitario'
            },
            entidadFormadora: {
                codigo: '1173',
                nombre: 'UNIV. DEL SALVADOR'
            },
            titulo: 'MEDICO',
            fechaEgreso: '1968-11-20T00:00:00.000-03:00',
            matriculacion: [
                {
                    matriculaNumero: 9999,
                    libro: 'VII',
                    folio: '101-102-103',
                    inicio: '1976-01-01T00:00:00.000-03:00',
                    fin: '2015-11-28T00:00:00.000-03:00',
                    baja: {
                        motivo: '',
                        fecha: null
                    }
                }
            ],
            matriculado: false,
            papelesVerificados: false,
            renovacion: false,
            fechaDeInscripcion: '2010-09-10T00:00:00.000-03:00'
        }
    ],
    formacionPosgrado: [
        {
            profesion: {
                codigo: 1.0,
                nombre: 'MEDICO'
            },
            especialidad: {
                codigo: 22.0,
                tipo: 1.0,
                nombre: 'CIRUGIA GENERAL'
            },
            matriculado: false,
            papelesVerificados: false,
            revalida: false,
            matriculacion: [
                {
                    matriculaNumero: 6666,
                    libro: 'II',
                    folio: '2/3',
                    fin: '2005-01-01T00:00:00.000-03:00',
                    baja: {
                        motivo: '',
                        fecha: null
                    }
                }
            ],
            tieneVencimiento: true,
            fechasDeAltas: [
                {
                    fecha: '1978-04-11T00:00:00.000-03:00'
                }
            ]
        }
    ],
    sanciones: [
        {
            numero: null,
            sancion: {
                id: null
            },
            motivo: null,
            normaLegal: null,
            fecha: null,
            vencimiento: null
        }
    ],
    domicilios: [
        {
            activo: true,
            tipo: 'legal',
            valor: 'LA CASA DE AL LADO 333',
            codigoPostal: '8300',
            ubicacion: {
                pais: {
                    _id: '57f3b5c469fe79a598e6281f',
                    nombre: 'Argentina'
                },
                provincia: {
                    nombre: 'Neuquén'
                },
                localidad: {
                    nombre: 'NEUQUÉN'
                }
            }
        },
        {
            activo: true,
            tipo: 'profesional',
            valor: 'LEJOS DE LA JERINGA 346',
            codigoPostal: '8300',
            ubicacion: {
                pais: {
                    _id: '57f3b5c469fe79a598e6281f',
                    nombre: 'Argentina'
                },
                provincia: {
                    nombre: 'Neuquén'
                },
                localidad: {
                    nombre: 'NEUQUÉN'
                }
            }
        },
        {
            activo: true,
            tipo: 'real',
            valor: 'LEJOS DE TODOS LADOS 222',
            codigoPostal: '8300',
            ubicacion: {
                pais: {
                    _id: '57f3b5c469fe79a598e6281f',
                    nombre: 'Argentina'
                },
                provincia: {
                    nombre: 'Neuquén'
                },
                localidad: {
                    nombre: 'NEUQUÉN'
                }
            }
        }
    ],
    contactos: [
        {
            tipo: 'celular',
            valor: '0299-154387150',
            activo: true
        },
        {
            tipo: 'email',
            valor: 'unmail@speedy.com.ar',
            activo: true
        },
        {
            tipo: 'fijo',
            valor: '0299-5555555',
            activo: true
        }
    ],
    rematriculado: 1.0,
    turno: '2010-09-10T10:53:00.000-03:00',
    profesionalMatriculado: true,
    OtrosDatos: [],
    firmas: [],
    habilitado: true,
    incluidoSuperintendencia: false
};

let profesional2 = {
    "nombre": "ANA MARIA",
    "apellido": "GARCIA",
    "tipoDocumento": "DNIF",
    "documento": "6177061",
    "documentoVencimiento": "1900-01-01T00:00:00.000-03:00",
    "cuit": "27061770610",
    "fechaNacimiento": "1949-05-23T00:00:00.000-03:00",
    "lugarNacimiento": "Capital Federal",
    "nacionalidad": {
        "codigo": "200",
        "nombre": "Argentina"
    },
    "sexo": "Femenino",
    "notas": [
        ""
    ],
    "formacionGrado": [
        {
            "profesion": {
                "codigo": 1.0,
                "nombre": "MEDICO",
                "tipoDeFormacion": "Grado Universitario"
            },
            "entidadFormadora": {
                "codigo": "1172",
                "nombre": "UNIV. DE BS. AS."
            },
            "titulo": "MEDICA",
            "fechaEgreso": "1974-12-21T00:00:00.000-03:00",
            "matriculacion": [
                {
                    "matriculaNumero": 838.0,
                    "libro": "IX",
                    "folio": "2/3",
                    "inicio": "1978-01-01T00:00:00.000-03:00",
                    "fin": "2021-05-23T00:00:00.000-03:00",
                    "baja": {
                        "motivo": "",
                        "fecha": null
                    }
                }
            ],
            "matriculado": true,
            "papelesVerificados": true,
            "renovacion": false,
            "fechaDeInscripcion": "2011-08-04T00:00:00.000-03:00"
        }
    ],
    "formacionPosgrado": [
        {
            "profesion": {
                "codigo": 1.0,
                "nombre": "MEDICO"
            },
            "especialidad": {
                "codigo": 58.0,
                "tipo": 1.0,
                "nombre": "MEDICINA DEL TRABAJO"
            },
            "matriculado": true,
            "papelesVerificados": true,
            "revalida": false,
            "matriculacion": [
                {
                    "matriculaNumero": 872.0,
                    "libro": "II",
                    "folio": "62/63",
                    "fin": "2016-01-01T00:00:00.000-03:00",
                    "baja": {
                        "motivo": "",
                        "fecha": null
                    }
                }
            ],
            "tieneVencimiento": false,
            "fechasDeAltas": [
                {
                    "fecha": "1995-05-05T00:00:00.000-03:00"
                }
            ]
        }
    ],
    "sanciones": [
        {
            "numero": null,
            "sancion": {
                "id": null
            },
            "motivo": null,
            "normaLegal": null,
            "fecha": null,
            "vencimiento": null
        }
    ],
    "domicilios": [
        {
            "activo": true,
            "tipo": "legal",
            "valor": "O HIGGINS B° AREVALO 240",
            "codigoPostal": "8324",
            "ubicacion": {
                "pais": {
                    "nombre": "Argentina"
                },
                "provincia": {
                    "nombre": "Río Negro"
                },
                "localidad": {
                    "nombre": "CIPOLLETTI"
                }
            }
        },
        {
            "activo": true,
            "tipo": "profesional",
            "valor": "",
            "codigoPostal": "8300",
            "ubicacion": {
                "pais": {
                    "nombre": "Argentina"
                },
                "provincia": {
                    "nombre": "Neuquén"
                },
                "localidad": {
                    "nombre": ""
                }
            }
        },
        {
            "activo": true,
            "tipo": "real",
            "valor": "O HIGGINS B° AREVALO 240",
            "codigoPostal": "8324",
            "ubicacion": {
                "pais": {
                    "nombre": "Argentina"
                },
                "provincia": {
                    "nombre": "Río Negro"
                },
                "localidad": {
                    "nombre": "CIPOLLETTI"
                }
            }
        }
    ],
    "contactos": [
        {
            "tipo": "celular",
            "valor": "2994198837",
            "activo": true
        },
        {
            "tipo": "email",
            "valor": "moligar@fibertel.com.ar",
            "activo": true
        },
        {
            "tipo": "fijo",
            "valor": "0299 4775886",
            "activo": true
        }
    ],
    "rematriculado": 1.0,
    "turno": "2016-10-28T11:30:11.000-03:00",
    "profesionalMatriculado": true,
    "OtrosDatos": [],
    "firmas": [],
    "habilitado": true,
    "incluidoSuperintendencia": false,
};

// demo(paciente, 'paciente');
demo(profesional2, 'profesional');

function demo(obj, tipo) {
    switch (tipo) {
        case 'paciente': {
            // console.log(Patient.encode(obj));
            break;
        }
        case 'profesional': {
            console.log(Practitioner.encode(obj));
            break;
        }
        default: {
            // console.log('no entro en ninguna opción');
        }
    }
}
