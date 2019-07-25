import * as Patient from '../lib/patient';


let objeto = {
    paciente: {
        _id: '586e6e8427d3107fde10fb4c',
        documento: '42910660',
        estado: 'validado',
        nombre: 'HUGO AGUSTIN',
        apellido: 'PERIGA PONCE',
        sexo: 'masculino',
        genero: 'masculino',
        fechaNacimiento: '2000-11-03T11:37:21.970-03:00',
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
                nombre: 'JOSEFINA',
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
    }
};

let paciente = objeto.paciente;
demo(paciente);


function demo(patient) {
    let rta = Patient.encode(patient);
    console.log('Usuario codificado: ', rta);
    // console.log(rta);
    let newRta = Patient.decode(rta);
    console.log('Rtanew: ', newRta);
}
