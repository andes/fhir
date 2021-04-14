import patient from '../data/patient.json';
import { encode } from './patient';
describe('encode patient from ANDES to FHIR R4', () => {
    test('Verify basic data', () => {
        expect(encode(patient).resourceType).toBe('Patient');
        expect(encode(patient).identifier[0].value).toBe('42910660');
        expect(encode(patient).identifier[0].system).toBe('http://www.renaper.gob.ar/dni');
        expect(encode(patient).active).toBe(true);
        expect(encode(patient).name[0].use).toBe('official');
        expect(encode(patient).name[0].resourceType).toBe('HumanName');
        expect(encode(patient).name[0].family).toContain('PERINGA');
        expect(encode(patient).name[0].family).toContain('PONCE');
        expect(encode(patient).name[0].given).toContain('AGUSTIN');
        expect(encode(patient).name[0].text).toBe('HUGO AGUSTIN PERINGA PONCE');
        expect(encode(patient).gender).toBe('male');
        expect(encode(patient).birthDate).toBe('1979-11-14');
    });
    test('Verify patient with contact information', () => {
        //  Phone;
        expect(encode(patient).telecom[0].resourceType).toBe('ContactPoint');
        expect(encode(patient).telecom[0].value).toBe('4462221');
        expect(encode(patient).telecom[0].system).toBe('phone');
        //   Address;
        expect(encode(patient).address[0].resourceType).toBe('Address');
        expect(encode(patient).address[0].postalCode).toBe('8300');
        expect(encode(patient).address[0].line).toContain('Enrique Santos Discepolo 1856');
        expect(encode(patient).address[0].city).toBe('NEUQUEN');
        expect(encode(patient).address[0].state).toBe('Neuquén');
        expect(encode(patient).address[0].country).toBe('Argentina');
    });
    test('Verify patient with relationships', () => {
        expect(encode(patient).contact[0].relationship[0].text).toBe('hijo/a');
        expect(encode(patient).contact[0].name.resourceType).toBe('HumanName');
        expect(encode(patient).contact[0].name.family).toContain('PERINGA');
        expect(encode(patient).contact[0].name.given).toContain('JOSEFINA');
    });
});

