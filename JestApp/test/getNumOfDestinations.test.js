const Vacation = require('../../server/middleware/index'); 

describe('Vacation - getNumOfDestinations', () => {
  let vacation;

  beforeEach(() => {
    vacation = new Vacation();
  });

  it('should return the number of destinations', () => {
    vacation.pushDestination('Cairo');
    expect(vacation.getNumOfDestinations()).toBe(1);
  });
});
