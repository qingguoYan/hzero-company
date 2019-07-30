import { getModuleRouters } from 'utils/utils';
import * as hzeroFrontHagdRouters from 'hzero-front-hagd/lib/utils/router';
import * as hzeroFrontHcnfRouters from 'hzero-front-hcnf/lib/utils/router';
import * as hzeroFrontHdttRouters from 'hzero-front-hdtt/lib/utils/router';
import * as hzeroFrontHfileRouters from 'hzero-front-hfile/lib/utils/router';
import * as hzeroFrontHiamRouters from 'hzero-front-hiam/lib/utils/router';
import * as hzeroFrontHimpRouters from 'hzero-front-himp/lib/utils/router';
import * as hzeroFrontHitfRouters from 'hzero-front-hitf/lib/utils/router';
import * as hzeroFrontHmsgRouters from 'hzero-front-hmsg/lib/utils/router';
import * as hzeroFrontHpfmRouters from 'hzero-front-hpfm/lib/utils/router';
import * as hzeroFrontHptlRouters from 'hzero-front-hptl/lib/utils/router';
import * as hzeroFrontHrptRouters from 'hzero-front-hrpt/lib/utils/router';
import * as hzeroFrontHsdrRouters from 'hzero-front-hsdr/lib/utils/router';
import * as hzeroFrontHsgpRouters from 'hzero-front-hsgp/lib/utils/router';
import * as hzeroFrontHwflRouters from 'hzero-front-hwfl/lib/utils/router';
import * as hzeroFrontHwfpRouters from 'hzero-front-hwfp/lib/utils/router';

export default app =>
  getModuleRouters(app, [
    hzeroFrontHagdRouters,
    hzeroFrontHcnfRouters,
    hzeroFrontHdttRouters,
    hzeroFrontHfileRouters,
    hzeroFrontHiamRouters,
    hzeroFrontHimpRouters,
    hzeroFrontHitfRouters,
    hzeroFrontHmsgRouters,
    hzeroFrontHpfmRouters,
    hzeroFrontHptlRouters,
    hzeroFrontHrptRouters,
    hzeroFrontHsdrRouters,
    hzeroFrontHsgpRouters,
    hzeroFrontHwflRouters,
    hzeroFrontHwfpRouters,
  ]);
