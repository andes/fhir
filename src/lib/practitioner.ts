import { getDominio } from './config';

/**
 * Encode a practitioner from ANDES to FHIR
 * @param {} practitioner
 */
export function encode(practitioner) {
    const data = practitioner;
    if (data) {
        const identificadores = data.documento ? [{
            system: 'http://www.renaper.gob.ar/dni',
            value: data.documento
        }] : [];
        if (data.cuit) {
            identificadores.push({
                system: 'https://seti.afip.gob.ar/padron-puc-constancia-internet/ConsultaConstanciaAction.do',
                value: data.cuit
            });
        }
        identificadores.push({
            system: getDominio(),
            value: data._id
        });
        // Parsea contactos
        const contactos = data.contacto ? data.contacto.map(unContacto => {
            const cont = {
                resourceType: 'ContactPoint',
                value: unContacto.valor,
                rank: unContacto.ranking,
            };
            switch (unContacto.tipo) {
                case 'fijo':
                    cont['system'] = 'phone';
                    break;
                case 'celular':
                    cont['system'] = 'phone';
                    break;
                case 'email':
                    cont['system'] = 'email';
                    break;
            }
            return cont;
        }) : [];
        // Parsea direcciones
        const direcciones = data.domicilios ? data.domicilios.map(unDomicilio => {
            const direc = {
                resourceType: 'Address',
                postalCode: unDomicilio.codigoPostal ? unDomicilio.codigoPostal : '',
                line: [unDomicilio.valor],
                city: unDomicilio.ubicacion.localidad ? unDomicilio.ubicacion.localidad.nombre : '',
                state: unDomicilio.ubicacion.provincia ? unDomicilio.ubicacion.provincia.nombre : '',
                country: unDomicilio.ubicacion.pais ? unDomicilio.ubicacion.pais.nombre : ''
            };
            return direc;
        }) : [];
        // Parsea relaciones
        const relaciones = data.relaciones ? data.relaciones.map(unaRelacion => {
            const relacion = {
                relationship: [{
                    text: unaRelacion.relacion.nombre
                }],
                name: {
                    resourceType: 'HumanName',
                    family: unaRelacion.apellido.split(' '),
                    given: unaRelacion.nombre.split(' '),
                }
            };
            return relacion;
        }) : [];
        const matriculas = data.formacionGrado ? data.formacionGrado.map(datosGrado => {
            const cantMatriculaciones = datosGrado.matriculacion ? datosGrado.matriculacion.length : 0;
            const unaMatricula = {
                identifier: datosGrado.profesion.nombre ? [{
                    system: 'https://www.saludneuquen.gob.ar/matriculacionGrado',
                    value: datosGrado.profesion.nombre
                }] : [],
                code: cantMatriculaciones > 0 ? {
                    coding: [{
                        system: 'http://www.saludneuquen.gob.ar/fiscalizacion.html',
                        code: datosGrado.profesion.codigo,
                        display: datosGrado.profesion.tipoDeFormacion
                    }],
                    text: datosGrado.matriculacion[cantMatriculaciones - 1].matriculaNumero
                } : null,
                period: cantMatriculaciones > 0 ? {
                    start: datosGrado.matriculacion[cantMatriculaciones - 1].inicio ? datosGrado.matriculacion[cantMatriculaciones - 1].inicio : null,
                    end: datosGrado.matriculacion[cantMatriculaciones - 1].fin ? datosGrado.matriculacion[cantMatriculaciones - 1].fin : null
                } : null
            };
            return unaMatricula;
        }) : null;
        const matriculasEspecialidad = (data.formacionPosgrado ? data.formacionPosgrado.map(datosPosgrado => {
            const cantMatriculacionesEsp = datosPosgrado.matriculacion ? datosPosgrado.matriculacion.length : 0;
            const unaMatricula = {
                identifier: datosPosgrado.especialidad.nombre ? [{
                    system: 'https://www.saludneuquen.gob.ar/matriculacionEspecialidad/',
                    value: datosPosgrado.especialidad.nombre
                }] : [],
                code: cantMatriculacionesEsp > 0 ? {
                    coding: [{
                        system: 'http://www.saludneuquen.gob.ar/fiscalizacion.html',
                        code: datosPosgrado.especialidad.codigo,
                        display: datosPosgrado.especialidad.tipo
                    }],
                    text: datosPosgrado.matriculacion[cantMatriculacionesEsp - 1].matriculaNumero
                } : null,
                period: cantMatriculacionesEsp > 0 ? {
                    start: datosPosgrado.matriculacion[cantMatriculacionesEsp - 1].inicio ? datosPosgrado.matriculacion[cantMatriculacionesEsp - 1].inicio : null,
                    end: datosPosgrado.matriculacion[cantMatriculacionesEsp - 1].fin ? datosPosgrado.matriculacion[cantMatriculacionesEsp - 1].fin : null
                } : null
            };
            return unaMatricula;
        }) : null);
        let genero;
        switch (data.sexo.toLowerCase()) {
            case 'femenino':
                genero = 'female';
                break;
            case 'masculino':
                genero = 'male';
                break;
            case 'otro':
                genero = 'other';
                break;
        }
        const profesionalFHIR = {
            resourceType: 'Practitioner',
            identifier: identificadores,
            active: data.habilitado ? data.habilitado : null,
            name: [{
                resourceType: 'HumanName',
                family: data.apellido.split(' '),
                given: data.nombre.split(' '),
            }],
            gender: genero,
            birthDate: data.fechaNacimiento,
        };
        if (data.foto) {
            profesionalFHIR['photo'] = [{
                data: data.foto
            }];
        }
        if (contactos.length > 0) {
            profesionalFHIR['telecom'] = contactos;
        }
        if (direcciones.length > 0) {
            profesionalFHIR['address'] = direcciones;
        }
        if (matriculas.length > 0) {
            profesionalFHIR['qualification'] = matriculas.concat(matriculasEspecialidad);
        }

        return profesionalFHIR;
    } else {
        return null;
    }
}
