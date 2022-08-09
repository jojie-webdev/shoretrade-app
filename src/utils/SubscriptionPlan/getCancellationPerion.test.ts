import moment from 'moment';

import { getCancellationPeriod } from './getCancellationPeriod';

describe('getCancellationPeriod', () => {
  describe('during free trial', () => {
    it('should still end at midnight', () => {
      const endsAt = moment().add('7', 'day').toISOString(); // simulating return of BE being the approved time
      const result = getCancellationPeriod(endsAt);
      expect(result).toEqual('in 7 days');
    });
  });
});
