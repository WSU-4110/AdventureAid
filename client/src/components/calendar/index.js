import React, { useState, useEffect } from 'react';
import { vacationOperations } from '../middleware-apis/vacationOperations';
import { trigger } from '../maps/googlemapsAPI';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import "./index.scss";

function Calendar() {
  const [lock, setLock] = useState(false);   //lock to prevent multiple initalizations of calendar cards
  const [triggerState, setTriggerState] = useState(trigger);  //trigger variable to indicate new destination has been added to vacation
  const [startDate, setStartDate] = useState(''); //starting date of vacation fetched from server
  const [endDate, setEndDate] = useState(''); //ending date of vacation fetched from server
  const [dates, setDates] = useState([]); //array containing calendar cards info
  const [expandedId, setExpandedId] = useState(null); //array for tracking expanded card

  useEffect(() => {
    async function fetchDates() { //function to fetch starting and ending dates of vacation
      try {
        const fetchedStartDate = await vacationOperations.getStartDate();
        setStartDate(fetchedStartDate);
        const fetchedEndDate = await vacationOperations.getEndDate();
        setEndDate(fetchedEndDate);
      } catch (error) {
        console.error('Error fetching dates:', error);
      }
    }

    fetchDates();
  }, []);

  useEffect(() => {
    const handleTriggerChange = (event) => {  //function handling the trigger updating when destination is added to vacation
      setTriggerState(event.detail);  
    };

    window.addEventListener('triggerChanged', handleTriggerChange);

    return () => {
      window.removeEventListener('triggerChanged', handleTriggerChange);
    };
  }, []);

  useEffect(() => {
    if ((startDate && endDate) && lock === false) { //initializeCalendar call only in very beginnging and when startDate and endDate have been retrived
      function initializeCalendar(startDateStr, endDateStr) {
        //helper function to create a Date object from a date string in local time
        const createDateAsLocal = (dateStr) => {
            const [year, month, day] = dateStr.split('-').map(num => parseInt(num, 10));
            return new Date(year, month - 1, day);
        };

        const startDate = createDateAsLocal(startDateStr);
        const endDate = createDateAsLocal(endDateStr);
        const formattedDates = [];

        const formatDate = (date) => {  //helper function to format the date
            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            const dayOfWeek = daysOfWeek[date.getDay()];
            const month = months[date.getMonth()];
            const dayNumber = date.getDate();

            return `${dayOfWeek}, ${month} ${dayNumber}`;
        };

        for (let iterateDate = new Date(startDate); iterateDate <= endDate; iterateDate = new Date(iterateDate.getFullYear(), iterateDate.getMonth(), iterateDate.getDate() + 1)) {
            formattedDates.push({
                dateString: formatDate(new Date(iterateDate)),
                events: [] //initially no events
            });
        }
        setDates(formattedDates);
      }
      initializeCalendar(startDate, endDate);
      setLock(true);  //lock is set to true to prevent future calls from happening
    }
    if (lock === true && triggerState !== null) {
      async function fetchDestinationInfo() { //retrive info from destination when triggered from trigger variable
        try {
          const fetchedDestinationName = await vacationOperations.getDestinationName();
          const fetchedDestinationAddress = await vacationOperations.getDestinationAddress();
          const fetchedDestinationDate = await vacationOperations.getDestinationDate();
          addEventToDate(fetchedDestinationDate, fetchedDestinationName, fetchedDestinationAddress);  //add the destinaion info to the calendar cards cooresponding date
          //alert(`${destinationName} and ${destinationAddress} and ${destinationDate}`)
        } catch (error) {
          console.error('Error fetching dates:', error);
        }
      }
      fetchDestinationInfo();
    }
  }, [startDate, endDate, triggerState]);

  function addEventToDate(dateString, eventName, eventDescription) {
    setDates(prevDates => {
      const newDates = [...prevDates];
      const dateIndex = newDates.findIndex(d => {
        // Monday, December 13 != 2023-12-13
        const createDateAsLocal = (dateStr) => {
          const [year, month, day] = dateStr.split('-').map(num => parseInt(num, 10));
          return new Date(year, month - 1, day);
        };
        const formatDate = (date) => {
          const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
          const dayOfWeek = daysOfWeek[date.getDay()];
          const month = months[date.getMonth()];
          const dayNumber = date.getDate();
          return `${dayOfWeek}, ${month} ${dayNumber}`;
        };
        let dateToBeCompared = formatDate(createDateAsLocal(dateString));
        //alert(`${d.dateString} != ${dateToBeCompared}`);
        return d.dateString === dateToBeCompared;
      });
  
      if (dateIndex >= 0) {
        newDates[dateIndex].events.push({ name: eventName, description: eventDescription });
      } else {
        alert('Date not found in your calendar');
      }
  
      return newDates;
    });
  }
  
  

  const handleExpandClick = (index) => {
    setExpandedId(expandedId === index ? null : index);
  };

  return (
    <Box className="scrollable-container" sx={{ width: "97.5%" }}>
      {dates.map((dateObj, index) => (
        <Card key={index} sx={{ margin: 1 }} onClick={() => handleExpandClick(index)}>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>{dateObj.dateString}</Typography>
          </CardContent>
          <Collapse in={expandedId === index} timeout="auto" unmountOnExit>
            <CardContent>
              {dateObj.events.length > 0 ? (
                dateObj.events.map((event, eventIndex) => (
                  <Typography key={eventIndex} paragraph>
                    {event.name}: {event.description}
                  </Typography>
                ))
              ) : (
                <Typography paragraph>No events scheduled for this day.</Typography>
              )}
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </Box>
  );


}

export default Calendar;
