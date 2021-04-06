import { getDominio, makeUrl } from './config';

test('Get default domain', () => {
    expect(getDominio()).toBe('andes.gob.ar');
});

test('Get default URL without id', () => {
    expect(makeUrl('patient')).toBe('andes.gob.ar/patient');
});

test('Get default URL with id', () => {
    expect(makeUrl('patient', '123456')).toBe('andes.gob.ar/patient/123456');
});
