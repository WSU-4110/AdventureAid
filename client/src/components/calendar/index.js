import React, { useState, useEffect } from 'react';
import { calendarOperations } from './calendarOperation';
import { vacationOperations } from '../middleware-apis/vacationOperations';
import { trigger } from '../maps/googlemapsAPI';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import "./index.scss";

function Calendar() {
  const [lock, setLock] = useState(false);
  const [triggerState, setTriggerState] = useState(trigger);
  const [destinationName, setDestinationName] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [destinationDate, setDestinationDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dates, setDates] = useState([]);
  const [expandedId, setExpandedId] = useState(null); // Track expanded card

  useEffect(() => {
    async function fetchDates() {
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
    const handleTriggerChange = (event) => {
      setTriggerState(event.detail);
    };

    window.addEventListener('triggerChanged', handleTriggerChange);

    return () => {
      window.removeEventListener('triggerChanged', handleTriggerChange);
    };
  }, []);

  useEffect(() => {
    if ((startDate && endDate) && lock === false) {
      calendarOperations.initializeCalendar(startDate, endDate, setDates);
      setLock(true);
    }
    if (lock === true && triggerState !== null) {
      async function fetchDestinationInfo() {
        try {
          const fetchedDestinationName = await vacationOperations.getDestinationName();
          const fetchedDestinationAddress = await vacationOperations.getDestinationAddress();
          const fetchedDestinationDate = await vacationOperations.getDestinationDate();
          setDestinationName(fetchedDestinationName);
          setDestinationAddress(fetchedDestinationAddress);
          setDestinationDate(fetchedDestinationDate);
          //alert(`${destinationName} and ${destinationAddress} and ${destinationDate}`)
        } catch (error) {
          console.error('Error fetching dates:', error);
        }
      }
      function addEventToDate(dateString, eventName, eventDescription) {
        setDates(prevDates => {
          const newDates = [...prevDates];
          const dateIndex = newDates.findIndex(d => d.dateString === dateString);
    
          if (dateIndex >= 0) {
            newDates[dateIndex].events.push({ name: eventName, description: eventDescription });
          } else {
            console.error('Date not found in calendar');
          }
    
          return newDates;
        });
      }
      fetchDestinationInfo();
    }
  }, [startDate, endDate, triggerState]);

  useEffect(() => {
    function addEventToDate(dateString, eventName, eventDescription) {
      setDates(prevDates => {
        const newDates = [...prevDates];
        const dateIndex = newDates.findIndex(d => d.dateString === dateString);

        if (dateIndex >= 0) {
          newDates[dateIndex].events.push({ name: eventName, description: eventDescription });
        } else {
          console.error('Date not found in calendar');
        }

        return newDates;
      });
    }

    if (destinationName && destinationAddress && destinationDate) {
      addEventToDate(destinationDate, destinationName, destinationAddress);
    }
  }, [destinationName, destinationAddress, destinationDate]);

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
              <Typography paragraph>Details for {dateObj.dateString}</Typography>
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
