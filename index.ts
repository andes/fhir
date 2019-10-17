import * as Patient from './src/lib/patient';
import * as Practitioner from './src/lib/practitioner';
import * as Organization from './src/lib/organization';
import * as Immunization from './src/lib/immunization';
import * as Condition from './src/lib/condition';
import * as Composition from './src/lib/composition';
import * as Bundle from './src/lib/bundle';
import * as DocumentReference from './src/lib/document-reference';
import * as Device from './src/lib/device';

export { getDominio, initialize } from './src/lib/config';

export {
    Patient,
    Practitioner,
    Organization,
    Immunization,
    Condition,
    Composition,
    Bundle,
    DocumentReference,
    Device
};
