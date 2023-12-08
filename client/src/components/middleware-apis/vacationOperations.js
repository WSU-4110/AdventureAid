
export const vacationOperations = {
    planVacation: async function(locality, startDate, endDate) {  //vacation initialization
        try {
            const response = await fetch('http://localhost:3001/start-planning-vacation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ locality, startDate, endDate }),
            });
            if (response.ok) {
                console.log('Vacation created');
                //alert('u good')
            } else {
                console.error('Failed to create vacation');
                //alert('error1')
            }
        } catch (error) {
            console.error('Error:', error);
            //alert('error2')
        }
    },
    getName: async function() { //getter function for vacation name
        try {
            const response = await fetch('http://localhost:3001/get-vacation-name', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'}
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data.vacationName;
          } catch (error) {
            console.error('Error fetching vacation name:', error);
            throw error;
          }
    },
    getPlace: async function(destination) { //getter function for destination object by name
      try {
          const response = await fetch(`http://localhost:3001/api/attractions?city=${destination}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error fetching vacation name:', error);
          throw error;
        }
  },
    getLocality: async function() { //getter function for locality name from vacation
        try {
            const response = await fetch('http://localhost:3001/get-vacation-locality', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'}
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data.vacationLocality;
          } catch (error) {
            console.error('Error fetching vacation locality:', error);
            throw error;
          }
    },
    getStartDate: async function() {  //getter function for the starting date of vacation
      try {
        const response = await fetch('http://localhost:3001/get-vacation-startdate', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'}
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data.vacationStartDate;
      } catch (error) {
        console.error('Error fetching vacation start date:', error);
        throw error;
      }
    },
    getEndDate: async function() {  //getter function for the ending date of vacation
      try {
        const response = await fetch('http://localhost:3001/get-vacation-enddate', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'}
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data.vacationEndDate;
      } catch (error) {
        console.error('Error fetching vacation end date:', error);
        throw error;
      }
    },
    createAndAddDestination: async function(name, address, date, coordinates) { //initalize a new destination with given parameters then add it to the vacation
      try {
        const response = await fetch('http://localhost:3001/create-and-add-destination', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, address, date, coordinates }),
        });
        if (response.ok) {
            console.log('Destination added');
        } else {
            console.error('Failed to add destination');
            alert('error1')
        }
      } catch (error) {
          console.error('Error:', error);
          alert('error2')
      }
    },
    getDestinationName: async function() {  //getter function for the name of the last destination added to the vacation
      try {
        const response = await fetch('http://localhost:3001/get-destination-name', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'}
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.destinationName;
      } catch (error) {
        console.error('Error fetching destination name:', error);
        throw error;
      }
    },
    getDestinationAddress: async function() { //getter function of the address of the last destination added to the vacation
      try {
        const response = await fetch('http://localhost:3001/get-destination-address', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'}
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.destinationAddress;
      } catch (error) {
        console.error('Error fetching destination address:', error);
        throw error;
      }
    },
    getDestinationDate: async function() {  //getter function for the date of the last destination added to vacation
      try {
        const response = await fetch('http://localhost:3001/get-destination-date', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'}
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.destinationDate;
      } catch (error) {
        console.error('Error fetching destination date:', error);
        throw error;
      }
    },
    addDestination: async function(destination) { //request server to add new destination to the vacation by object
        try {
            const response = await fetch('http://localhost:3001/push-destination', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ destination }),
            });
            if (response.ok) {
                console.log('Destination added');
            } else {
                console.error('Failed to add destination');
                alert('error1')
            }
        } catch (error) {
            console.error('Error:', error);
            alert('error2')
        }
    },
    removeDestination: async function(destination) {  //request server to remove a specific destination from vacation, called by name
        try {
          const response = await fetch('http://localhost:3001/remove-destination', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ destination }),
          });
          if (response.ok) {
            console.log('Destination added');
          } else {
            console.error('Failed to add destination');
          }
        } catch (error) {
          console.error('Error:', error);
        }
    },
    removeAllDestinations: async function() { //request server to remove all destinations from vacation
        try {
            const response = await fetch('http://localhost:3001/remove-all-destinations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                console.log('All Destinations removed');
            } else {
                console.error('Failed to remove all destinations');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}