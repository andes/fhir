import { encode } from './device';

test('Device type 1', () => {
    expect(encode().id).toBe('device-01');
});

test('Device Name', () => {
    expect(encode().deviceName[0].name).toBe('Sistema de Aplicaciones Neuquinas de Salud (ANDES)');
});
