import { getDominio, makeUrl } from './config';

/**
 * Encode a practitioner from ANDES to FHIR
 * @param {} practitioner
 */
export function encode(practitioner) {
    let data = practitioner;
    if (data) {
        let identificadores = data.documento ? [{
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
        let contactos = data.contacto ? data.contacto.map(unContacto => {
            let cont = {
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
        let direcciones = data.domicilios ? data.domicilios.map(unDomicilio => {
            let direc = {
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
        let relaciones = data.relaciones ? data.relaciones.map(unaRelacion => {
            let relacion = {
                relationship: [{
                    text: unaRelacion.relacion.nombre
                }], // The kind of relationship
                name: {
                    resourceType: 'HumanName',
                    family: unaRelacion.apellido,
                    given: [unaRelacion.nombre],
                }
            };
            return relacion;
        }) : [];
        let matriculas = data.formacionGrado ? data.formacionGrado.map(datosGrado => {
            let cantMatriculaciones = datosGrado.matriculacion ? datosGrado.matriculacion.length : 0;
            let unaMatricula = {
                identifier: datosGrado.profesion.nombre ? [{
                    system: 'https://www.saludneuquen.gob.ar/matriculacionGrado',
                    value: datosGrado.profesion.nombre
                }] : [],
                code: cantMatriculaciones > 0 ? {
                    coding: [{
                        system: 'http://www.saludneuquen.gob.ar/fiscalizacion.html',
                        code: datosGrado.profesion.codigo, // uso el código interno de fiscalización
                        display: datosGrado.profesion.tipoDeFormacion // uso el tipo de formación según fiscalización
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
        let matriculasEspecialidad = (data.formacionPosgrado ? data.formacionPosgrado.map(datosPosgrado => {
            let cantMatriculacionesEsp = datosPosgrado.matriculacion ? datosPosgrado.matriculacion.length : 0;
            let unaMatricula = {
                identifier: datosPosgrado.especialidad.nombre ? [{
                    system: 'https://www.saludneuquen.gob.ar/matriculacionEspecialidad/',
                    value: datosPosgrado.especialidad.nombre
                }] : [],
                code: cantMatriculacionesEsp > 0 ? {
                    coding: [{
                        system: 'http://www.saludneuquen.gob.ar/fiscalizacion.html',
                        code: datosPosgrado.especialidad.codigo, // uso el código interno de fiscalización
                        display: datosPosgrado.especialidad.tipo // uso el tipo de formación según fiscalización
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
        switch (data.sexo.toLowerCase()) { // En profesional no existe el campo genero
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
        let profesionalFHIR = {
            resourceType: 'Practitioner',
            identifier: identificadores,
            active: data.habilitado ? data.habilitado : null, // Si el profesional está habilitado, estará activo para el sistema.
            name: [{
                resourceType: 'HumanName',
                family: data.apellido, // Family name (often called 'Surname')
                given: data.nombre, // Given names (not always 'first'). Includes middle names
            }],
            gender: genero, // male | female | other | unknown
            birthDate: data.fechaNacimiento,
        };
        if (data.foto) { // Image of the patient
            profesionalFHIR['photo'] = [{
                data: data.foto
            }];
        }
        if (contactos.length > 0) { // A contact detail for the individual
            profesionalFHIR['telecom'] = contactos;
        }
        if (direcciones.length > 0) { // Addresses for the individual
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
