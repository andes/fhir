import * as basePatient from '../data/patient.json';

export type PartialDeep<T> = {
  [K in keyof T]?: T[K] extends object ? PartialDeep<T[K]> : T[K];
};

export const createPatient = (overrides: PartialDeep<typeof basePatient> = {}) => {
  const clone = JSON.parse(JSON.stringify(basePatient));
  return {
    ...clone,
    ...overrides,
  };
};
