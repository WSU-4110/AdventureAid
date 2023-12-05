const Vacation = require('../../server/middleware/index'); 

describe('Vacation - removeAllDestinations', () => {
  let vacation;

  beforeEach(() => {
    vacation = new Vacation();
  });

  it('should remove all destinations', () => {
    vacation.pushDestination('Miami');
    vacation.removeAllDestinations();
    expect(vacation.getAllDestinations()).toEqual([]);
    expect(vacation.getNumOfDestinations()).toBe(0);
  });
});
