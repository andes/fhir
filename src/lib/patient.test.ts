import * as patient from '../data/patient.json';
import { decode, encode } from './patient';
import { createPatient } from '../helpers/patientFactory';

const pacienteFhir = encode(patient);

describe('encode patient from ANDES to FHIR R4', () => {
    test('Verify basic data', () => {
        expect(pacienteFhir.resourceType).toBe('Patient');
        const ident = pacienteFhir.identifier;
        const id = ident?.find(t => t.system === 'http://www.renaper.gob.ar/dni');
        expect(id?.value).toBe('42910660');
        expect(id?.system).toBe('http://www.renaper.gob.ar/dni');
        expect(pacienteFhir.active).toBe(true);
        expect(pacienteFhir.name[0].use).toBe('official');
        expect(pacienteFhir.name[0].resourceType).toBe('HumanName');
        expect(pacienteFhir.name[0].family).toContain('PERINGA');
        expect(pacienteFhir.name[0].family).toContain('PONCE');
        expect(pacienteFhir.name[0].given).toContain('AGUSTIN');
        expect(pacienteFhir.name[0].text).toBe('HUGO AGUSTIN PERINGA PONCE');
        expect(pacienteFhir.gender).toBe('male');
        expect(pacienteFhir.birthDate).toBe('1979-11-14');
    });
    test('Verify patient with contact information', () => {
        //  Phone;
        expect(pacienteFhir.telecom[0].resourceType).toBe('ContactPoint');
        expect(pacienteFhir.telecom[0].value).toBe('4462221');
        expect(pacienteFhir.telecom[0].system).toBe('phone');
        //   Address;
        expect(pacienteFhir.address[0].resourceType).toBe('Address');
        expect(pacienteFhir.address[0].postalCode).toBe('8300');
        expect(pacienteFhir.address[0].line).toContain('Enrique Santos Discepolo 1856');
        expect(pacienteFhir.address[0].city).toBe('NEUQUEN');
        expect(pacienteFhir.address[0].state).toBe('Neuquén');
        expect(pacienteFhir.address[0].country).toBe('Argentina');
    });
    test('Verify patient with relationships', () => {
        expect(pacienteFhir.contact[0].relationship[0].text).toBe('hijo/a');
        expect(pacienteFhir.contact[0].name.resourceType).toBe('HumanName');
        expect(pacienteFhir.contact[0].name.family).toContain('PERINGA');
        expect(pacienteFhir.contact[0].name.given).toContain('JOSEFINA');
    });

    test('Maneja paciente con estado validado', () => {
        const paciente = createPatient({ estado: 'validado' });
        const fhir = encode(paciente);
        expect(fhir.extension?.some(t => t.valueCode === 'validado')).toBeTruthy();
    });

    test('Maneja paciente con estado temporal', () => {
        const paciente = createPatient({ estado: 'temporal' });
        const fhir = encode(paciente);
        expect(fhir.extension?.some(t => t.valueCode === 'temporal')).toBeTruthy();
    });

    test('Maneja paciente con estado nulo', () => {
        const paciente = createPatient({ estado: null });
        const fhir = encode(paciente);
        expect(fhir.extension?.some(t => t.valueCode === 'temporal')).toBeTruthy();
    });

    it('Verifica organización que crea paciente', () => {
        const fhir = pacienteFhir;
        expect(fhir.managingOrganization.display).toContain('LABORATORIO');
    });

    it('Verifica dni extranjero', () => {
        const paciente = createPatient({ tipoIdentificacion: 'dni extranjero', numeroIdentificacion: 'ABC123' });
        const fhir = encode(paciente);
        const id = fhir.identifier?.find(t => t.system === 'andes.gob.ar/sid/foreign-id');
        expect(id?.value).toBe('ABC123');
        expect(id?.system).toBe('andes.gob.ar/sid/foreign-id');
    });

    it('Verifica pasaporte', () => {
        const paciente = createPatient({ tipoIdentificacion: 'pasaporte', numeroIdentificacion: 'ABC123CD' });
        const fhir = encode(paciente);
        const id = fhir.identifier?.find(t => t.system === 'andes.gob.ar/sid/passport');
        expect(id?.value).toBe('ABC123CD');
        expect(id?.system).toBe('andes.gob.ar/sid/passport');
    });
});

describe('decode patient from FHIR R4 to ANDES', () => {
    it('Verifica dni extranjero', () => {
        const paciente = createPatient({ tipoIdentificacion: 'dni extranjero', numeroIdentificacion: 'ABC123' });
        const fhirEncode = encode(paciente);
        const fhirDecode = decode(fhirEncode);
        expect(fhirDecode?.tipoIdentificacion).toBe('dni extranjero');
        expect(fhirDecode?.numeroIdentificacion).toBe('ABC123');
    });

    it('Verifica pasaporte', () => {
        const paciente = createPatient({ tipoIdentificacion: 'pasaporte', numeroIdentificacion: 'ABC123CD' });
        const fhirEncode = encode(paciente);
        const fhirDecode = decode(fhirEncode);
        expect(fhirDecode?.tipoIdentificacion).toBe('pasaporte');
        expect(fhirDecode?.numeroIdentificacion).toBe('ABC123CD');
        expect(fhirDecode?.estado).toBe('temporal');
    });
});
